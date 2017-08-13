var lostDogModel = require('../model/dog/lostDog.model.server');
var foundDogModel = require('../model/dog/foundDog.model.server');

module.exports = function(app){

    app.post("/api/project/user/:uid/lostDog", createLostDog);
    app.get("/api/project/user/:uid/lostDog", findLostDogByUser);
    app.get("/api/project/dog/:did", findLostDogById);
    app.get("/api/project/dog", findAllLostDogs);
    app.put("/api/project/dog/:did", updateLostDog);
    app.delete("/api/project/dog/:did", deleteLostDogs);


    app.post("/api/project/user/:uid/foundDog", createFoundDog);
    app.get("/api/project/user/:uid/foundDog", findFoundDogByUser);
    app.get("/api/project/foundDog/:did", findFoundDogById);
    app.get("/api/project/foundDog", findAllFoundDogs);
    app.put("/api/project/foundDog/:did", updateFoundDog);
    app.delete("/api/project/foundDog/:did", deleteFoundDogs);


    function createLostDog(req, res) {
        var dog = req.body;
        var userId = req.params.uid;

        lostDogModel
            .createLostDog(userId, dog)
            .then(function (dog) {
                res.json(dog);
            })
    }
    function createFoundDog(req, res) {
        var dog = req.body;
        var userId = req.params.uid;

        foundDogModel
            .createFoundDog(userId, dog)
            .then(function (dog) {
                res.json(dog);
            })
    }

    function findLostDogByUser(req, res) {
        lostDogModel
            .findLostDogByUser(req.params.uid)
            .then(function (dogs) {
                res.json(dogs);
            })
    }

    function findFoundDogByUser(req, res) {
        foundDogModel
            .findFoundDogByUser(req.params.uid)
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

    function findFoundDogById(req, res) {
        foundDogModel
            .findFoundDogById(req.params.did)
            .then(function (status) {
                res.json(status);
            })
    }

    function findAllLostDogs(req, res) {
        lostDogModel
            .findAllLostDogs()
            .then(function (lostDogs) {
                res.json(lostDogs);
            })
    }

    function findAllFoundDogs(req, res) {
        foundDogModel
            .findAllFoundDogs()
            .then(function (foundDogs) {
                res.json(foundDogs);
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
    function updateFoundDog(req, res) {
        var did = req.params.did;
        var foundDog = req.body;

        foundDogModel
            .updateFoundDog(did, foundDog)
            .then(function (foundDog) {
                res.json(foundDog)
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
    function deleteFoundDogs(req, res) {
        var did = req.params.did;

        foundDogModel
            .deleteFoundDogs(did)
            .then(function (status) {
                res.json(status);
            })
    }

}













