app.directive("ngTrianglify", function() {
    return {
        restrict: 'AE',
        scope: {
            options: "=",
            interval: "@"
        },
        link: function(scope, element, attr, ctrl) {
            var width = 0;
            var height = 0;
            resize();
            setBackground();

            var timer;
            scope.$watch('interval', function(newValue) {
                if (newValue && !isNaN(newValue) && newValue > 0 && newValue < 1000) {
                    if (timer) clearInterval(timer);
                    timer = setInterval(() => {
                        scope.options = null;
                        setBackground();
                    }, scope.interval * 1000);
                }
            }, true);

            scope.$watch('options', function(newValue) {
                if (!newValue) {
                    setBackground();
                }
            }, true);

            $(window).resize(() => {
                resize();
                setBackground();
            });

            function resize() {
                width = element[0].offsetWidth;
                height = element[0].offsetHeight;
            }


            function setBackground() {
                var pattern = Trianglify({
                    width: width,
                    height: height,
                    cell_size: 150
                });

                scope.options = pattern.opts;
                $(element).css('background-image', 'url(' + pattern.png() + ')');
            }
        }
    };
});