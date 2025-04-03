const express = require('express');
const Mood = require('../models/Mood');
const router = express.Router();

// POST route to create a new mood entry
router.post('/', async (req, res) => {
    const { userId, mood, notes, weather } = req.body;

    const newMood = new Mood({ userId, mood, notes, weather });

    try {
        const savedMood = await newMood.save();
        res.status(201).json(savedMood);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET route to retrieve mood entries for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const moods = await Mood.find({ userId: req.params.userId });
        res.status(200).json(moods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE route to remove a mood entry by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedMood = await Mood.findByIdAndDelete(req.params.id);

        if (!deletedMood) {
            return res.status(404).json({ message: 'Mood not found.' });
        }

        res.status(200).json({ message: 'Mood deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
