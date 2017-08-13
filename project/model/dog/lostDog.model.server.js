var mongoose = require('mongoose');
var lostDogSchema = require('./lostDog.schema.server');
var lostDogModel = mongoose.model('lostDogModel', lostDogSchema);
var userModel = require('../user/user.model.server');


lostDogModel.createLostDog = createLostDog;
lostDogModel.findAllLostDogs = findAllLostDogs;
lostDogModel.findLostDogByUser = findLostDogByUser;
lostDogModel.findLostDogById = findLostDogById;
lostDogModel.updateLostDog = updateLostDog;
lostDogModel.deleteLostDogs = deleteLostDogs;

module.exports = lostDogModel;


function createLostDog(userId, dog) {
    dog._user = userId;
    return lostDogModel
        .create(dog)
        .then(function (dog) {
            return userModel
                .addLostDog(userId, dog._id);
        })
}

function findAllLostDogs() {
    return lostDogModel.find();
}

function findLostDogByUser(userId) {
    return lostDogModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function findLostDogById(dogId) {
    return lostDogModel
        .findOne({_id: dogId})
}

function updateLostDog(did, newLostDog) {
    return lostDogModel.update({_id: did}, {name: newLostDog.name, description:newLostDog.description, breeds: newLostDog.breeds, owner: newLostDog.owner, phone: newLostDog.phone})
}

function deleteLostDogs(did) {

    return lostDogModel
        .findOne({_id: did})
        .then(function (lostDog) {
            var userId = lostDog._user;
            console.log("userId: " + userId);
            userModel
                .deleteLostDog(userId, did)
                .then(function (result) {
                    return lostDogModel
                        .remove({_id: did});
                });
        });
}
