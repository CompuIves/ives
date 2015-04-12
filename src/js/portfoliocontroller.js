app.controller("PortfolioController", ['$scope',
    function($scope) {
        this.items = [{
            name: "SolarBoard",
            img: "res/images/solarboard.png",
            shortdescription: "An app for showing and analyzing solar power winnings.",
            description: "Techniko is an installation company specialized in green power. They currently own more than 200 solar panels, but didn't have a way to see how much power they're generating. They wanted a simple way to see how much their solar panels were generating with the ability to compare the data.<br> I chose to make a website using the MEAN (MongoDB, Express, AngularJS, Node) stack. The website utilizes custom directives, filters and services. The backend has a RESTful API to communicate with the website. The data is gathered by kWh-meters and sent with an Arduino to the server which stores it in the database.",
            features: ["Solar Yield Summary",
                "Datepicker for year, month and day summary",
                "Individual Solar Page",
                "Alert system"
            ],
            progress: "In Progress...",
            calendar: "Oct 2014 - Now",
            tasks: "Full stack"
        }, {
            name: "Relative",
            img: "res/images/solarboard.png",
            description: "This is my last project",
            progress: "In Progress..."
        }, {
            name: "Codepen",
            img: "res/images/solarboard.png",
            description: "This is my last project",
            progress: "In Progress..."
        }];
        var vm = this;

        this.transformfunction = function(item) {
            $scope.$apply(function() {
                vm.item = item;
            });

            $('.frontportfolio').addClass('invisible');
            $('.portfoliorow').addClass('extended');
            $(".backportfolio").addClass('visible');
        };
    }
]);