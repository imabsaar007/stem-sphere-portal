const express = require('express');
const router = express.Router();

router.get('/get-kit', (req, res) => {
    res.render('get-kit');
});

module.exports = router;