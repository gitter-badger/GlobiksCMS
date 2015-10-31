var express = require('express'),
    config = require('../config/config.json'), // конфиг
    router = express.Router();

var Article = require('../models/article'), // статьи
    User = require('../models/user'); // пользователи

/*  
 *   @description GET home page. 
 */
router.get('/', function (req, res, next) {
    console.log("Cookies: ", req.cookies);
    console.log(req.session);
    res.render('./admin/admin', {
        title: config.title,
        description: config.description
    });
});

/*  
 *   @description GET article 
 */
router.get('/articles', function (req, res, next) {
    console.log("Cookies: ", req.cookies);
    console.log(req.session);
    res.render('./admin/admin', {
        title: config.title,
        description: config.description
    });
});

/* 
 * @description GET Page adding Article - страница добавления статьи
 */
router.get('/articles/add', function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) {
            throw err
        } else {
            res.render('./admin/article_add', {
                title: config.title,
                description: config.description,
                user: users
            });
            console.log(users);
        }
    });
});

/* 
 *   @description POST add article to the site - добавляем статью в БД
 */
router.all('/article-post-add', function (req, res, next) {
    var title = req.body.title,
        avtor = req.body.avtor,
        post = req.body.post,
        title_site = req.body.title_site,
        desc = req.body.desc,
        comment = req.body.comment,
        poll = req.body.poll;

    var article = new Article({
        title: title,
        author: avtor,
        post: post,
        title_site: title_site,
        comment: comment,
        poll: poll,
        description: desc
            //        images: faker.image.image(),
    });

    article.save(function (err, article) {
        if (!err) {
            res.jsonp({
                error: 0,
                mes: 'Статья добавлена'
            });
        } else {
            return res.jsonp({
                error: 1,
                mes: err
            });;
        }
    });
    //    next();
    //    res.send('POST request to the homepage');
});


module.exports = router;