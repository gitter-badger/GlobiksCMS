
'use strict';
var _ = require('underscore');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'),
    db = require('./models/db/mongoose');
var bodyParser = require('body-parser');
//var cookieSession = require('cookie-session');
var session = require('express-session');

var config = require('./config/config.json'); // конфиг сайта

var routes = require('./routes/index'),
    users = require('./routes/users'),
    articles = require('./routes/articles'),
    admin  = require('./routes/admin');
var csrf = require('csurf');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.disable('x-powered-by');
//app.use(cookieParser());
app.use(cookieParser(config.secret));

//app.use(csrf({ cookie: true }));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('trust proxy', 1); // trust first proxy
app.use(session({
    key: 'globiks',
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        //      secure: true, // 
        maxAge: 36000000
    }
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/articles', articles);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
//    res.locals.csrftoken = req.csrfToken();
 
  // handle CSRF token errors here 
  res.status(403);
  res.send('form tampered with');
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(process.env.PORT || config.port);

module.exports = app;