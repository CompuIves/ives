app.controller("ContactController", function() {
    this.sendForm = function() {


        $('.form').toggleClass('confirm');

        $('.form').animate({
            height: 225
        }, 500);
    }
});