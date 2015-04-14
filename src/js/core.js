var app = angular.module("ives", ['uiGmapgoogle-maps', 'ngSanitize', 'embedCodepen']);

app.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyBgiSOyjgUXl8TTECe7j8HpIETBBVXb3zY',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});