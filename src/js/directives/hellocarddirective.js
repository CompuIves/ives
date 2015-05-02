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
            }
        };
    }
]);