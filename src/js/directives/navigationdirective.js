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


                items.forEach(function(item) {
                    var li = $("<li></li>");
                    var icon = $("<i class='ultradarkcolor fa fa-" + item.icon + "'></i>");
                    $(element).append(li);
                    var detailedInfo = $("<span class='detail darkbgcolor'>" + item.name + "</span>");
                    $(element).append(detailedInfo);
                    li.append(icon);
                    li.append(detailedInfo);

                    item.navitem = li;
                    item.detail = detailedInfo;

                    $(li).hover(function() {
                        setActive(li);
                        detailedInfo.addClass('show');
                    }, function() {
                        if (activeItem.navitem[0] != li[0]) {
                            setinActive(li);
                        }
                        detailedInfo.removeClass('show');
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
                        if (windowTop < items[i].element.offset().top) {
                            if (!activeItem || activeItem.navitem[0] != items[i - 1].navitem[0] || updateColor) {
                                if (activeItem) {
                                    setinActive(activeItem.navitem);
                                    activeItem.navitem.removeClass('active');
                                }

                                activeItem = items[i - 1];
                                items[i - 1].navitem.addClass('active');
                                setActive(items[i - 1].navitem);
                            }
                            break;
                        }

                        if (i == items.length - 1) {
                            if (activeItem) {
                                setinActive(activeItem.navitem);
                                activeItem.navitem.removeClass('active');
                            }

                            activeItem = items[i];
                            items[i].navitem.addClass('active');
                            setActive(items[i].navitem);
                        }
                    }
                }

                var setActive = function(navitem) {
                    navitem.css({
                        'background-color': ColorService.rgbToString(ColorService.colors.darkcolor),
                    });

                    navitem.find('i').css({
                        'color': 'white'
                    });
                };


                var setinActive = function(navitem) {
                    console.log("TROLOLO");
                    navitem.css({
                        'background-color': "",
                    });

                    navitem.find('i').css({
                        'color': ColorService.rgbToString(ColorService.colors.ultradarkcolor)
                    });
                }

                var goItem = function(navitem) {
                    $("html, body").stop().animate({
                        scrollTop: navitem.element.offset().top + 1
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