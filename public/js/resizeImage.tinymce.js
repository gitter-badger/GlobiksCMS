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
            mode: "exact",
            height: 400,
            elements: "input_post",
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