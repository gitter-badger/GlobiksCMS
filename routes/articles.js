var express = require('express'),
    config = require('../config/config.json'),
    router = express.Router();

var faker = require('faker/locale/ru'),
    Article = require('../models/article');

/* GET home page. */
router.get('/', function (req, res, next) {
    Article.find({}, function (err, articl) {
        if (err) throw err;
        var articless = {};
        articless.total = articl.length;
        articless.post = articl;

        res.json({
            title: config.title,
            description: config.description,
            articles: articless
        });
    });
//        .limit(10);
//Article.find().limit(10);
    //    res.render('articles', {
    //        title: config.title,
    //        description: config.description,
    //        articles: articless
    //    });


});

router.post('/add', function (req, res, next) {
    //    var date = new Date();
    //    var time = {
    //        date: date,
    //        year: date.getFullYear(),
    //        month: date.getFullYear() + "-" + (date.getMonth() + 1),
    //        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
    //        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
    //            date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
    //    }
    var article = new Article({
        title: faker.lorem.sentence(),
        author: faker.internet.userName(),
        description: faker.lorem.paragraphs()
            //        images: faker.image.image(),
            //        modified: time
    });
    article.save(function (err, article) {
        if (!err) {
            //            console.log("New article - %s:%s", article.title, article.author);
        } else {
            return console.log(err);
        }
    });
    res.render('articles_add', {
        title: config.title,
        description: config.description
    });
});

module.exports = router;