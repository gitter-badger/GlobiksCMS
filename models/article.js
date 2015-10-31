var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var id = new mongoose.Types.ObjectId;
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
    //    images: [Images],
    modified: {
        type: Date,
        default: Date.now
    },
    url: {
        type: String,
        lowercase: true
    }
});

Article.path('title').validate(function (v) {
    if(v.length > 5 && v.length < 350) return true
        return v.length
}, 'Заголовок не может быть короче 5 и дленее 350 символов');
//Article.path('url').validate(function (v){
//    
//}
//Article.path('url').validate(function (url) {
//  // if you are authenticating by any of the oauth strategies, don't validate
////  if (authTypes.indexOf(this.provider) !== -1) return true
//  return url+'-';
//}, 'URL cannot be blank');

module.exports = mongoose.model('Article', Article);
