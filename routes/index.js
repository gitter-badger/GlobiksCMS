var express = require('express');
var config = require('../config/config.json'); // конфиг сайта
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("Cookies: ", req.cookies);
    console.log(req.session);
    res.render('index', {
        title: config.title,
        description: config.description
    });
});

module.exports = router;