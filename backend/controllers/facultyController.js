const AcademicRecord = require('../models/AcademicRecord');
const BehaviorLog = require('../models/BehaviorLog');
const WellnessCheckin = require('../models/WellnessCheckin');
const User = require('../models/User');
const mongoose = require('mongoose');

exports.submitStudentData = async (req, res) => {
    try {
        const { studentId, academic, behavior, wellness } = req.body;

        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({ message: 'Invalid Student ID' });
        }

        const student = await User.findById(studentId);
        if (!student || student.role !== 'Student') {
            return res.status(400).json({ message: 'Invalid student' });
        }

        if (academic) {
            await AcademicRecord.findOneAndUpdate(
                { student: studentId },
                { ...academic, student: studentId },
                { upsert: true, new: true }
            );
        }

        if (behavior) {
            await BehaviorLog.findOneAndUpdate(
                { student: studentId },
                { ...behavior, student: studentId },
                { upsert: true, new: true }
            );
        }

        if (wellness) {
            await WellnessCheckin.create({ ...wellness, student: studentId });
        }

        const io = req.app.get('io');
        if (io) {
            io.emit('studentDataUpdated', { student: studentId });
        }

        res.status(200).json({ message: 'Student data submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudents = async (req, res) => {
    try {
        const students = await User.find({ role: 'Student' }).select('name email _id').sort({ name: 1 });
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
