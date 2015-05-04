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
                    $(this).removeClass('hidden');
                }
            });
        }
    }

    function reset() {
        $('.scrollfade').each(function() {
            $(this).addClass('hidden');
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