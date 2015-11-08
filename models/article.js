var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
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
    some: {
        type: Number,
        required: true
    },
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
    publish: {
        type: Boolean,
        required: true
    },
    comment_show: {
        type: Boolean,
        required: true
    },
    poll: {
        type: Boolean,
        required: true
    },
    //    comments: [{
    //        text: String,
    //        postedBy: {
    //            type: mongoose.Schema.Types.ObjectId,
    //            ref: 'User'
    //        }
    //    }]
    description: {
        type: String,
        required: true
    },
    keywords: {
        type: String,
        required: true
    },
    //    images: [Images],
    modified: {
        type: Date,
        default: Date.now
    },
    url: {
        type: String,
        lowercase: true,
        trim: true
    }
});

Article.path('title').validate(function (v) {
    if (v.length > 5 && v.length < 350) return true
    return v.length
}, 'Заголовок не может быть короче 5 и дленее 350 символов');


module.exports = mongoose.model('Article', Article);