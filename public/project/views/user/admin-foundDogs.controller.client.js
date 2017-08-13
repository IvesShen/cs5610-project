(function () {
    angular
        .module('WebAppMaker')
        .controller('adminFoundDogsController',adminFoundDogsController);

    function adminFoundDogsController(DogService) {
        var model = this;
        model.deleteFoundDogs = deleteFoundDogs;
        function init() {
            findAllFoundDogs()
        }
        init();


        function deleteFoundDogs(foundDog) {
            DogService
                .deleteFoundDogs(foundDog._id)
                .then(findAllFoundDogs());
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
