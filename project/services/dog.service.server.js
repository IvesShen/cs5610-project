var lostDogModel = require('../model/dog/lostDog.model.server');

module.exports = function(app){

    app.post("/api/project/user/:uid/lostDog", createLostDog);
    app.get("/api/project/user/:uid/lostDog", findLostDogByUser);
    app.get("/api/project/dog/:did", findLostDogById);
    app.get("/api/project/dog", findAllLostDogs);
    app.put("/api/project/dog/:did", updateLostDog);
    app.delete("/api/project/dog/:did", deleteLostDogs);


    function findAllLostDogs(req, res) {
        lostDogModel
            .findAllLostDogs()
            .then(function (lostDogs) {
                res.json(lostDogs);
            })
    }


    function updateLostDog(req, res) {
        var did = req.params.did;
        var lostDog = req.body;

        lostDogModel
            .updateLostDog(did, lostDog)
            .then(function (lostDog) {
                res.json(lostDog)
            })
    }

    function findLostDogByUser(req, res) {
        lostDogModel
            .findLostDogByUser(req.params.uid)
            .then(function (dogs) {
                res.json(dogs);
            })
    }

    function findLostDogById(req, res) {
        lostDogModel
            .findLostDogById(req.params.did)
            .then(function (status) {
                res.json(status);
            })
    }

    function deleteLostDogs(req, res) {
        var did = req.params.did;

        lostDogModel
            .deleteLostDogs(did)
            .then(function (status) {
                res.json(status);
            })
    }

    function createLostDog(req, res) {
        var dog = req.body;
        var userId = req.params.uid;

        lostDogModel
            .createLostDog(userId, dog)
            .then(function (dog) {
                res.json(dog);
            })
    }
}













