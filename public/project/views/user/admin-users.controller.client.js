(function () {
    angular
        .module('WebAppMaker')
        .controller('adminUsersController',adminUsersController);

    function adminUsersController(UserService, $timeout, currentUser) {
        var model = this;
        model.addAdmin = addAdmin;
        model.removeAdmin = removeAdmin;
        model.deleteUser = deleteUser;
        function init() {
            findAllUsers()
        }
        init();

        function addAdmin(user) {
            user.roles = ['USER', 'ADMIN'];
            UserService
                .updateUser(user._id, user)
                .then(function () {
                    $window.location.reload();
                }, function () {
                    model.error = "Fail when add this user as admin.";
                    $timeout(function () {
                        model.error = null;
                    }, 3000);
                });
        }

        function removeAdmin(user) {
            if (user._id === currentUser._id) {
                model.error = "You cannot change roles of yourself!";
                $timeout(function () {
                    model.error = null;
                }, 3000);
            } else {
                user.roles = ['USER'];
                UserService
                    .updateUser(user._id, user)
                    .then(function () {
                        $window.location.reload();
                    }, function () {
                        model.error = "Fail when remove this user as admin.";
                        $timeout(function () {
                            model.error = null;
                        }, 3000);
                    });
            }
        }

        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(findAllUsers());
        }

        function findAllUsers() {
            UserService
                .findAllUsers()
                .then(function (users) {
                    model.users = users
                })
        }
    }
})();
