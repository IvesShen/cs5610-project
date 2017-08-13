(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
        /*            .when('/', {
         templateUrl : "/views/user/login.view.client.html",
         controller: "LoginController",
         controllerAs: "model"
         })*/
            .when('/home', {
                templateUrl : "views/home/home.html",
                // resolve: {
                //     currentUser: checkLoggedIn
                // }
            })
            .when('/main', {
                templateUrl : "views/main/main.html",
                controller: 'MainController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/admin', {
                templateUrl : "views/user/admin.view.client.html",
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/admin/users', {
                templateUrl : "views/user/admin-users.view.client.html",
                controller: 'adminUsersController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkAdmin
                }
            })
            .when('/register', {
                templateUrl : "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when('/login', {
                templateUrl : "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            // #!/user/{{model.uid}}
            .when('/profile', {
                templateUrl : "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/profile', {
                templateUrl : "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/iLostMyDog', {
                templateUrl : "views/dog/iLostMyDog.html",
                controller: "ILostMyDog",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/iFoundADog', {
                templateUrl : "views/dog/iFoundADog.html",
                controller: "IFoundADog",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/allLostDogs', {
                templateUrl : "views/dog/allLostDogs.html",
                controller: "AllLostDog",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/allFoundDogs', {
                templateUrl : "views/dog/allFoundDogs.html",
                controller: "AllFoundDog",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/myLostDogs', {
                templateUrl : "views/dog/myLostDogs.html",
                controller: "MyLostDogs",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/myFoundDogs', {
                templateUrl : "views/dog/myFoundDogs.html",
                controller: "MyFoundDogs",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/myLostDogEdit/:did', {
                templateUrl : "views/dog/myLostDogEdit.html",
                controller: "MyLostDogEdit",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .when('/myFoundDogEdit/:did', {
                templateUrl : "views/dog/myFoundDogEdit.html",
                controller: "MyFoundDogEdit",
                controllerAs: "model",
                resolve:{
                    currentUser:checkLoggedIn
                }
            })
            .otherwise({
                redirectTo : "/home"
            });
    }

    function checkLoggedIn($q, $location, UserService) {
        var deferred = $q.defer();
        UserService
            .checkLoggedIn()
            .then(function (currentUser) {
               if(currentUser === '0'){
                   deferred.reject();
                   $location.url('/login');
               } else {
                   deferred.resolve(currentUser);
               }
            });
        return deferred.promise;
    }

    function checkAdmin($q, $location, UserService) {
        var deferred = $q.defer();
        UserService
            .checkAdmin()
            .then(function (currentUser) {
                if(currentUser === '0'){
                    deferred.resolve({});
                    $location.url('/login');
                } else {
                    deferred.resolve(currentUser);
                }
            });
        return deferred.promise;
    }
})();