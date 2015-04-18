app.directive("ngProgress", function() {
    return {
        restrict: 'AE',
        scope: {
            progress: "="
        },
        link: function(scope, element, attr, ctrl) {
            var fullprogress = $("<div id='full'></div>");
            var text = $("<span id='text'>" + (scope.progress * 100) + "%" + "</span>");
            $(element).append(fullprogress).append(text);


            $(window).resize(setProgress);
            scope.$watch('text', function(value) {
                if (value)
                    text.text(scope.text);
            }, true);
            setProgress();

            function setProgress() {
                var width = element[0].offsetWidth;
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
                if (text)
                    text.css({
                        position: 'absolute',
                        display: 'block',
                        left: 0,
                        right: 0,
                        color: 'white',
                        textAlign: 'center',
                        width: width * scope.progress,
                        top: 0,
                        bottom: 0
                    });
            }
        }
    };
});