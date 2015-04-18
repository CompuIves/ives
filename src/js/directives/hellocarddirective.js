app.directive("ngHello", function() {
    return {
        restrict: 'AE',
        scope: {},
        link: function(scope, element, attr, ctrl) {
            var front = $("<div class='fronttextcard'></div>");
            $(element).append(front);
            var title = $("<span class='title darkcolor'>Hi, I'm Ives!</span>");
            $(front).append(title);

            var settingsicon = $("<i class='darkcolor fa fa-cog'></i>");
            $(front).append(settingsicon);

            var back = $("<div class='backtextcard'></div>");
            $(element).append(back);
            var backtitle = $("<div class='toptext darkcolor'>This website has a dynamic color palette</div>");
            $(back).append(backtitle);

            var inputcontainer = $("<div class='inputcontainer'></div>");
            $(back).append(inputcontainer);

            var inputText = $("<span class='ultradarkcolor'>Every </span>");
            $(inputcontainer).append(inputText);
            var inputBox = $("<input value='60'></input>");
            $(inputcontainer).append(inputBox);
            var inputText2 = $("<span class='ultradarkcolor'> seconds <br> this site will switch from color pallete!</span>");
            $(inputcontainer).append(inputText2);

            var button = $("<a class='ultradarkbgcolor hoverdarker button'>Change Color Palette</a>");
            $(back).append(button);
            var exiticon = $("<i class='darkcolor fa fa-times'></i>");
            $(back).append(exiticon);

            $('.fa').click(function() {
                front.toggleClass('active');
                back.toggleClass('active');
                $(element).toggleClass('backactive');
            });
        }
    };
});