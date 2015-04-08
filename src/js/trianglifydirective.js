app.directive("ngTrianglify", function() {
    return {
        restrict: 'AE',
        scope: {
            options: "=",
            interval: "@",
            fullscreen: "@"
        },
        link: function(scope, element, attr, ctrl) {
            var width = 0;
            var height = 0;
            var bg1 = $("<canvas id='bg1''></canvas>").css({
                "z-index": 0,
                "position": "absolute"
            });
            var bg2 = $("<canvas id='bg2''></canvas>").css({
                "z-index": 1,
                "position": "absolute"
            });
            element.append(bg1);
            element.append(bg2);
            bg2.fadeOut();
            resize();
            setBackground(true);

            if (scope.interval) {
                setInterval(() => {
                    scope.options = null;
                    setBackground()
                }, scope.interval);
            }

            $(window).resize(() => {
                resize();
                setBackground()
            });

            function resize() {
                width = scope.fullscreen ? $(document).width() : element[0].offsetWidth;
                height = scope.fullscreen ? $(document).height() : element[0].offsetHeight;
            }

            var dobg1 = false;

            function setBackground(first) {
                var now = moment.utc();
                var pattern = Trianglify({
                    width: width,
                    height: height,
                    cell_size: 150,
                    seed: now.hour() * 3600 + now.minute() * 60 + Math.floor(now.seconds() / 10)
                });

                if (first) scope.options = pattern.opts; //Check if it is the first time this is called, then no apply is needed.
                else scope.$apply(function() {
                    scope.options = pattern.opts;
                });

                if (first)
                    pattern.canvas(bg1[0]);
                else {
                    if (dobg1) {
                        pattern.canvas(bg1[0]);
                        bg2.fadeOut(1000);
                        dobg1 = false;
                    } else {
                        pattern.canvas(bg2[0]);
                        bg2.fadeIn(1000);
                        dobg1 = true;
                    }
                }

            }
        }
    };
});