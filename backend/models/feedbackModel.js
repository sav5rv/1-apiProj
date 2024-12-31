const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    email: String,
    message: String,
    submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
