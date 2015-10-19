var express = require('express');
var config = require('../config/config.json'); // конфиг сайта
var router = express.Router();

/* GET home page. */
router.get('/articles/', function (req, res, next) {
    console.log(res);
    res.render('articles', {
        title: config.title,
        description: config.description
    });
});

module.exports = router;