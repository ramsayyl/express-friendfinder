var path = require('path');
var data = require('../data/friends.js');


module.exports = function(app) {
    // Return all users in JSON format
    app.get('/api/friends',function(req, res) {
      return res.json(data);
    });

}
