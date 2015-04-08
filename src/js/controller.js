app.controller("MainController", ["$scope",
    function($scope) {
        var birthdate = moment("1996-12-20 15:59").startOf('minute');
        this.age = moment().diff(birthdate, 'seconds');
        this.ageyears = moment().diff(birthdate, 'years');

        setInterval(() => $scope.$apply(() => this.age++), 1000);

        setTimeout(function() {
            $(".loadanim").addClass("visible");
        }, 150);

        $(".hoverdarker").hover(function() {
                $(this).css('background-color', rgbToString(darken($(this).data('bgcolor'), 30)));
            },
            function() {
                $(this).css('background-color', rgbToString($(this).data('bgcolor'), 30));
            });

        $scope.$watch(function() {
            return $scope.triangleconfig;
        }, function(newValue) {
            if (newValue) {
                setColors(newValue);
            }
        });

        function setColors(options) {
            var newRgb1 = averageColors(hexToRgb(options.x_colors[0]),
                hexToRgb(options.y_colors[Math.floor(options.y_colors.length / 2)]));
            var newRgb2 = averageColors(hexToRgb(options.x_colors[options.x_colors.length - 1]),
                hexToRgb(options.y_colors[Math.floor(options.y_colors.length / 2)]));

            var ultimateRgb = averageColors(newRgb1, newRgb2);
            var secondColor = darken(ultimateRgb, 60);
            var thirdColor = lighten(ultimateRgb, 30);

            var rs = ultimateRgb.r / 255;
            var rg = ultimateRgb.g / 255;
            var rb = ultimateRgb.b / 255;
            var contentColor = {
                r: Math.min(Math.floor(ultimateRgb.r + (200 * (1 - rs))), 255),
                g: Math.min(Math.floor(ultimateRgb.g + (200 * (1 - rg))), 255),
                b: Math.min(Math.floor(ultimateRgb.b + (200 * (1 - rb))), 255)
            };

            for (var i = 0; i < 4; i++) {
                $(".logocircle").css("background-color", rgbToString(ultimateRgb));
                $(".logo").css("color", rgbToString(thirdColor));
                $(".logo").css("background-color", rgbToString(secondColor));
            }
            $(".bgcolor").css("background-color", rgbToString(contentColor)).data("bgcolor", contentColor);
            $(".darkbgcolor").css("background-color", rgbToString(ultimateRgb)).data("bgcolor", ultimateRgb);
            $(".ultradarkbgcolor").css("background-color", rgbToString(secondColor)).data("bgcolor", ultimateRgb);
            $(".bgcolor-transparent").css("background-color", rgbToString(contentColor, 0.8)).data("bgcolor", contentColor);
            $(".darkbgcolor-transparent").css("background-color", rgbToString(ultimateRgb, 0.8)).data("bgcolor", ultimateRgb);
            $(".ultradarkbgcolor-transparent").css("background-color", rgbToString(secondColor, 0.8)).data("bgcolor", ultimateRgb);
            $(".ultradarkcolor").css("color", rgbToString(secondColor)).data("color", secondColor);
            $(".darkcolor").css("color", rgbToString(ultimateRgb)).data("color", ultimateRgb);
            $(".lightcolor").css("color", rgbToString(thirdColor)).data("color", thirdColor);
            $(".ultralightcolor").css("color", rgbToString(contentColor)).data("color", contentColor);
        }

        function stringToRGB(string) {
            var rgbinfo = string.split('rgb')[1];
            rgbinfo = rgbinfo.replace('(', '').replace(')', '').replace(' ', '');
            var finalinfo = rgbinfo.split(',');

            var rgb = {
                r: parseInt(finalinfo[0]),
                g: parseInt(finalinfo[1]),
                b: parseInt(finalinfo[2])
            };
            return rgb;
        }

        function rgbToString(rgb, a) {
            var newRgb = "rgb";
            if (rgb.a || a)
                newRgb += "a";

            newRgb += "(" + rgb.r + "," + rgb.g + "," + rgb.b;
            if (rgb.a || a)
                newRgb += ", " + (rgb.a ? rgb.a : a)
            newRgb += ")"
            return newRgb
        }

        function darken(rgb, amount, percentage) {
            if (!percentage) {
                var newRgb = {
                    r: Math.max(rgb.r - amount, 0),
                    g: Math.max(rgb.g - amount, 0),
                    b: Math.max(rgb.b - amount, 0)
                };
            } else {
                var newRgb = {
                    r: Math.max(Math.floor(rgb.r - (rgb.r * amount)), 0),
                    g: Math.max(Math.floor(rgb.g - (rgb.g * amount)), 0),
                    b: Math.max(Math.floor(rgb.b - (rgb.b * amount)), 0)
                }
            }
            return newRgb;
        }

        function lighten(rgb, amount, percentage) {
            if (!percentage) {
                var newRgb = {
                    r: Math.min(rgb.r + amount, 255),
                    g: Math.min(rgb.g + amount, 255),
                    b: Math.min(rgb.b + amount, 255)
                };
            } else {
                var newRgb = {
                    r: Math.min(Math.floor(rgb.r + (rgb.r * amount)), 255),
                    g: Math.min(Math.floor(rgb.g + (rgb.g * amount)), 255),
                    b: Math.min(Math.floor(rgb.b + (rgb.b * amount)), 255)
                }
            }
            return newRgb;
        }

        function averageColors(rgbx, rgby) {
            var newRgb = {};
            newRgb.r = Math.max(0, loopNumber(Math.floor((rgbx.r + rgby.r) / 2), 0, 255));
            newRgb.g = Math.max(0, loopNumber(Math.floor((rgbx.g + rgby.g) / 2), 0, 255));
            newRgb.b = Math.max(0, loopNumber(Math.floor((rgbx.b + rgby.b) / 2), 0, 255));
            return newRgb;
        }

        function hexToRgb(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        function loopNumber(number, min, max) {
            while (number < min || number > max) {
                if (number < min) {
                    number += max;
                } else {
                    number -= max;
                }
            }
            return number;
        }
    }
]);