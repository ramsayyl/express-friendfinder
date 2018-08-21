var path = require('path');

module.exports = function(app) {

    // Route to survey
    app.get('/survey', function(req,res) {
        res.sendFile(path.join(__dirname,'../public/survey.html'))
    });

    // Route to homepage, default url errors here
    app.get('*', function(req,res) {
      res.sendFile(path.join(__dirname,'../public/home.html'))
    });

}
