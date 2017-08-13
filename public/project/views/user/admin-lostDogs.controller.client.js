(function () {
    angular
        .module('WebAppMaker')
        .controller('adminLostDogsController',adminLostDogsController);

    function adminLostDogsController(DogService) {
        var model = this;
        model.deleteLostDogs = deleteLostDogs;
        function init() {
            findAllLostDogs()
        }
        init();
        
        
        function deleteLostDogs(lostDog) {
            DogService
                .deleteLostDog(lostDog._id)
                .then(findAllLostDogs());
        }

        function findAllLostDogs() {
            DogService
                .findAllLostDogs()
                .then(function (lostDogs) {
                    model.lostDogs = lostDogs
                })
        }
    }
})();
