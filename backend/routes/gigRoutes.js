const express = require('express');
const Gig = require('../models/Gig');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, price, skillsRequired } = req.body;
        const gig = new Gig({ title, description, price, skillsRequired, postedBy: req.user.userId });
        await gig.save();
        res.status(201).json({ message: 'Gig created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const gigs = await Gig.find().populate('postedBy', 'name email');
        res.json(gigs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
