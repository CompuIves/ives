app.factory('ScrollService', function() {
    function scroll() {
        var windowBottom = $(window).scrollTop() + $(window).innerHeight();
        $('.scrollfade').each(function() {
            var top = $(this).offset().top;

            if (top + 200 < windowBottom) {
                if ($(this).css('opacity') == 0) {
                    console.log("Fadein");
                    $(this).animate({
                        opacity: 1,
                        top: 0
                    }, {
                        duration: 300,
                        queue: false
                    });
                }
            } else {
                if ($(this).css('opacity') == 1) {
                    console.log("Fadeout");
                    $(this).animate({
                        opacity: 0,
                        top: 10
                    }, {
                        duration: 300,
                        queue: false
                    });
                }
            }
        });
    }

    scroll();

    $(window).scroll(() => scroll());

    return scroll;
});