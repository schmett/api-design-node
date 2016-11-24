// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data

// module fs - allows you to read files
// it has a method on it - read - which allows you to read files

var jsonData = {count: 12, message: 'hey'};

var express = require('express');

var app = express();

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html', function(err) {
		if (err) {
			res.status(500).end();
		}
	})
});

app.get('/data', function(req, res) {
  res.json(jsonData);
});

app.listen(3000, function() {
	console.log('Listening on port 3000');
});
