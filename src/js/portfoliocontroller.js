app.controller("PortfolioController", ['$scope', 'ColorService',
    function($scope, ColorService) {
        this.items = [{
            name: "SolarBoard",
            images: {
                front: "res/images/solarboard/solarboardlogo.png",
                image1: "res/images/solarboard/solarboard.png",
                image2: "res/images/solarboard/solarboard.png",
                image3: "res/images/solarboard/solarboard.png"
            },
            shortdescription: "An app for showing and analyzing solar power winnings.",
            description: "Techniko is an installation company specialized in green power. They currently own more than 200 solar panels, but didn't have a way to see how much power they're generating. They wanted a simple way to see how much their solar panels were generating with the ability to compare the data.<br> I chose to make a website using the MEAN (MongoDB, Express, AngularJS, Node) stack. The website utilizes custom directives, filters and services. The backend has a RESTful API to communicate with the website. The data is gathered by kWh-meters and sent with an Arduino to a server which stores it in the database.",
            features: ["Solar Yield Summary",
                "Datepicker for year, month and day summary",
                "Individual Solar Page",
                "Alert system"
            ],
            progress: "In Progress...",
            calendar: "Dec 2014 - Now",
            tasks: "Full stack",
            color: "rgb(244, 121, 51)",
            bgcolor: "rgb(207, 103, 43)"
        }, {
            name: "Relative",
            images: {
                image1: "res/images/solarboard/solarboard.png",
                image2: "res/images/solarboard/solarboard.png",
                image3: "res/images/solarboard/solarboard.png"
            },
            shortdescription: "A game utilizing procedural generation as main content.",
            description: "Techniko is an installation company specialized in green power. They currently own more than 200 solar panels, but didn't have a way to see how much power they're generating. They wanted a simple way to see how much their solar panels were generating with the ability to compare the data.<br> I chose to make a website using the MEAN (MongoDB, Express, AngularJS, Node) stack. The website utilizes custom directives, filters and services. The backend has a RESTful API to communicate with the website. The data is gathered by kWh-meters and sent with an Arduino to a server which stores it in the database.",
            features: ["Solar Yield Summary",
                "Datepicker for year, month and day summary",
                "Individual Solar Page",
                "Alert system"
            ],
            progress: "In Progress...",
            calendar: "Oct 2014 - Now",
            tasks: "Full stack",
            color: "rgb(24, 159, 255)"
        }];
        var vm = this;
        this.drop = undefined;
        this.transformfunction = function(item, pos) {
            $scope.$apply(() => {
                vm.drop = {
                    color: item.bgcolor ? item.bgcolor : item.color,
                    pos: {
                        x: pos.x,
                        y: pos.y
                    }
                };
                vm.item = item;
            });
            setTimeout(function() {
                $('.backportfolio').css('z-index', 5);
                $('.frontportfolio').addClass('invisible');
                $('.portfoliorow').animate({
                    'height': $('.backcontainer').height() + 100
                }, 100);
                $(".backportfolio").addClass('visible');
                $('.backportfolio').css('visibility', 'visible');

                var color = ColorService.stringToRGB(item.color);

                $('.portfolioultralightcolor').css('color', ColorService.rgbToString(ColorService.lighten(color, 80, true)));
                $(".portfoliolightcolor").css('color', ColorService.rgbToString(ColorService.lighten(color, 80)));
            }, 200);
        };

        this.reset = function() {
            vm.drop = undefined;
            $('.frontportfolio').removeClass('invisible');
            $('.portfoliorow').animate({
                'height': $('.frontportfolio').height() + 100
            }, 100);
            $(".backportfolio").removeClass('visible');

            setTimeout(() => {
                vm.item = undefined;
                $('.backportfolio').css('visibility', 'hidden');
            }, 300);
        };
    }
]);