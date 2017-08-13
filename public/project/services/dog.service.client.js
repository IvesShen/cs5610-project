(function () {
    angular
        .module("WebAppMaker")
        .service('DogService', DogService);

    function DogService($http) {
        this.createLostDog = createLostDog;
        this.findAllLostDogs = findAllLostDogs;
        this.findLostDogByUser = findLostDogByUser;
        this.findLostDogById = findLostDogById;
        this.updateLostDog = updateLostDog;
        this.deleteLostDogs = deleteLostDogs;

        this.createFoundDog = createFoundDog;
        this.findAllFoundDogs = findAllFoundDogs;
        this.findFoundDogByUser = findFoundDogByUser;
        this.findFoundDogById = findFoundDogById;
        this.updateFoundDog = updateFoundDog;
        this.deleteFoundDogs = deleteFoundDogs;

        function createLostDog(uid,dog) {
            var url = "/api/project/user/" + uid+ "/lostDog";
            return $http.post(url, dog)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
        }

        function createFoundDog(uid,dog) {
            var url = "/api/project/user/" + uid+ "/foundDog";
            return $http.post(url, dog)
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
        function findAllFoundDogs() {
            var url = "/api/project/foundDog";
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

        function findFoundDogByUser(uid) {
            var url = "/api/project/user/" + uid + "/foundDog";
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

        function findFoundDogById(did) {
            var url = "/api/project/foundDog/" +did;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateLostDog(did, dog) {

            var url = "/api/project/dog/" +did;
            return $http.put(url, dog)
                .then(function (response) {//unwrap the data in servers
                    return response.data;
                });
        }
        function updateFoundDog(did, dog) {

            var url = "/api/project/foundDog/" +did;
            return $http.put(url, dog)
                .then(function (response) {//unwrap the data in servers
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
        function deleteFoundDogs(did) {
            var url = "/api/project/foundDog/" +did;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();