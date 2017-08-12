var mongoose = require('mongoose');

module.exports = function(app){

    require("./model/models.server")(mongoose);



    require("./services/user.service.server.js")(app);
    require("./services/dog.service.server")(app);
};