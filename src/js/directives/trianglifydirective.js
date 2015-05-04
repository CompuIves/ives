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
            setBackground();

            var timer;
            scope.$watch('interval', function(newValue) {
                if (newValue && !isNaN(newValue) && newValue > 0 && newValue < 1000) {
                    if (timer) clearInterval(timer);
                    timer = setInterval(() => {
                        scope.options = null;
                        setBackground();
                    }, Math.max(1000, scope.interval * 1000));
                } else if (newValue == 0) {
                    if (timer)
                        clearInterval(timer);
                }
            }, true);

            scope.$watch('options', function(newValue) {
                if (!newValue) {
                    setBackground();
                }
            }, true);

            $(window).resize(() => {
                if (resize()) {
                    setBackground();
                }
            });


            function resize() {
                $(element).parent().css('height', element[0].offsetHeight);
                //Only generate when there is a bigger size, otherwise it is wasted memory
                if (element[0].offsetWidth > width || element[0].offsetHeight > height) {
                    width = element[0].offsetWidth;
                    height = element[0].offsetHeight;
                    bg1.css('height', height);
                    bg2.css('height', height);
                    return true;
                } else return false;
            }

            var dobg1 = true;
            var timerReset = true; //Prevents too many background changes (max 1 per sec)
            var applyAfterTimeout = false; //Tells if the background reset should be applied after timer

            function setBackground() {
                if (timerReset) {
                    var pattern = Trianglify({
                        width: width,
                        height: height,
                        cell_size: 150
                    });


                    scope.options = pattern.opts;

                    if (dobg1) {
                        pattern.canvas(bg1[0]);
                        bg2.fadeOut(1000);
                        dobg1 = false;
                    } else {
                        pattern.canvas(bg2[0]);
                        bg2.fadeIn(1000);
                        dobg1 = true;
                    }
                    timerReset = false;
                    applyAfterTimeout = false;
                    setTimeout(function() {
                        timerReset = true;
                        if (applyAfterTimeout)
                            setBackground();
                    }, 1000);
                } else {
                    applyAfterTimeout = true;
                }
            }
        }
    };
});