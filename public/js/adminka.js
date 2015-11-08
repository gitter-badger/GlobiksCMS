var dom = {};

dom.id = function (id) { return document.getElementById(id) };

dom.remove = function (el) {
   if(el) el.parentNode.removeChild(el);
}

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

(function ($) {
    j = jQuery;
    j(function () {
        resizeImage = function ($image, width, height) {
            var originalWidth = parseInt($image.data('originalWidth'), 10),
                originalHeight = parseInt($image.data('originalHeight'), 10),
                ratio,
                defaultWidth,
                defaultHeight,
                link = $image.attr('src'),
                linkParams;

            if (typeof width === 'undefined' || width === null) {
                width = parseInt($image.attr('width'), 10);
            }

            if (typeof height === 'undefined' || height === null) {
                height = parseInt($image.attr('height'), 10);
            }

            defaultWidth = width;
            defaultHeight = height;

            /* Для старых изображений, без сохраненных оригинальных размеров */
            if (isNaN(originalWidth) || originalWidth === 0 || isNaN(originalHeight) || originalHeight === 0) {
                $image
                    .attr({
                        width: '',
                        height: ''
                    })
                    .css({
                        maxWidth: 'none',
                        maxHeight: 'none'
                    });

                originalWidth = $image.width();
                originalHeight = $image.height();

                ratio = originalWidth / originalHeight;

                var maxWidth = Math.min(originalWidth, pageWidth),
                    maxHeight = (maxWidth === originalWidth ? originalHeight : Math.round(maxWidth / ratio));

                $image
                    .attr({
                        width: width,
                        height: height,
                        'data-original-width': originalWidth,
                        'data-original-height': originalHeight
                    })
                    .css({
                        maxWidth: maxWidth,
                        maxHeight: maxHeight
                    });
            } else {
                ratio = originalWidth / originalHeight;
            }

            width = Math.min(originalWidth, pageWidth, width);
            height = (width === originalWidth ? originalHeight : Math.round(width / ratio));

            if (link.substr(0, 7) === 'http://') {
                linkParams = link.substr(7).split('/');
            } else {
                linkParams = link.split('/');
            }

            /* Проверка соответсвия ссылки определенной структуре, и обновление ее */
            if (linkParams.length === 6 && linkParams[0] === window.location.host && (linkParams[1] === 'r' || linkParams[1] === 'c') &&
                isDecimal(linkParams[2]) && isDecimal(linkParams[3])) {
                link = 'http://' + linkParams[0] + '/' + linkParams[1] + '/' + width + '/' + height + '/' + linkParams[4] + '/' + linkParams[5];
                $image.attr({
                    src: link,
                    'data-mce-src': link
                });
            }

            if (width !== defaultWidth || height !== defaultHeight) {
                $image.attr({
                    width: width,
                    height: height
                });
            }
        }

        tinymce.init({
            //-selector: "textarea",
            mode: "exact",
            //-language: "ru",
            height: 400,
            elements: "input_post",
            //-editor_deselector : "mceNoEditor",
            theme: "modern",
            plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor colorpicker textpattern imagetools"
        ],
            toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
            toolbar2: "print preview media | forecolor backcolor emoticons | pagebreak",
            image_advtab: true,
            content_css: "/css/style.css",
            setup: function (editor) {
                editor.on('NodeChange', function (e) {
                    if (e.element.nodeName === 'IMG' && e.element.classList.contains('mce-object') === false) {
                        resizeImage($(e.element), e.width, e.height);
                    }
                });
            }
        });
    }); // j(function()
})(jQuery);
/*
 * @description Tab - Табы
 */
(function ($) {
    j = jQuery;
    j(function () {
        jQuery.fn.lightTabs = function (options) {
            var createTabs = function () {
                tabs = this;
                i = 0;
                showPage = function (i) {
                    j(tabs).children("div").children("div").hide();
                    j(tabs).children("div").children("div").eq(i).show();
                    j(tabs).children("ul").children("li").removeClass("active");
                    j(tabs).children("ul").children("li").eq(i).addClass("active");
                }
                showPage(0);
                j(tabs).children("ul").children("li").each(function (index, element) {
                    j(element).attr("data-page", i);
                    i++;
                });
                j(tabs).children("ul").children("li").click(function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    showPage(parseInt($(this).attr("data-page")));
                });
            };
            return this.each(createTabs);
        };
    }); // j(function()
})(jQuery);

/*
 * dran`drop - загрузка файлов при добавлении статьи
 */
Dropzone.options.myDropzone = {
    parallelUploads: 4,
    thumbnailWidth: 235,
    thumbnailHeight: 235,
    dictDefaultMessage: "Перетащите сюда фото одно или несколько но не более 4-х за раз",
    init: function () {
        this.on("addedfile", function (file) {
            // Create the remove button
            var removeButton = Dropzone.createElement('<button class="remove btn btn-default btn-large btn-bloc">Удалить файл</button>');
            //                    var add = Dropzone.createElement('<button id="" class="btn btn-default btn-large btn-bloc">вставить</button>');
            // Capture the Dropzone instance as closure.
            var _this = this;
            // Listen to the click event
            removeButton.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                // Remove the file preview. - удаляем прьвью фото
                _this.removeFile(file);
                /*==========================================================
                 * If you want to the delete the file on the server as well, 
                 * you can do the AJAX request here.
                 * ==========================================================
                 * Если вы хотите, чтобы удалить файл на сервере, а также,
                 * Вы можете сделать запрос AJAX здесь.
                 */

            });
            // Add the button to the file preview element. - добавляем кнопки удаления к превью фото
            file.previewElement.appendChild(removeButton);

        });
        
        var i = 1;
        this.on("success", function (file, responseText) {
            //                    var attr = file.previewElement.querySelectorAll("[data-dz-thumbnail]"),
            //                        data;
            //                    for (var _i = 0, _len = attr.length; _i < _len; _i++) {
            //                        data = attr[0]['attributes'];
            //                    }
            //                    var d = data[0].value = responseText.upload;

            console.log(file);


            var d = responseText.upload;

            var add = Dropzone.createElement('<button id="add" class="btn btn-default btn-large btn-bloc">Вставить</button>');
            var details = file.previewElement.querySelector(".dz-details");
            details.appendChild(add);
            /*
             * @description вставляем фото в редактор
             */
            add.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                var iframe = document.getElementsByTagName("iframe")[0];
                var iframe_body = iframe.contentWindow.document.getElementById("tinymce");
                var elem = document.createElement('p');
                elem.innerHTML = '<img id="foto'+ i++ +'" src="' + d + '" >';
                iframe_body.appendChild(elem);
            });

        });
    }
};


// Стилизация checkbox
var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
elems.forEach(function (html) {
    var switchery = new Switchery(html);
});

//======================================
//    _  ___                        
//   (_)/ _ \ _   _  ___ _ __ _   _ 
//   | | | | | | | |/ _ \ '__| | | |
//   | | |_| | |_| |  __/ |  | |_| |
//  _/ |\__\_\\__,_|\___|_|   \__, |
// |__/                       |___/ 
//
//======================================

(function ($) {
    j = jQuery;
    j(function () {
        /*
         * Добавляем статью на сайт
         */
        j("#post_add").click(function (e) {
            e.preventDefault();
            var e = j('#input_desc').remove();
            var title = j('input[name=title]').val(),
                csrf = j('input[name=_csrf]').val(),
                post = j('#input_post').val(),
                title_site = j('input[name=title_site]').val(),
                desc = j('#input_desc').val(),
                key = j('#input_key').val(),
                comment = j('#comments').prop("checked"),
                publish = j('#publish').prop("checked"),
                avtor = j("#avtor :selected").val(),
                poll = j('#poll').prop("checked");
            console.log("Article Add - %s: %s: %s: %s:%s:%s:%s:%s:%s", title, post, title_site, desc, comment, poll, avtor, publish, key);
            j.post('/admin/article-post-add', {
                'title': title,
                'post': post,
                'title_site': title_site,
                'desc': desc,
                'comment': comment,
                'poll': poll,
                'avtor': avtor,
                'publish': publish,
                'key': key,
                'csrf': csrf
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

$(document).ready(function () {
    $("#dropfile").lightTabs();
});