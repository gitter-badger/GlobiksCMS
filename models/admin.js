var Article = require('../models/article'),
    translit = require('iso_9/translit');

module.exports.PostSave = function (title, avtor, post, title_site, publish, comment, poll, desc, key, callback) {
    Article.count({}, function (err, articl) {
        console.log(articl);
        var article = new Article({
            some: articl,
            title: title,
            author: avtor,
            post: post,
            title_site: title_site,
            publish: publish,
            comment_show: comment,
            poll: poll,
            description: desc,
            keywords: key,
            url: articl + '-' + translit(title, 5).replace(/\s+/g, '-')
                //        images: faker.image.image(),
        });

        article.save(function (err, article) {
            if (!err) {
                callback(err, true);
            } else {
                return callback(err, false);
            }
        });
    });
}