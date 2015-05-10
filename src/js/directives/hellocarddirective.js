app.directive("ngHello", ["ColorService",
    function(ColorService) {
        return {
            restrict: 'AE',
            templateUrl: '/js/directives/hellocarddirective.html',
            link: function(scope, element, attr, ctrl) {
                $(element).find('.fa').click(function() {
                    $(element).find('.fronttextcard').toggleClass('current');
                    $(element).find('.backtextcard').toggleClass('current');
                    $(element).toggleClass('backactive');
                });


                var colorsloaded = false;
                scope.$watch(function() {
                    return ColorService.colors;
                }, function(newValue) {
                    if (newValue && !$.isEmptyObject(newValue)) {
                        colorsloaded = true;
                        loadColors();
                    }
                }, true);

                $(window).load(function() {

                    $(element).css({
                        opacity: 1
                    });
                    loadColors();
                })

                function loadColors() {
                    $(element).find('.darkcolor').css({
                        color: ColorService.rgbToString(ColorService.colors.darkcolor)
                    });
                    $(element).find('.ultradarkcolor').css({
                        color: ColorService.rgbToString(ColorService.colors.ultradarkcolor)
                    });
                    $(element).find('.ultradarkbgcolor').css({
                        'background-color': ColorService.rgbToString(ColorService.colors.ultradarkcolor)
                    })
                    $(element).find('.darkbgcolor').css({
                        'background-color': ColorService.rgbToString(ColorService.colors.darkcolor)
                    });

                    $(element).find('.active .fa').css('color', '#fff'); //Make active color white
                }
            }
        };
    }
]);