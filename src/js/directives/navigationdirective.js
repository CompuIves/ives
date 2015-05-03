app.directive("ngNavigation", ['ColorService',
    function(ColorService) {
        return {
            restrict: 'AE',
            link: function(scope, element, attr, ctrl) {
                var activeItem = undefined;
                var items = [{
                    name: "Home",
                    element: $('.header'),
                    icon: "home"
                }, {
                    name: "Skills",
                    element: $('#skillrow'),
                    icon: "lightbulb-o"
                }, {
                    name: "Experience",
                    element: $('#experiencerow'),
                    icon: "tasks"
                }, {
                    name: "Projects",
                    element: $('#projectrow'),
                    icon: "desktop"
                }, {
                    name: "Contact",
                    element: $('#contactrow'),
                    icon: "envelope-o"
                }];

                $(element).append("<span class='ultradarkcolor name'>Ives van Hoorne</span>");
                var bginfo = $("<div class='bginfo'></div>");
                $(element).append(bginfo);
                bginfo.append("<span class='darkbgcolor bgrect'>Change</span>");
                bginfo.append("<span class='ultradarkbgcolor bgrect'>Colors</span>");

                bginfo.click(function() {
                    scope.resetBG();
                });
                items.forEach(function(item) {
                    var li = $("<li></li>");
                    var icon = $("<i class='ultradarkcolor fa fa-" + item.icon + "'></i>");
                    $(element).append(li);
                    var detailedInfo = $("<span class='detail'>" + item.name + "</span>");
                    $(li).append(detailedInfo);
                    li.append(icon);
                    li.append(detailedInfo);

                    item.navitem = li;

                    $(li).bind('mouseenter touchstart', function() {
                        setActive(item);
                    });
                    $(li).bind('mouseleave touchend', function() {
                        if (activeItem.navitem[0] != li[0]) {
                            setinActive(item);
                        }
                    });

                    $(li).click(function() {
                        goItem(item);
                    });
                });

                var findActiveRecursive = function(updateColor) {
                    var windowTopHTML = $("html").scrollTop();
                    var windowTopBody = $("body").scrollTop();
                    var windowTop = Math.max(windowTopHTML, windowTopBody);
                    for (var i = 0; i < items.length; i++) {
                        if (windowTop < items[i].element.offset().top - $(window).height() / 4) {
                            if (!activeItem || activeItem.navitem[0] != items[i - 1].navitem[0] || updateColor) {
                                if (activeItem) {
                                    setinActive(activeItem);
                                    activeItem.navitem.removeClass('active');
                                }

                                activeItem = items[i - 1];
                                items[i - 1].navitem.addClass('active');
                                ga('send', 'event', items[i - 1].name, 'scroll')
                                setActive(items[i - 1]);
                            }
                            break;
                        }

                        if (i == items.length - 1) {
                            if (activeItem) {
                                setinActive(activeItem);
                                activeItem.navitem.removeClass('active');
                            }

                            activeItem = items[i];
                            items[i].navitem.addClass('active');
                            setActive(items[i]);
                        }
                    }
                }

                var setActive = function(item) {
                    item.navitem.css({
                        'background-color': ColorService.rgbToString(ColorService.colors.darkcolor),
                    });

                    item.navitem.find('i').css({
                        'color': 'white'
                    });
                };


                var setinActive = function(item) {
                    item.navitem.css({
                        'background-color': "",
                    });

                    item.navitem.find('i').css({
                        'color': ColorService.rgbToString(ColorService.colors.ultradarkcolor)
                    });
                }

                var goItem = function(navitem) {
                    $("html, body").stop().animate({
                        scrollTop: navitem.element.offset().top - 59
                    }, 800);
                }

                var colorsloaded = false;
                scope.$watch(function() {
                    return ColorService.colors;
                }, function(newValue) {
                    if (newValue && !$.isEmptyObject(newValue)) {
                        colorsloaded = true;
                        findActiveRecursive(true);
                    }
                }, true);

                $(window).scroll(function() {
                    if (colorsloaded)
                        findActiveRecursive();
                });

            }
        };
    }
]);