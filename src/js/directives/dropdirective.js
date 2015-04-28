app.directive("ngDrop", function() {
    return {
        restrict: 'AE',
        scope: {
            options: "@"
        },
        link: function(scope, element, attr, ctrl) {
            var width = 0;
            var height = 0;
            var r = 0;
            var offsetX = 0;
            var offsetY = 0;

            var circle = $("<div unselectable='on' id='circle'></div>");
            element.append(circle);

            setSize();

            $(window).resize(setSize);
            scope.$watch('options', function(newValue) {
                if (newValue) {
                    addCircle(JSON.parse(scope.options));
                } else {
                    circle.stop().animate({
                        'opacity': 0
                    }, 300);
                }
            }, true);

            function setSize() {
                width = $(element).parent().width();
                height = $(element).parent().height() + 1500;
                offsetX = $(element).parent().offset().left;
                offsetY = $(element).parent().offset().top;
                r = Math.sqrt(width * width + height * height);
            }

            function addCircle(options) {
                circle.css({
                    position: 'absolute',
                    'background-color': options.color,
                    width: 0,
                    height: 0,
                    "border-radius": "50%",
                    left: options.pos.x,
                    top: options.pos.y,
                    'margin-left': 0,
                    'margin-top': 0,
                    'webkit-user-select': 'none',
                    '-moz-user-select': 'none',
                    '-ms-user-select': 'none',
                    opacity: 1,
                    'pointer-events': 'none',
                    '-webkit-transform': 'translateZ(0)'
                });

                circle.stop().animate({
                    width: (r * 2),
                    height: (r * 2),
                    'margin-left': -r,
                    'margin-top': -r
                }, {
                    duration: 600,
                    easing: "easeInOutCubic",
                    queue: true
                });

            }
        }
    };
});