app.factory('ScrollService', function() {
    function scroll() {
        var windowBottom = $(window).scrollTop() + $(window).innerHeight();
        $('.scrollfade').each(function() {
            var top = $(this).offset().top;

            if (top + $(this).outerHeight() * 0.4 < windowBottom) {
                if ($(this).css('opacity') == 0) {
                    $(this).animate({
                        opacity: 1,
                        top: 0
                    }, {
                        duration: 300
                    });
                }
            } else {
                if ($(this).css('opacity') == 1) {
                    $(this).animate({
                        opacity: 0,
                        top: 10
                    }, {
                        duration: 300
                    });
                }
            }
        });
    }

    scroll();

    $(window).scroll(() => scroll());

    return scroll;
});