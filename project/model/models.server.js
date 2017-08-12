module.exports = function(mongoose) {
    var connectionString =  null;

    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://cs5610-web-project:cs5610@ds011251.mlab.com:11251/heroku_rsmgp137';
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