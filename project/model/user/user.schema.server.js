var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username : {type : String, required : true, unique: true},
    password : {type : String, required : true},
    firstName : String,
    lastName : String,
    google: {
        id:    String,
        token: String
    },
    roles: [{type: String, default: "USER", enum: ['USER', 'ADMIN']}],

    lostDogs : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'lostDogModel'
    }],
    email : String,
    phone : String,
    dateCreated : {
        type : Date,
        default: Date.now
    }
}, {collection: 'user'});

module.exports = userSchema;
