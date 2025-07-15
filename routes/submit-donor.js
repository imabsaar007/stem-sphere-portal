const express = require('express');
const router = express.Router();
const Donor = require('../models/user'); // Adjust the path as necessary

router.post('/submit-donor', async (req, res) => {
  try {
    const donor = new Donor(req.body);
    await donor.save();
    res.json({ success: true, message: 'Donor registered successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;