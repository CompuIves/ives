app.factory('ScrollService', function() {
    var disabled = false;

    function disable() {
        $('.scrollfade').css('opacity', 1);
        disabled = true;
    }

    function scroll() {
        if (!disabled) {
            var windowBottom = $(window).scrollTop() + $(window).innerHeight();
            $('.scrollfade').each(function() {
                var top = $(this).offset().top;

                if (top + $(this).outerHeight() * 0.3 < windowBottom) {
                    if ($(this).css('opacity') == 0) {
                        $(this).animate({
                            opacity: 1,
                            top: 0
                        }, {
                            duration: 300
                        });
                    }
                }
            });
        }
    }

    function reset() {
        $('.scrollfade').each(function() {
            $(this).css('opacity', 0);
        });
    }

    setTimeout(() => {
        if (!disabled) {
            reset();
            scroll();
        }
    }, 0);

    $(window).scroll(() => scroll());

    return disable;
});