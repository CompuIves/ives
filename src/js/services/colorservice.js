app.factory('ColorService', function() {
    var colors = {};

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function stringToRGB(string) {
        var rgbinfo = string.split('rgb')[1];
        rgbinfo = rgbinfo.replace('(', '').replace(')', '').replace(' ', '');
        var finalinfo = rgbinfo.split(',');

        var rgb = {
            r: parseInt(finalinfo[0]),
            g: parseInt(finalinfo[1]),
            b: parseInt(finalinfo[2])
        };
        return rgb;
    }

    function rgbToString(rgb, a) {
        var newRgb = "rgb";
        if (rgb.a || a)
            newRgb += "a";
            

        newRgb += "(" + rgb.r + "," + rgb.g + "," + rgb.b;
        if (rgb.a || a)
            newRgb += ", " + (rgb.a ? rgb.a : a);
        newRgb += ")";
        return newRgb;
    }

    function darken(rgb, amount, percentage) {
        var newRgb;
        if (!percentage) {
            newRgb = {
                r: Math.max(rgb.r - amount, 0),
                g: Math.max(rgb.g - amount, 0),
                b: Math.max(rgb.b - amount, 0)
            };
        } else {
            newRgb = {
                r: Math.max(Math.floor(rgb.r - (rgb.r * amount)), 0),
                g: Math.max(Math.floor(rgb.g - (rgb.g * amount)), 0),
                b: Math.max(Math.floor(rgb.b - (rgb.b * amount)), 0)
            };
        }
        return newRgb;
    }

    function lighten(rgb, amount, percentage) {
        var newRgb;
        if (!percentage) {
            newRgb = {
                r: Math.min(rgb.r + amount, 255),
                g: Math.min(rgb.g + amount, 255),
                b: Math.min(rgb.b + amount, 255)
            };
        } else {
            newRgb = {
                r: Math.min(Math.floor(rgb.r + (rgb.r * amount)), 255),
                g: Math.min(Math.floor(rgb.g + (rgb.g * amount)), 255),
                b: Math.min(Math.floor(rgb.b + (rgb.b * amount)), 255)
            };
        }
        return newRgb;
    }

    function averageColors(rgbx, rgby) {
        var newRgb = {};
        newRgb.r = Math.max(0, loopNumber(Math.floor((rgbx.r + rgby.r) / 2), 0, 255));
        newRgb.g = Math.max(0, loopNumber(Math.floor((rgbx.g + rgby.g) / 2), 0, 255));
        newRgb.b = Math.max(0, loopNumber(Math.floor((rgbx.b + rgby.b) / 2), 0, 255));
        return newRgb;
    }


    function loopNumber(number, min, max) {
        while (number < min || number > max) {
            if (number < min) {
                number += max;
            } else {
                number -= max;
            }
        }
        return number;
    }

    return {
        colors: colors,
        stringToRGB: stringToRGB,
        rgbToString: rgbToString,
        darken: darken,
        lighten: lighten,
        averageColors: averageColors,
        hexToRgb: hexToRgb
    };
});