app.directive("ngPortfolio", function() {
    return {
        restrict: 'AE',
        scope: {
            item: "@",
            transformfunction: "&"
        },
        link: function(scope, element, attr, ctrl) {
            var container, image, cover, title, iconbox, icons, icontext, description;
            scope.$watch('item', function(newValue) {
                if (newValue) {
                    buildElement(JSON.parse(newValue));
                }
            }, true);

            $(window).resize(function() {
                if (scope.item)
                    buildElement(JSON.parse(scope.item));
            });

            function buildElement(item) {
                $(element).empty();

                container = $("<div class='portfoliocontainer'></div>");
                container.css('background-color', item.color);
                element.append(container);
                if (item.front) {
                    image = $("<img src='" + item.front.image + "'></img>");
                    if (item.front.backgroundimage) {
                        image.css({
                            width: '100%',
                            height: '100%'
                        });
                    }
                } else {
                    image = $("<span class='fronttitle'>" + item.name + "</span>");
                }
                container.append(image);
                cover = $("<div class='cover'></div>");
                container.append(cover);
                title = $("<div class='itemtitle'>" + item.name + "</div>");
                container.append(title);


                var calendarbox = $("<div class='iconbox col s4'></div>");
                var calendar = $("<i class='icon fa fa-calendar-o'></i>");
                var calendartext = $("<div class='text'>" + item.calendar + "</div>");
                calendarbox.append(calendar);
                calendarbox.append(calendartext);

                var progressbox = $("<div class='iconbox col s4'></div>");
                var progress = $("<i class='icon fa fa-clock-o'></i>");
                var progresstext = $("<div class='text'>" + item.progress + "</div>");
                progressbox.append(progress);
                progressbox.append(progresstext);

                var taskbox = $("<div class='iconbox col s4'></div>");
                var task = $("<i class='icon fa fa-tasks'></i>");
                var tasktext = $("<div class='text'>" + item.tasks + "</div>");
                taskbox.append(task);
                taskbox.append(tasktext);

                container.append(taskbox);
                container.append(calendarbox);
                container.append(progressbox);

                iconbox = $(element).find('.iconbox');
                icons = $(element).find('.icon');
                icontext = $(element).find('.text');

                description = $("<p class='description'>" + item.shortdescription + "</p>");
                container.append(description);


                //Size div to absolute child + responsiveness
                setTimeout(() => {
                    element.css('height', 200);
                }, 50);

                setHoverActions();
                setClickActions();
            }

            function setHoverActions() {
                element.hover(function() {
                    cover.addClass('shown');
                    title.addClass("shown");
                    description.addClass('shown');
                    iconbox.addClass('shown');
                    image.addClass('hover');
                    container.addClass('hover');
                }, function() {
                    cover.removeClass('shown');
                    title.removeClass("shown");
                    description.removeClass('shown');
                    iconbox.removeClass('shown');
                    image.removeClass('hover');
                    container.removeClass('hover');
                });
            }

            function setClickActions() {
                element.mousedown(function(event) {
                    cover.removeClass('shown');
                    title.removeClass("shown");
                    description.removeClass('shown');
                    iconbox.removeClass('shown');
                    image.removeClass('hover');
                });
                element.click(function(e) {
                    if (!e.offsetX) {
                        e.offsetX = (e.pageX - $(e.target).offset().left);
                        e.offsetY = (e.pageY - $(e.target).offset().top);
                    }
                    scope.transformfunction({
                        item: JSON.parse(scope.item),
                        pos: {
                            x: e.offsetX + $(element).position().left,
                            y: e.offsetY + $(element).position().top
                        }
                    });
                });
            }
        }
    };
});