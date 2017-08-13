var mongoose = require('mongoose');
var foundDogSchema = require('./foundDog.schema.server');
var foundDogModel = mongoose.model('foundDogModel', foundDogSchema);
var userModel = require('../user/user.model.server');


foundDogModel.createFoundDog = createFoundDog;
foundDogModel.findAllFoundDogs = findAllFoundDogs;
foundDogModel.findFoundDogByUser = findFoundDogByUser;
foundDogModel.findFoundDogById = findFoundDogById;
foundDogModel.updateFoundDog = updateFoundDog;
foundDogModel.deleteFoundDogs = deleteFoundDogs;

module.exports = foundDogModel;


function createFoundDog(userId, dog) {
    dog._user = userId;
    return foundDogModel
        .create(dog)
        .then(function (dog) {
            return userModel
                .addFoundDog(userId, dog._id);
        })
}

function findAllFoundDogs() {
    return foundDogModel.find();
}

function findFoundDogByUser(userId) {
    return foundDogModel
        .find({_user: userId})
        .populate('_user')
        .exec();
}

function findFoundDogById(dogId) {
    return foundDogModel
        .findOne({_id: dogId})
}

function updateFoundDog(did, newfoundDog) {
    return foundDogModel.update({_id: did}, {name: newfoundDog.name, description:newfoundDog.description, breeds: newfoundDog.breeds, owner: newfoundDog.owner, phone: newfoundDog.phone})
}

function deleteFoundDogs(did) {

    return foundDogModel
        .findOne({_id: did})
        .then(function (foundDog) {
            var userId = foundDog._user;
            console.log("userId: " + userId);
            userModel
                .deleteFoundDog(userId, did)
                .then(function (result) {
                    return foundDogModel
                        .remove({_id: did});
                });
        });
}
