app.controller("PortfolioController", ['$scope', '$http', 'ColorService',
    function($scope, $http, ColorService) {
        this.items = [];

        var vm = this;
        $http.get('res/portfolioitems.json')
            .then((res) => {
                this.items = res.data;

                for (var i = 0; i < this.items.length; i++) {
                    this.items[i].delay = 0.1 * i + 's';
                }
            });
        this.drop = undefined;
        this.transformfunction = function(item, pos) {
            setTimeout(function() {
                var color = ColorService.stringToRGB(item.color);
                $('.portfoliorow').stop().animate({
                    'height': $('.backcontainer').height() + 120
                }, 500);

                $(".portfoliolightcolor").css('color', ColorService.rgbToString(ColorService.lighten(color, 80)));
                if ($(window).scrollTop() > $('.portfoliorow').offset().top) {
                    $("html, body").stop().animate({
                        scrollTop: $('.portfoliorow').offset().top
                    }, 200);
                }
            }, 300);

            $scope.$apply(() => {
                vm.item = item;
                vm.drop = {
                    color: item.bgcolor ? item.bgcolor : item.color,
                    pos: {
                        x: pos.x,
                        y: pos.y
                    }
                };
            });
        };

        //For when images are loaded and height of portfoliorow has already changed to size 
        // if image wasn't loaded.
        $('.images img').load(function() {
            $('.portfoliorow').stop().animate({
                'height': $('.backcontainer').height() + 120
            }, 500);
        });

        this.reset = function() {
            vm.drop = undefined;
            vm.item = undefined;

            $('.frontportfolio').removeClass('invisible');

            $(".backportfolio").removeClass('visible');

            setTimeout(() => {
                $('.portfoliorow').stop().animate({
                    'height': $('.frontportfolio').height() + 120 //+ 2*padding
                }, 800);
            }, 300);
        };
    }
]);