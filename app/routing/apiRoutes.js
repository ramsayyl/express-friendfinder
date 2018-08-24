var path = require('path');
var fs = require('fs');

var friends = require('../data/friends.js');

module.exports = function(app) {

	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function(req, res) {
		var userInput = req.body;
		console.log('userInput = ' + JSON.stringify(userInput));

		var userResponses = userInput.scores;
		console.log('userResponses = ' + userResponses);

		var matchName = '';
		var matchImage = '';
		var totalDifference = 10000;

		for (var i = 0; i < friends.length; i++) {

			// Calculate the difference against each user
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}

			// Lowest differece is the match
			if (diff < totalDifference) {

				totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);
    console.log(friends);

    fs.appendFile('./app/data/friends.js', JSON.stringify(userInput)+',\r', function(err) {
            if (err) throw err
            console.log('Write successful!')
        })

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};
