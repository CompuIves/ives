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

                $(element).find('.title').css({
                    color: ColorService.colors.darkcolor
                });

                var colorsloaded = false;
                scope.$watch(function() {
                    return ColorService.colors;
                }, function(newValue) {
                    if (newValue && !$.isEmptyObject(newValue) && !colorsloaded) {
                        console.log("LEUK");
                        colorsloaded = true;
                        $(element).find('.title').css({
                            color: ColorService.colors.darkcolor
                        });
                    }
                }, true);
            }
        };
    }
]);