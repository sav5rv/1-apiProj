const mongoose = require('mongoose');

const AccessLogSchema = new mongoose.Schema({
    email: String,
    ip: String,
    date: { type: Date, default: Date.now },
    status: String,
});

module.exports = mongoose.model('AccessLog', AccessLogSchema);
