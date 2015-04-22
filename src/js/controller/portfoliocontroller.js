app.controller("PortfolioController", ['$scope', '$http', 'ColorService',
    function($scope, $http, ColorService) {
        this.items = [];

        var vm = this;
        $http.get('res/portfolioitems.json')
            .then((res) => {
                this.items = res.data;
            });
        this.drop = undefined;
        this.transformfunction = function(item, pos) {
            setTimeout(function() {
                $('.backportfolio').css('z-index', 5);
                $('.frontportfolio').addClass('invisible');
                $('.portfoliorow').stop().animate({
                    'height': $('.backcontainer').height() + 100
                }, 300);
                $(".backportfolio").addClass('visible');
                $('.backportfolio').css('visibility', 'visible');


                var color = ColorService.stringToRGB(item.color);
                $(".portfoliolightcolor").css('color', ColorService.rgbToString(ColorService.lighten(color, 80)));

                if ($(window).scrollTop() > $('.portfoliorow').offset().top) {
                    $("html, body").stop().animate({
                        scrollTop: $('.portfoliorow').offset().top
                    }, 200);
                }
            }, 250);

            $scope.$apply(() => {
                vm.drop = {
                    color: item.bgcolor ? item.bgcolor : item.color,
                    pos: {
                        x: pos.x,
                        y: pos.y
                    }
                };
                if (!vm.item || item.name !== vm.item.name)
                    vm.item = item;
            });

        };

        this.reset = function() {
            vm.drop = undefined;
            $('.frontportfolio').removeClass('invisible');
            $('.portfoliorow').stop().animate({
                'height': $('.frontportfolio').height() + 100
            }, 800);
            $(".backportfolio").removeClass('visible');

            setTimeout(() => {
                $('.backportfolio').css('visibility', 'hidden');
            }, 300);
        };
    }
]);