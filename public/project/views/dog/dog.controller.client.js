(function() {
    angular
        .module("WebAppMaker")
        .controller("ILostMyDog", ILostMyDog)
        .controller("MyLostDogs", MyLostDogs)
        .controller("MyLostDogEdit", MyLostDogEdit)
        .controller("AllLostDog", AllLostDog);


    function ILostMyDog(currentUser, DogService, $location) {
        var model = this;

        model.uid = currentUser._id;
        model.createLostDog = createLostDog;

        function createLostDog(dog) {
            if (dog.breeds === undefined || dog.breeds === null || dog.breeds === "") {
                model.error = "breeds cannot be empty.";
                return;
            }
            if (dog.phone === undefined || dog.phone === null || dog.phone === "") {
                model.error = "Owner's Contact Information can just be 10 digits phone number.";
                return;
            }
            return DogService
                .createLostDog(model.uid, dog)
                .then(function () {
                    $location.url("/main")
                })
        }
    }

    function MyLostDogs(currentUser, DogService) {
        var model = this;
        model.uid = currentUser._id;
        function init() {
            // model.websites = WebsiteService.findWebsitesByUser(model.uid);
            DogService
                .findLostDogByUser(model.uid)
                .then(renderWebsites)

        }

        init();
        function renderWebsites(mylostDogs) {
            model.mylostDogs = mylostDogs;
        }
    }

    function MyLostDogEdit(currentUser, $routeParams, DogService, $location) {
        var model = this;

        // model.uid = $routeParams['uid'];
        model.uid = currentUser._id;
        model.did = $routeParams['did'];

        model.deleteLostDogs= deleteLostDogs;
        model.updateLostDogs = updateLostDogs;


        function init(){
            //model.websites = WebsiteService.findWebsitesByUser(model.uid);
            //model.website = WebsiteService.findWebsiteById(model.wid);
            DogService
                .findLostDogByUser(model.uid)
                .then(renderLostDogs)
            DogService
                .findLostDogById(model.did)
                .then(getLostDog)
        }
        init();
        function renderLostDogs(lostDogs) {
            model.lostDogs = lostDogs;
        }
        function getLostDog(lostDog) {
            model.lostDog = lostDog;
        }

        function updateLostDogs(lostDog) {

            DogService
                .updateLostDog(model.did, lostDog)
                .then(function () {
                    model.message = "lostDog information update was successful";
                })
                .then(function () {
                    $location.url("/main")
                });
        }

        function deleteLostDogs () {
            DogService
                .deleteLostDogs(model.did)
                .then(function () {
                    $location.url("/main")
                });
            // WebsiteService.deleteWebsite(model.wid);
            // $location.url("/user/"+model.uid+"/website");

        }
    }

    function AllLostDog(currentUser, $routeParams, DogService, $location) {
        var model = this;

        model.uid = currentUser._id;
        // model.deleteUser = deleteUser;
        function init() {
            findAllLostDogs()
        }
        init();


        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(findAllUsers());
        }

        function findAllLostDogs() {
            DogService
                .findAllLostDogs()
                .then(function (lostDogs) {
                    model.lostDogs = lostDogs
                })
        }
    }

    function LoginController($location, UserService) {
        var model = this;
        model.login = login;

        function login(username, password) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                model.error = "Username and Passwords cannot be empty.";
                return;
            }
            // var user = UserService.findUserByCredentials(username, password);
            UserService
            // .findUserByCredentials(username, password)
                .login(username, password)
                .then(function (found) {
                    if (found !== null) {
                        $location.url("/profile");
                    } else {
                        model.error = "Username does not exist.";
                    }
                });
        }
    }

    function RegisterController(UserService, $location, $timeout) {
        var model = this;
        model.register = register;

        function register(username, password, vpassword) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                model.error = "Username and Passwords cannot be empty.";
                return;
            }
            if (password !== vpassword) {
                model.error = "Password and verify password must match.";
                return;
            }
            // var user = UserService.findUserByUsername(username);
            UserService
                .findUserByUsername(username)
                .then(
                    function(){
                        model.error = "Username already exists.";
                        $timeout(function () {
                            model.error = null;
                        }, 3000);
                    },
                    function () {
                        var user = {
                            username: username,
                            password: password,
                            firstName: "",
                            lastName: "",
                            email: "",
                            // _id: (new Date()).getTime() + ""
                        };
                        return UserService
                            .register(user)
                        // .then(
                        //     function (user) {
                        //         $location.url("/user/" + user._id);
                        //     }
                        // )
                        // user = UserService.findUserByUsername(username);
                        //$location.url("/user/" + user._id);
                    }
                )
                .then(// after adding a return before UserService, then catch the promise here to avoid nesting construction and keep synchronize.
                    function (user) {
                        $location.url("/profile");
                    }
                );
            // if (user === null) {
            //     user = {
            //         username: username,
            //         password: password,
            //         firstName: "",
            //         lastName: "",
            //         email: ""
            //     };
            //     UserService.createUser(user);
            //     user = UserService.findUserByUsername(username);
            //     $location.url("/user/" + user._id);
            // }
            // else {
            //     model.error = "Username already exists.";
            //     $timeout(function () {
            //         model.error = null;
            //     }, 3000);
            // }
        }
    }

    function ProfileController(currentUser, $routeParams, $location, $timeout, UserService) {
        var model = this;
        model.currentUser = currentUser;
        model.userId = currentUser._id;
        model.user = currentUser;
        // UserService
        //     .findUserById(model.userId)
        //     .then(renderUser, userError);

        function init() {
            //renderUser(currentUser);
        }
        init();

        // function renderUser(user){
        //     model.user = user;
        // }

        function userError() {
            model.error = "User not Found";
        }

        // fetch username from user to user.username in template
        // model.username = model.user.username;
        // model.firstName = model.user.firstName;
        // model.lastName = model.user.lastName;
        // model.email = model.user.email;
        model.updateUser = updateUser;
        model.unregister = unregister;
        model.logout = logout;
        // function updateUser() {
        //     var update_user = {
        //         _id: $routeParams.uid,
        //         firstName: model.firstName,
        //         lastName: model.lastName,
        //         email: model.email
        //     };
        //     UserService.updateUser($routeParams.uid, update_user);
        //     model.updated = "Profile changes saved!";
        //
        //     $timeout(function () {
        //         model.updated = null;
        //     }, 3000);
        // }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function () {
                    model.message = "User update was successful";
                })
        }

        function unregister() {
            UserService
                .unregister()
                .then(function () {
                    $location.url('/')
                }),
                function () {
                    model.error = "Unable to unregister you"
                }
        }

    }
})();