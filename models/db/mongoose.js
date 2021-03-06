var mongoose = require('mongoose');
var config = require('../../config/config.json');

mongoose.connect(config.mongoose.uri);

var db = mongoose.connection;

db.on('error', function (err) {
	console.log('Connection error:'+ err.message);
});

db.once('open', function callback () {
	console.log("Connected to DB!");
});

module.exports = mongoose;