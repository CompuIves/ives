app.directive("ngProgress", function() {
    return {
        restrict: 'AE',
        scope: {
            progress: "=",
            text: "@"
        },
        link: function(scope, element, attr, ctrl) {
            var width = element[0].offsetWidth;
            var fullprogress = $("<div id='full'></div>");
            var emptyprogress = $("<div id='empty'></div>");
            var text = $("<span id='text'>" + text + "</span>");
            $(element).append(fullprogress).append(emptyprogress).append(text);


            $(window).resize(setProgress);
            scope.$watch('text', function() {
                text.text(scope.text);
            }, true);
            setProgress();

            function setProgress() {
                fullprogress.css({
                    'z-index': 2,
                    display: 'block',
                    position: 'absolute',
                    left: 0,
                    height: '100%',
                    width: width * scope.progress,
                    borderRadius: 'inherit',
                    backgroundColor: 'inherit'
                });

                emptyprogress.css({
                    'z-index': 1,
                    display: 'block',
                    position: 'absolute',
                    left: 0,
                    height: '100%',
                    width: '100%',
                    borderRadius: 'inherit',
                    backgroundColor: '#ddd'
                });

                text.css({
                    position: 'absolute',
                    left: "10px",
                    color: 'inherit',
                    textAlign: 'center',
                    top: 0,
                    bottom: 0
                });
            }
        }
    };
});