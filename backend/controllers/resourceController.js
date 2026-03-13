const CampusResource = require('../models/CampusResource');

exports.getResources = async (req, res) => {
    try {
        const resources = await CampusResource.find();
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateResource = async (req, res) => {
    try {
        const { id, currentOccupancy, energyCurrentUsage, waterCurrentUsage } = req.body;
        const resource = await CampusResource.findByIdAndUpdate(
            id,
            { currentOccupancy, energyCurrentUsage, waterCurrentUsage },
            { new: true }
        );

        const io = req.app.get('io');
        if (io) {
            io.emit('resourceUpdated', resource);
        }

        res.status(200).json(resource);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
