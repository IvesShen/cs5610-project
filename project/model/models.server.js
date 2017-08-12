module.exports = function(mongoose) {
    var connectionString =  null;

    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://cs5610-webdev-project:cs5610@ds021663.mlab.com:21663/heroku_zg2gzvkm';
    }
    else
    {
        connectionString = 'mongodb://localhost:27017/cs5610_webdev_project'
    }

    mongoose.connect(connectionString, {useMongoClient: true});
    mongoose.Promise = require('q').Promise;

    var userModel = require("./user/user.model.server")(mongoose);

    var models = {
        'userModel' : userModel
    };

    return models;
};