app.controller("MainController", ["$scope", "uiGmapGoogleMapApi", "ColorService", 'ScrollService',
    function($scope, uiGmapGoogleMapApi, ColorService, ScrollService) {
        var birthdate = moment("1996-12-20 15:59").startOf('minute');
        this.ageyears = moment().diff(birthdate, 'years');
        this.agemonths = moment().subtract(this.ageyears, 'years').diff(birthdate, 'months');
        this.ageseconds = moment().subtract(this.ageyears, 'years').subtract(this.agemonths, 'months').diff(birthdate, 'seconds');
        setInterval(() => $scope.$apply(() =>
            this.ageseconds++
        ), 1000);

        //When maps are loaded
        uiGmapGoogleMapApi.then(function(maps) {
            $scope.map = {
                center: {
                    latitude: 53,
                    longitude: 6.56
                },
                zoom: 12,
                control: {}
            };
        });

        this.showMaps = (() => {
            $(".angular-google-map-container").toggleClass('activated');
        });

        var mapsResized = false;
        $scope.$watch(function() {
            return $(".angular-google-map-container").height();
        }, function(newValue) {
            if (newValue == 400 && !mapsResized) {
                google.maps.event.trigger($scope.map.control.getGMap(), 'resize');
                $scope.map.center = {
                    latitude: 53,
                    longitude: 6.56
                };
                mapsResized = true;
            }
        }, true);

        this.ivesimages = [];
        for (let i = 0; i < 3; i++) {
            this.ivesimages.push("res/images/ives" + i + ".png");
        };

        this.currentIves = Math.floor(Math.random() * 3)
        this.changeIvesImage = () => {
            if (!$scope.$$phase) {
                $scope.$apply(() => (this.currentIves + 1) % 3;
            } else {
                this.currentIves = (this.currentIves + 1) % 3;
            }
        }

        /*
        if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
            ScrollService();
        }*/

        $('.logocircle').hover(function() {
            $(this).find('.logo').css({
                'color': ColorService.rgbToString(ColorService.colors.ultradarkcolor),
                'background-color': ColorService.rgbToString(ColorService.colors.darkcolor)
            });
        }, function() {
            $(this).find('.logo').css({
                'color': ColorService.rgbToString(ColorService.colors.lightcolor),
                'background-color': ColorService.rgbToString(ColorService.colors.ultradarkcolor)
            });
        });


        $scope.interval = 60;
        setTimeout(() => {
            $scope.$watch(function() {
                return $scope.triangleconfig;
            }, (newValue) => {
                if (newValue) {
                    $scope.setColors(newValue);
                    this.changeIvesImage();
                }
            });

            $(".hoverdarker").hover(function() {
                    $(this).css('background-color', ColorService.rgbToString(ColorService.darken($(this).data('bgcolor'), 30)));
                },
                function() {
                    $(this).css('background-color', ColorService.rgbToString($(this).data('bgcolor')));
                });

        }, 0);

        $scope.resetBG = function() {
            $scope.triangleconfig = null;
        }

        $scope.setColors = function(options) {
            var newRgb1 = ColorService.averageColors(ColorService.hexToRgb(options.x_colors[0]),
                ColorService.hexToRgb(options.y_colors[Math.floor(options.y_colors.length / 2)]));
            var newRgb2 = ColorService.averageColors(ColorService.hexToRgb(options.x_colors[options.x_colors.length - 1]),
                ColorService.hexToRgb(options.y_colors[Math.floor(options.y_colors.length / 2)]));

            var ultimateRgb = ColorService.averageColors(newRgb1, newRgb2);
            var secondColor = ColorService.darken(ultimateRgb, 60);
            var thirdColor = ColorService.lighten(ultimateRgb, 30);

            var rs = ultimateRgb.r / 255;
            var rg = ultimateRgb.g / 255;
            var rb = ultimateRgb.b / 255;
            var contentColor = {
                r: Math.min(Math.floor(ultimateRgb.r + (200 * (1 - rs))), 255),
                g: Math.min(Math.floor(ultimateRgb.g + (200 * (1 - rg))), 255),
                b: Math.min(Math.floor(ultimateRgb.b + (200 * (1 - rb))), 255)
            };

            ColorService.colors.bgcolor = contentColor;
            ColorService.colors.darkcolor = ultimateRgb;
            ColorService.colors.ultradarkbgcolor = secondColor;
            ColorService.colors.ultradarkcolor = secondColor;
            ColorService.colors.darkcolor = ultimateRgb;
            ColorService.colors.lightcolor = thirdColor;
            ColorService.colors.ultralightcolor = contentColor;
            ColorService.colors.descriptioncolor = ColorService.lighten(thirdColor, 45);
            ColorService.colors.headercolor = ColorService.darken(secondColor, 25);

            $(".bgcolor").css("background-color", ColorService.rgbToString(contentColor)).data("bgcolor", contentColor);
            $(".darkbgcolor").css("background-color", ColorService.rgbToString(ultimateRgb)).data("bgcolor", ultimateRgb);
            $(".ultradarkbgcolor").css("background-color", ColorService.rgbToString(secondColor)).data("bgcolor", secondColor);
            $(".bgcolor-transparent").css("background-color", ColorService.rgbToString(contentColor, 0.75)).data("bgcolor", contentColor);
            $(".darkbgcolor-transparent").css("background-color", ColorService.rgbToString(ultimateRgb, 0.7)).data("bgcolor", ultimateRgb);
            $(".ultradarkbgcolor-transparent").css("background-color", ColorService.rgbToString(secondColor, 0.75)).data("bgcolor", secondColor);
            $(".ultradarkcolor").css("color", ColorService.rgbToString(secondColor)).data("color", secondColor);
            $(".darkcolor").css("color", ColorService.rgbToString(ultimateRgb)).data("color", ultimateRgb);
            $(".lightcolor").css("color", ColorService.rgbToString(thirdColor)).data("color", thirdColor);
            $(".ultralightcolor").css("color", ColorService.rgbToString(contentColor)).data("color", contentColor);
            $(".headercolor").css("color", ColorService.rgbToString(ColorService.colors.headercolor)).data("color", ColorService.colors.headercolor);
            $(".descriptioncolor").css("color", ColorService.rgbToString(ColorService.colors.descriptioncolor)).data("color", ColorService.colors.descriptioncolor);
        };

        navigationScroll();

        $(window).scroll(navigationScroll);

        function navigationScroll() {
            var windowTopHTML = $("html").scrollTop();
            var windowTopBody = $("body").scrollTop();
            var windowTop = Math.max(windowTopHTML, windowTopBody);
            if (windowTop > 50) {
                $('.header').removeClass('navigator');
                $('ng-hello').addClass('navigator');
            } else {
                $('.header').addClass('navigator');
                $('ng-hello').removeClass('navigator');
            }
        }

        this.goDown = function() {
            var top = 0;
            if ($('#userinforow').offset().top - 120 + $('#userinforow')[0].offsetHeight - $(window).height() > $('#userinforow').offset().top) {
                top = $('#userinforow').offset().top - 120;
            } else {
                top = $('#userinforow').offset().top + $('#userinforow')[0].offsetHeight - $(window).height();
            }
            $("html, body").stop().animate({
                scrollTop: top
            }, 800);
        }
    }
]);
