(function() {
    angular
        .module("WebAppMaker")
        .controller("MainController", MainController);

    function MainController(currentUser, UserService) {
        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser._id;
        model.user = currentUser;
    }
})();