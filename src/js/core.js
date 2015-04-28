var app = angular.module("ives", ['ngAnimate', 'uiGmapgoogle-maps', 'ngSanitize', 'embedCodepen']);

app.config(['uiGmapGoogleMapApiProvider',
    function(uiGmapGoogleMapApiProvider) {
        uiGmapGoogleMapApiProvider.configure({
            key: 'AIzaSyBgiSOyjgUXl8TTECe7j8HpIETBBVXb3zY',
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    }
]);

app.config(['$sceDelegateProvider',
    function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'https://www.youtube.com/**'
        ]);
    }
]);