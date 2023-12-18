const express = require('express');
const router = express();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});
router.get('^/$|/index(.html)?/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});
router.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});
router.get('/old-page(.html)?', (req, res) => {
    res.redirect(301, '/new-page'); // changed status code 301 (default is 302)
});

module.exports = router;