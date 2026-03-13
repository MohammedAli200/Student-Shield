const Alert = require('../models/Alert');

exports.getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find().populate('student', 'name email').sort({ createdAt: -1 });
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createAlert = async (req, res) => {
    try {
        const { studentId, message, riskScore } = req.body;
        const newAlert = await Alert.create({
            student: studentId,
            message,
            riskScore
        });

        const io = req.app.get('io');
        if (io) {
            io.emit('newAlert', newAlert);
        }

        res.status(201).json(newAlert);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
