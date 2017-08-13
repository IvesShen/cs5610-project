module.exports = function(mongoose) {
    var connectionString =  null;

    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://cs5610_dev:cs5610@ds147821.mlab.com:47821/heroku_h7rf48jn';
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