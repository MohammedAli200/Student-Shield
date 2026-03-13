const ChatLog = require('../models/ChatLog');

exports.sendMessage = async (req, res) => {
    try {
        const studentId = req.user.id;
        const { message } = req.body;

        if (!message || typeof message !== 'string' || !message.trim()) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Simple mock AI response based on keywords
        let response = "I'm here to listen. How can I support you today?";
        let sentimentScore = 0;

        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('stressed') || lowerMessage.includes('anxious')) {
            response = "It's completely normal to feel stressed. Have you tried taking a short walk or practicing deep breathing? The counseling center is also available if you need to talk.";
            sentimentScore = -0.5;
        } else if (lowerMessage.includes('suicide') || lowerMessage.includes('die') || lowerMessage.includes('hopeless')) {
            response = "I'm so sorry you're feeling this way, but please know you're not alone. Please contact emergency services or the campus crisis line immediately: 1-800-273-8255.";
            sentimentScore = -1.0;
        } else if (lowerMessage.includes('happy') || lowerMessage.includes('good')) {
            response = "That's wonderful to hear! Keep up the positive momentum.";
            sentimentScore = 0.8;
        }

        const chatLog = await ChatLog.create({
            student: studentId,
            message,
            response,
            sentimentScore
        });

        res.status(200).json({ response: chatLog.response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
