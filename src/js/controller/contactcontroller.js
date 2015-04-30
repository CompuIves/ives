/* global status */
/// <reference path="../../../typings/jquery/jquery.d.ts"/>
app.controller("ContactController", ['$scope', '$http',
    function($scope, $http) {
        var vm = this;
        this.data = {};

        this.sendForm = function() {
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            if ($scope.contactForm.$valid) {
                $('.form').toggleClass('confirm');

                $('.form').stop().animate({
                    height: 225
                }, 500);
                $http({
                    method: 'POST',
                    url: '/mail',
                    data: $.param(vm.data), //param method from jQuery
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    } //set the headers so angular passing info as form data (not request payload)
                }).success(function(data, status) {
                    $('.loading').addClass('hide');
                    if (status == 200) {
                        $('.done').addClass('show');
                    } else {
                        $('.failed').addClass('show');
                    }
                }).error(function(data, status) {
                    $('.loading').addClass('hide');
                    $('.failed').addClass('show');
                });

            }
        };
    }
]);