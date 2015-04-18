app.directive("ngHello", function() {
    return {
        restrict: 'AE',
        scope: {},
        link: function(scope, element, attr, ctrl) {
            var container = $("<div class='textcard'></div>");
            $(element).append(container);
            var title = $("<span class='title darkcolor'>Hi, I'm Ives!</span>");
            $(container).append(title);
        }
    };
});