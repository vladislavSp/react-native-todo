const express = require('express');
const router = express.Router();
const path = require('path');

//'^/$|/index(.html)?' - регулярка для поиска главной страницы
router.get('^/$|/index(.html)?', (req, res) => {
    res.send('Hello Server!'); // sendFile
});

// // 301 редирект со старой страницы пример
// router.get('/old-page(.html)?', (req, res) => {
//     res.redirect(301, '/'); // 302 by default
// });

// router.get('/reqLog', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'logs', 'reqLog.txt'));
// });

// router.get('/errLog', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'logs', 'errLog.txt'));
// });

module.exports = router;
