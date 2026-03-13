const AcademicRecord = require('../models/AcademicRecord');
const BehaviorLog = require('../models/BehaviorLog');
const WellnessCheckin = require('../models/WellnessCheckin');
const RiskScore = require('../models/RiskScore');
const Alert = require('../models/Alert');
const { calculateRiskScore } = require('../ai/predictionEngine');

exports.analyzeRisk = async (req, res) => {
    try {
        // Faculty can analyze any student via body.studentId; Students use their own id
        const studentId = req.user.role === 'Faculty' && req.body.studentId
            ? req.body.studentId
            : req.user.id;
        const academic = await AcademicRecord.findOne({ student: studentId });
        const behavior = await BehaviorLog.findOne({ student: studentId });
        const wellness = await WellnessCheckin.findOne({ student: studentId }).sort({ createdAt: -1 });

        const { score, riskLevel, dropoutProbability, burnoutRisk, suicideRisk, mentalStressLevel } = calculateRiskScore(
            academic || {},
            behavior || {},
            wellness || {}
        );

        const newRisk = await RiskScore.findOneAndUpdate(
            { student: studentId },
            {
                score,
                riskLevel,
                dropoutProbability,
                burnoutRisk,
                suicideRisk,
                mentalStressLevel
            },
            { upsert: true, new: true }
        );

        // Check if alert needed
        if (score > 70) {
            const io = req.app.get('io');
            const alert = await Alert.create({
                student: studentId,
                message: `High Risk Detected for student: ${studentId}`,
                riskScore: score,
            });
            if (io) {
                io.emit('newAlert', alert);
            }
        }

        res.status(200).json(newRisk);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getRiskScore = async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const risk = await RiskScore.findOne({ student: studentId });
        if (!risk) {
            return res.status(200).json({ score: 'N/A', riskLevel: 'N/A' });
        }
        res.status(200).json(risk);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getHighRiskStudents = async (req, res) => {
    try {
        const threshold = parseInt(req.query.threshold) || 60;
        const risks = await RiskScore.find({ score: { $gte: threshold } })
            .populate('student', 'name email')
            .sort({ score: -1 });
        res.status(200).json(risks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
