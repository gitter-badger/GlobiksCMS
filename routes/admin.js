var express = require('express'),
    config = require('../config/config.json'), // конфиг
    router = express.Router();

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var Article = require('../models/article'), // статьи
    User = require('../models/user'); // пользователи
var Admin = require('../models/admin');

var Upload = require('../lib/upload');


var parseForm = bodyParser.urlencoded({ extended: false });
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
router.get('/articles/add', csrfProtection, function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.header("Access-Control-Allow-Credentials", "false");
    User.find({}, function (err, users) {
        if (err) {
            throw err
        } else {
            res.render('./admin/article_add', {
                title: config.title,
                description: config.description,
                csrftoken: req.csrfToken(),
                user: users
            });
            //            console.log(users);
        }
    });
});

/* 
 *   @description POST add article to the site - добавляем статью на сайт
 */
router.post('/article-post-add', parseForm, function (req, res, next) {
    console.log(parseForm);
//    console.log(req.csrfToken());
    var title = req.body.title,
        avtor = req.body.avtor,
        post = req.body.post,
        title_site = req.body.title_site,
        desc = req.body.desc,
        comment = req.body.comment,
        poll = req.body.poll,
        publish = req.body.publish,
        key = req.body.key,
        csrf = req.body.csrf;
    console.log(csrf);
//    console.log(req.cookies);
    console.log(req);
//    console.log(req.csrfToken());
    Admin.PostSave(title, avtor, post, title_site, publish, comment, poll, desc, key, function (err, call) {
        if (!err) {
            res.jsonp({
                error: 0,
                mes: 'Статья добавлена'
            });
        } else {
            res.jsonp({
                error: 1,
                mes: err
            });
        }
    });
});

/* 
 *   @description POST add upload foto to the site - добавляем фото на сайт
 */
router.post('/upload', multipartMiddleware, function(req, res, next){
//    console.log(req);
//    console.log(req.files);
    Upload(req.files, function(err, done){
        if (err) throw err;
        res.status(200);
        res.jsonp({
            error: 0,
            upload: done
        });
    });
});
module.exports = router;