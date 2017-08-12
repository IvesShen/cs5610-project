(function () {
    angular
        .module("WebAppMaker")
        .service('DogService', DogService);

    function DogService($http) {
        this.findLostDogByUser = findLostDogByUser;
        this.findLostDogById = findLostDogById;
        this.deleteLostDogs = deleteLostDogs;
        this.findAllLostDogs = findAllLostDogs;
        this.createLostDog = createLostDog;
        this.updateLostDog = updateLostDog;

        function updateLostDog(did, dog) {

            var url = "/api/project/dog/" +did;
            return $http.put(url, dog)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
            }

        function findAllLostDogs() {
            var url = "/api/project/dog";
            return $http.get(url)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
        }


        function findLostDogByUser(uid) {
            var url = "/api/project/user/" + uid + "/lostDog";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findLostDogById(did) {
            var url = "/api/project/dog/" +did;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteLostDogs(did) {
            var url = "/api/project/dog/" +did;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createLostDog(uid,dog) {
            var url = "/api/project/user/" + uid+ "/lostDog";
            return $http.post(url, dog)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
        }
    }
})();