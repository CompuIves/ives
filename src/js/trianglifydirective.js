app.directive("ngTrianglify", function() {
    return {
        restrict: 'AE',
        scope: {
            options: "=",
            interval: "@",
            child: "@"
        },
        link: function(scope, element, attr, ctrl) {
            if (!scope.child) {
                setBackground(true);

                if (scope.interval)
                    setInterval(() => {
                        scope.options = null;
                        setBackground()
                    }, scope.interval);
            } else {
                setTimeout(setBackground, 0);
                setInterval(() => {
                    setBackground()
                }, scope.interval);
            }


            $(window).resize(setBackground);


            function setBackground(first) {
                var width = element[0].offsetWidth;
                var height = element[0].offsetHeight;
                var t = scope.options ? new Trianglify(scope.options) : new Trianglify();

                var pattern = t.generate(width, height);

                if (!scope.child) {
                    if (first) scope.options = t.options; //Check if it is the first time this is called, then no apply is needed.
                    else scope.$apply(function() {
                        scope.options = t.options;
                    });
                }
                element[0].setAttribute('style', 'background-image: ' + pattern.dataUrl);
            }
        }
    };
});