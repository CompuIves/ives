app.directive("ngPortfolio", ["ColorService",
    function(ColorService) {
        return {
            restrict: 'AE',
            scope: {
                item: "@",
                transformfunction: "&"
            },
            link: function(scope, element, attr, ctrl) {
                var container, image, cover, title, description, fronttitle;
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

                    if (item.front.image) {
                        image = $("<img src='" + item.front.image + "'></img>");
                        if (item.front.backgroundimage) {
                            image.css({
                                width: '100%'
                            });
                        }
                        if (item.small) {
                            image.css({
                                width: '60%'
                            })
                        }
                        container.append(image);
                    }

                    if (item.front.title) {
                        fronttitle = $("<div class='fronttitle'>" + item.front.title + "</div>");
                        container.append(fronttitle);
                    }

                    cover = $("<div class='cover'></div>");
                    container.append(cover);
                    title = $("<div class='itemtitle'>" + item.name + "</div>");
                    title.css({
                        color: ColorService.rgbToString(ColorService.lighten(ColorService.stringToRGB(item.color), 80))
                    });
                    container.append(title);

                    if (!item.small) {
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
                    }

                    description = $("<p class='description " + (item.small ? "small" : "") + "'>" + item.shortdescription + "</p>");
                    container.append(description);


                    if (item.small) {
                        title.addClass('small');
                        description.addClass('small');
                    }

                    setHoverActions();
                    setClickActions();
                }

                function setHoverActions() {
                    element.hover(function() {
                        container.children().addClass('hover');
                    }, function() {
                        container.children().removeClass('hover');
                    });
                }

                function setClickActions() {
                    element.mousedown(function(event) {
                        container.children().removeClass('hover');
                    });
                    element.click(function(e) {
                        var item = JSON.parse(scope.item);
                        ga('send', 'event', "PortfolioItem", 'click', item.name);
                        if (!e.offsetX) {
                            e.offsetX = (e.pageX - $(e.target).offset().left);
                            e.offsetY = (e.pageY - $(e.target).offset().top);
                        }
                        scope.transformfunction({
                            item: item,
                            pos: {
                                x: e.offsetX + $(element).position().left,
                                y: e.offsetY + $(element).position().top
                            }
                        });
                    });
                }
            }
        };
    }
]);