const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/donor-register', (req, res) => {
    res.render('donor-register');
});

router.get('/recipient-register', (req, res) => {
    res.render('recipient-register');
});

module.exports = router;