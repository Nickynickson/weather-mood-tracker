const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    mood: { type: String, required: true },
    notes: { type: String },
    date: { type: Date, default: Date.now },
    weather: { type: Object, required: true }
});

module.exports = mongoose.model('Mood', moodSchema);
