var mongoose = require('mongoose');

var lostDogSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
    name: String,
    breeds: String,
    phone: Number,
    description: String,
    lat: String,
    lng: String,
    owner: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'lostDog'});

module.exports = lostDogSchema;