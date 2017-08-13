(function() {
    angular
        .module("WebAppMaker")
        .controller("ILostMyDog", ILostMyDog)
        .controller("IFoundADog", IFoundADog)
        .controller("MyLostDogs", MyLostDogs)
        .controller("MyFoundDogs", MyFoundDogs)
        .controller("MyLostDogEdit", MyLostDogEdit)
        .controller("MyFoundDogEdit", MyFoundDogEdit)
        .controller("AllLostDog", AllLostDog)
        .controller("AllFoundDog", AllFoundDog);


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
    function IFoundADog(currentUser, DogService, $location) {
        var model = this;

        model.uid = currentUser._id;
        model.createFoundDog = createFoundDog;

        function createFoundDog(dog) {
            if (dog.phone === undefined || dog.phone === null || dog.phone === "") {
                model.error = "Finder's Contact Information can just be 10 digits phone number.";
                return;
            }
            return DogService
                .createFoundDog(model.uid, dog)
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
                .then(renderLostDogs)

        }

        init();
        function renderLostDogs(mylostDogs) {
            model.mylostDogs = mylostDogs;
        }
    }

    function MyFoundDogs(currentUser, DogService) {
        var model = this;
        model.uid = currentUser._id;
        function init() {
            // model.websites = WebsiteService.findWebsitesByUser(model.uid);
            DogService
                .findFoundDogByUser(model.uid)
                .then(renderFoundDogs)

        }

        init();
        function renderFoundDogs(myFoundDogs) {
            model.myFoundDogs = myFoundDogs;
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

    function MyFoundDogEdit(currentUser, $routeParams, DogService, $location) {
        var model = this;

        // model.uid = $routeParams['uid'];
        model.uid = currentUser._id;
        model.did = $routeParams['did'];

        model.updateFoundDog= updateFoundDog;
        model.deleteFoundDog = deleteFoundDog;


        function init(){
            //model.websites = WebsiteService.findWebsitesByUser(model.uid);
            //model.website = WebsiteService.findWebsiteById(model.wid);
            DogService
                .findFoundDogByUser(model.uid)
                .then(renderFoundDogs)
            DogService
                .findFoundDogById(model.did)
                .then(getFoundDog)
        }
        init();
        function renderFoundDogs(foundDogs) {
            model.foundDogs = foundDogs;
        }
        function getFoundDog(foundDog) {
            model.foundDog = foundDog;
        }

        function updateFoundDog(foundDog) {

            DogService
                .updateFoundDog(model.did, foundDog)
                .then(function () {
                    model.message = "foundDog information update was successful";
                })
                .then(function () {
                    $location.url("/main")
                });
        }

        function deleteFoundDog () {
            DogService
                .deleteFoundDogs(model.did)
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
    function AllFoundDog(currentUser, $routeParams, DogService, $location) {
        var model = this;

        model.uid = currentUser._id;
        // model.deleteUser = deleteUser;
        function init() {
            findAllFoundDogs()
        }
        init();


        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(findAllUsers());
        }

        function findAllFoundDogs() {
            DogService
                .findAllFoundDogs()
                .then(function (foundDogs) {
                    model.foundDogs = foundDogs
                })
        }
    }


})();