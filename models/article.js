var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//    ObjectId = Schema.ObjectId;
//    
//    // Article
//var Images = new Schema({
//    kind: {
//        type: String,
//        enum: ['thumbnail', 'detail'],
//        required: true
//    },
//    url: {
//        type: String,
//        required: true
//    }
//});

var Article = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    title_site: {
        type: String,
        required: true
    },
    comment: {
        type: Boolean,
        required: true
    },
    poll: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    //    images: [Images],
    modified: {
        type: Date,
        default: Date.now
    }
});

//Article.path('title').validate(function (v) {
//    return v.length > 5 && v.length < 70;
//});

module.exports = mongoose.model('Article', Article);


//function Post(name, head, title, tags, post) {
//    this.name = name;
//    this.head = head;
//    this.title = title.trim();
//    this.tags = tags;
//    this.post = post;
//}
//
//module.exports = Post;
//
//
//Post.prototype.save = function (callback) {
//
//};
//
//Post.prototype.getAll = function (callback) {
//
//};
//
//Post.prototype.update = function (callback) {
//
//};