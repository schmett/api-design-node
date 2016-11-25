// TODO: make this work.
// if you go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// within client as a static resource
// also, it will serve the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions

app.get('/lions', function (req, res) {
  res.json(lions);	
})

app.get('/lion/:id', function(req, res) {
	var lion = _.findIndex(lions, {id: req.params.id});
	res.json(lion);
})

app.post('/lions', function (req, res) {
	var lion = req.body;
	id++;
	id = id + '';
	lions.push(lion);
	res.send(lion);
})

app.put('/lions/:id', function (req, res) {

	var update = req.body;
	var lion = _.findIndex(lions, {id: req.params.id});
	if(!lions[lion]) {
	  res.send();	
	} else {
		var updatedLion = _.extend(lions[lion], update);
		res.json(updatedLion);
	}
})

app.delete('/lions/:id', function (req, res) {
  
  var lion = _.findIndex(lions, {id: req.params.id});
  if(!lions[lion]) {
    res.send();
  } else {
    var deleted = lions[lion];
  	lions.splice(lion, 1);
  	res.send(deleted);
  }
})

app.listen(3000);
console.log('on port 3000');
