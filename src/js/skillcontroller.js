app.controller("SkillController", [
    function() {
        this.title = "Coding Skills";
        this.setContent = function(skill) {
            this.title = skill;
        };
    }
]);