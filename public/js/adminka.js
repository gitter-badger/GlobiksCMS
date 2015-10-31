// Стилизация checkbox
var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));

elems.forEach(function (html) {
    var switchery = new Switchery(html);
});

// всавка курсора в textarea
function getCaretPos(obj) {
    // alert(obj);
    obj.focus();
    if (document.selection) { // IE
        var sel = document.selection.createRange();
        var clone = sel.duplicate();
        sel.collapse(true);
        clone.moveToElementText(obj);
        clone.setEndPoint('EndToEnd', sel);
        return clone.text.length;
    } else if (obj.selectionStart !== false) return obj.selectionStart; // Gecko
    else return 0;
}

//var txtarea = document.getElementById('text');
//var pos = getCaretPos(txtarea);
//txtarea.value = txtarea.value.substring(0, pos) + data + txtarea.value.substring(pos, txtarea.value.length);

/*
 * Добавляем статью в на сайт
 */
(function ($) {
    j = jQuery;
    j(function () {
        j("#post_add").click(function (e) {
            e.preventDefault();
            var title = j('input[name=title]').val(),
                post = j('#input_post').val(),
                title_site = j('input[name=title_site]').val(),
                desc = j('#input_desc').val(),
                comment = j('#comments').prop("checked"),
                publish = j('#publish').prop("checked"),
                avtor = j("#avtor :selected").val(),
                poll = j('#poll').prop("checked");
            console.log("Article Add- %s: %s: %s: %s:%s:%s:%s:%s", title, post, title_site, desc, comment, poll,avtor, publish);
            j.post('/admin/article-post-add', {
                'title': title,
                'post': post,
                'title_site': title_site,
                'desc': desc,
                'comment': comment,
                'poll': poll,
                'avtor': avtor,
                'publish': publish
            }, function (data) {
                console.log(data);
                var obj = JSON.parse(JSON.stringify(data));
                if (obj.error == 0) {
                    // тут очистка полей
                    //                    var title = j('input[name=title]').val(''),
                    //                        post = j('#input_post').val(''),
                    //                        title_site = j('input[name=title_site]').val(''),
                    //                        desc = j('#input_desc').val('');

                } else {
                    // тут вывод сообщения об ошибке
                }
            });
            return false;
        });
    }); // j(function()
})(jQuery);