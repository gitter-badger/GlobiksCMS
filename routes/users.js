var faker = require('faker/locale/ru'),
    User = require('../models/user');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    var user = new User({
        username: faker.internet.userName(),
        password: faker.internet.password()
    });
    user.save(function (err, user) {
        if (!err) {
            console.log("New user - %s:%s", user.username, user.password);
        } else {
            return console.log(err);
        }
    });
    
    User.find({}, function (err, users) {
        if (err) throw err;

        // object of all the users
        console.log(users);
    });
    
    res.json({
        username: faker.internet.userName(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: faker.address.streetAddress(),
        bio: faker.lorem.sentence(),
        image: faker.image.avatar(),
        password: faker.internet.password()
    });
    //  res.send('respond with a resource');

});

module.exports = router;