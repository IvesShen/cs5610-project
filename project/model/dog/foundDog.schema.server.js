var mongoose = require('mongoose');

var foundDogSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
    name: String,
    breeds: String,
    phone: Number,
    description: String,
    lat: String,
    lng: String,
    finder: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: 'foundDog'});

module.exports = foundDogSchema;