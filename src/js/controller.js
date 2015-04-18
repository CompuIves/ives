app.controller("MainController", ["$scope", "uiGmapGoogleMapApi", "ColorService", 'ScrollService',
    function($scope, uiGmapGoogleMapApi, ColorService, ScrollService) {
        var birthdate = moment("1996-12-20 15:59").startOf('minute');
        this.ageyears = moment().diff(birthdate, 'years');
        this.agemonths = moment().subtract(this.ageyears, 'years').diff(birthdate, 'months');
        this.ageseconds = moment().subtract(this.ageyears, 'years').subtract(this.agemonths, 'months').diff(birthdate, 'seconds');
        setInterval(() => $scope.$apply(() => this.ageseconds++), 1000);


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

        $(".hoverdarker").hover(function() {
                $(this).css('background-color', ColorService.rgbToString(ColorService.darken($(this).data('bgcolor'), 30)));
            },
            function() {
                $(this).css('background-color', ColorService.rgbToString($(this).data('bgcolor'), 30));
            });

        $scope.$watch(function() {
            return $scope.triangleconfig;
        }, function(newValue) {
            if (newValue) {
                setColors(newValue);
            }
        });

        function setColors(options) {
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

            for (var i = 0; i < 4; i++) {
                $(".logocircle").css("background-color", ColorService.rgbToString(ultimateRgb));
                $(".logo").css("color", ColorService.rgbToString(thirdColor));
                $(".logo").css("background-color", ColorService.rgbToString(secondColor));
            }
            $(".bgcolor").css("background-color", ColorService.rgbToString(contentColor)).data("bgcolor", contentColor);
            $(".darkbgcolor").css("background-color", ColorService.rgbToString(ultimateRgb)).data("bgcolor", ultimateRgb);
            $(".ultradarkbgcolor").css("background-color", ColorService.rgbToString(secondColor)).data("bgcolor", ultimateRgb);
            $(".bgcolor-transparent").css("background-color", ColorService.rgbToString(contentColor, 0.8)).data("bgcolor", contentColor);
            $(".darkbgcolor-transparent").css("background-color", ColorService.rgbToString(ultimateRgb, 0.8)).data("bgcolor", ultimateRgb);
            $(".ultradarkbgcolor-transparent").css("background-color", ColorService.rgbToString(secondColor, 0.8)).data("bgcolor", ultimateRgb);
            $(".ultradarkcolor").css("color", ColorService.rgbToString(secondColor)).data("color", secondColor);
            $(".darkcolor").css("color", ColorService.rgbToString(ultimateRgb)).data("color", ultimateRgb);
            $(".lightcolor").css("color", ColorService.rgbToString(thirdColor)).data("color", thirdColor);
            $(".ultralightcolor").css("color", ColorService.rgbToString(contentColor)).data("color", contentColor);
        }
    }
]);