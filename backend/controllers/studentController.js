const AcademicRecord = require('../models/AcademicRecord');
const BehaviorLog = require('../models/BehaviorLog');
const WellnessCheckin = require('../models/WellnessCheckin');
const mongoose = require('mongoose');

exports.getStudentData = async (req, res) => {
    try {
        const studentId = req.params.id;
        // Validate Id
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({ message: 'Invalid Student ID' });
        }

        const academic = await AcademicRecord.findOne({ student: studentId });
        const behavior = await BehaviorLog.findOne({ student: studentId });
        const wellness = await WellnessCheckin.find({ student: studentId }).sort({ createdAt: -1 }).limit(5);

        res.status(200).json({ academic, behavior, wellness });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
