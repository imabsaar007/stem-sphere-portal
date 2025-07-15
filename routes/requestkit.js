const express = require('express');
const router = express.Router();
const { connections } = require('../config/db');
const GetKit = require('../models/getKitSchema');

router.post('/request-kit', async (req, res) => {
  try {
    console.log('Request body:', req.body); // Log the incoming request data
    const { name, gender, email, phone, address, state, district, city, pincode, consent } = req.body;

    // Validate required fields
    if (!name || !gender || !email || !phone || !address || !state || !district || !city || !pincode || consent === undefined) {
      return res.status(400).json({ message: 'All fields are required, including consent' });
    }

    if (!consent) {
      return res.status(400).json({ message: 'Consent is required' });
    }

    // Ensure the KitRequestDB connection is active
    if (!connections.kitRequestDB || !connections.kitRequestDB.readyState) {
      throw new Error('KitRequestDB connection is not available');
    }

    const KitRequestModel = connections.kitRequestDB.model('GetKit', GetKit.schema);
    const newKitRequest = new KitRequestModel({
      name,
      gender,
      email,
      phone,
      address,
      state,
      district,
      city,
      pincode,
      consent
    });

    const savedKitRequest = await newKitRequest.save();
    console.log('Kit request saved:', savedKitRequest);
    res.status(201).json(savedKitRequest);
  } catch (error) {
    console.error('Error in /request-kit:', error.message, error.stack);
    res.status(400).json({ message: 'There was an issue submitting your request. Please try again.' });
  }
});

module.exports = router;