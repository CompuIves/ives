app.directive("ngHello", ["ColorService",
    function(ColorService) {
        return {
            restrict: 'AE',
            templateUrl: '/js/directives/hellocarddirective.html',
            link: function(scope, element, attr, ctrl) {
                $(element).find('.fa').click(function() {
                    $(element).find('.fronttextcard').toggleClass('active');
                    $(element).find('.backtextcard').toggleClass('active');
                    $(element).toggleClass('backactive');
                });


                var colorsloaded = false;
                scope.$watch(function() {
                    return ColorService.colors;
                }, function(newValue) {
                    if (newValue && !$.isEmptyObject(newValue) && !colorsloaded) {
                        colorsloaded = true;
                        loadColors();
                    }
                }, true);

                $(element).load(function() {
                    loadColors();
                });

                function loadColors() {
                    $(element).find('.darkcolor').css({
                        color: ColorService.colors.darkcolor
                    });
                    $(element).find('.ultradarkcolor').css({
                        color: ColorService.colors.darkcolor
                    });
                    $(element).find('.ultradarkbgcolor').css({
                        'background-color': ColorService.colors.darkcolor
                    });
                }
            }
        };
    }
]);