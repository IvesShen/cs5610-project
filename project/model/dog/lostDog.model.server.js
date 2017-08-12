var mongoose = require('mongoose');
var lostDogSchema = require('./lostDog.schema.server');
var lostDogModel = mongoose.model('lostDogModel', lostDogSchema);
var userModel = require('../user/user.model.server');

//websiteModel.findAllWebsites = findAllWebsites;
lostDogModel.findAllLostDogs = findAllLostDogs;
lostDogModel.createLostDog = createLostDog;
//websiteModel.findWebsitesByUser = findWebsitesByUser;
lostDogModel.findLostDogByUser = findLostDogByUser;
// websiteModel.deleteWebsite = deleteWebsite;
lostDogModel.deleteLostDogs = deleteLostDogs;
// websiteModel.findWebsiteById = findWebsiteById;
lostDogModel.findLostDogById = findLostDogById;
// websiteModel.updateWebsite = updateWebsite;
lostDogModel.updateLostDog = updateLostDog;
// websiteModel.addPage = addPage;
// websiteModel.deletePage = deletePage;

module.exports = lostDogModel;

function deletePage(websiteId, pageId) {
    return websiteModel
        .findOne({_id: websiteId})
        .then(function (website) {
            website.pages.pull(pageId);
            return website.save();
        })
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        })
}


function updateLostDog(did, newLostDog) {
    return lostDogModel.update({_id: did}, {name: newLostDog.name, breeds: newLostDog.breeds, owner: newLostDog.owner, phone: newLostDog.phone})
}


function findWebsiteById(websiteId) {
    return websiteModel
        .findOne({_id: websiteId})
}


function findLostDogById(dogId) {
    return lostDogModel
        .findOne({_id: dogId})
}

function findAllWebsites() {
    return websiteModel.find();
}

function findAllLostDogs() {
    return lostDogModel.find();
}

function createLostDog(userId, dog) {
    dog._user = userId;
    return lostDogModel
        .create(dog)
        .then(function (dog) {
            return userModel
                .addLostDog(userId, dog._id);
        })
}

function findLostDogByUser(userId) {
    return lostDogModel
        .find({_user: userId})
        .populate('_user')
        .exec();
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