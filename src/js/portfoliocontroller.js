app.controller("PortfolioController", ['$scope', 'ColorService',
    function($scope, ColorService) {
        this.items = [{
            name: "ives.io",
            front: {
                image: 'res/images/ives.io/cover.png',
                backgroundimage: true
            },
            banner: {
                kind: 'iframe',
                url: 'http://localhost:3000'
            },
            shortdescription: "My portfolio website, you're browsing it now!",
            description: "My portfolio website is designed to highlight important information so potential employers can have a quick glance before reading further. It features a dynamic color palette and some small features like this portfolio.",
            features: [
                "Dynamic Color Palette",
                "Small design features"
            ],
            tools: ["HTML5", "Sass", "Javascript", "AngularJS", "Gulp"],
            progress: "Finished!",
            calendar: "April 2015",
            tasks: "Frontend",
            link: {
                title: "Source",
                url: "https://github.com/CompuIves/ives"
            },
            color: "rgb(65, 170, 92)"
        }, {
            name: "SolarBoard",
            front: {
                image: "res/images/solarboard/solarboardlogo.png"
            },
            banner: {
                kind: 'images',
                image1: "res/images/solarboard/solarboard.png",
                image2: "res/images/solarboard/solarboard.png",
                image3: "res/images/solarboard/solarboard.png"
            },
            shortdescription: "An app for showing and analyzing solar power winnings.",
            description: "Techniko is an installation company specialized in green power. They currently own more than 200 solar panels, but didn't have a way to see how much power they're generating. They wanted a simple way to see how much their solar panels were generating with the ability to compare the data.<br> I chose to make a website using the MEAN (MongoDB, Express, AngularJS, Node) stack. The website utilizes custom directives, filters and services. The backend has a RESTful API to communicate with the website. The data is gathered by kWh-meters and sent with an Arduino to a server which stores it in the database.",
            features: [
                "Solar Yield Summary",
                "Datepicker for year, month and day summary",
                "Individual Solar Page",
                "Alert system"
            ],
            tools: ["HTML5", "CSS3", "Javascript", "Java", "MEAN stack"],
            progress: "Working on it...",
            calendar: "Dec 2014 - Now",
            tasks: "Full stack",
            link: {
                title: "Demo",
                url: "#"
            },
            color: "rgb(244, 121, 51)",
            bgcolor: "rgb(207, 103, 43)"
        }, {
            name: "Relative",
            shortdescription: "A game utilizing procedural generation as main content.",
            description: "Relative has been my most complicated and biggest hobby project thus far. It is a 2d sidescrolling RPG game with as much as possible procedural generation and mod support. Multiplayer is implemented too with a special authority system designed by myself. Mod support works great together with multiplayer, since the server will send the mods it has installed to the client connecting. I really love doing procedural generation, the moment when you surprise yourself with generated content is incredible.",
            features: [
                "Procedurally generated universe",
                "Unique Distributed Authority System for multiplayer",
                "Mod Support both on server and client"
            ],
            tools: ["Java", "LibGDX", "Kryonet"],
            progress: "Playing with it...",
            calendar: "Oct 2014 - Now",
            tasks: "Java",
            link: {
                title: "Source",
                url: "https://github.com/CompuIves/relative"
            },
            color: "rgb(52, 152, 219)"
        }, {
            name: "Material Design 'drop' effect",
            shortdescription: "A Codepen showing the drop effect of Material Design.",
            description: "This effect is also used for this portfolio, when a button is clicked there is a circle expanding from the pointer, when the screen or parent is filled the background will be set to given color.",
            front: {
                image: "res/images/codepen/cover.png"
            },
            banner: {
                kind: 'codepen',
                codepen_id: 'RNmwKV'
            },
            tools: ["HTML5", "Sass", "JavaScript"],
            progress: "Finished!",
            calendar: "April 2015",
            tasks: "Frontend",
            link: {
                title: "Codepen",
                url: "http://codepen.io/CompuIves/pen/RNmwKV"
            },
            color: "rgb(44, 62, 80)"
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
                }, 300);
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
            }, 800);
            $(".backportfolio").removeClass('visible');

            setTimeout(() => {
                vm.item = undefined;
                $('.backportfolio').css('visibility', 'hidden');
            }, 300);
        };
    }
]);