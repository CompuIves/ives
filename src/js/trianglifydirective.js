app.directive("ngTrianglify", function() {
    return {
        restrict: 'AE',
        scope: {
            options: "=",
            interval: "@",
            fullscreen: "@"
        },
        link: function(scope, element, attr, ctrl) {
            setBackground(true);

            if (scope.interval)
                setInterval(() => {
                    scope.options = null;
                    setBackground()
                }, scope.interval);


            $(window).resize(setBackground);


            function setBackground(first) {
                console.log($(document).height());
                var width = scope.fullscreen ? $(document).width() : element[0].offsetWidth;
                var height = scope.fullscreen ? $(document).height() : element[0].offsetHeight;
                //var t = scope.options ? new Trianglify(scope.options) : new Trianglify();

                console.log(width);
                console.log(height);
                var pattern = Trianglify({
                    width: width,
                    height: height
                });
                console.log(Trianglify());
                console.log(pattern);
                document.body.appendChild(pattern.canvas());
                if (first) scope.options = t.options; //Check if it is the first time this is called, then no apply is needed.
                else scope.$apply(function() {
                    scope.options = t.options;
                });
                console.log(pattern.svg());
                //element[0].setAttribute('style', 'background-image: ' + pattern.dataUrl + ";");
                //pattern.canvas(document.getElementById('bg'));
            }
        }
    };
});