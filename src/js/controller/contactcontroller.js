app.controller("ContactController", ['$scope', '$http',
    function($scope, $http) {
        var vm = this;
        this.data = {};

        this.sendForm = function() {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            if ($scope.contactForm.$valid) {
                console.log(vm.data);
                console.log("Lawl");
                $http({
                    method: 'POST',
                    url: 'res/php/mail.php',
                    data: $.param(vm.data), //param method from jQuery
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    } //set the headers so angular passing info as form data (not request payload)
                }).success(function(data) {
                    console.log(data);
                    if (data.success) { //success comes from the return json object
                        $('.form').toggleClass('confirm');

                        $('.form').animate({
                            height: 225
                        }, 500);
                    } else {
                        console.log(data);
                    }
                });

            }
        }
    }
]);