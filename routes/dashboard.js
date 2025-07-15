const express = require('express');
const router = express.Router();
const Donor = require('../models/user');

router.get('/donors', async (req, res) => {
    try {
        const donors = await Donor.find();
        res.render('dashboard', { donors: donors }); // Render EJS template with data
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/', (req, res) => {
  res.render('dashboard'); // Initial dashboard page
});

module.exports = router;