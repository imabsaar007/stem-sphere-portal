const express = require('express');
const router = express.Router();
router.get('/account', (req, res) => {
    res.render('account');
});
module.exports = router;