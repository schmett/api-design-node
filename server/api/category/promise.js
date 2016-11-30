// var action = function(cb) {
// // a promise is an object with methods on it
// // they will let you know that something is resolved
// // or that it errored out

// 	setTimeout(function() {
// 		cb('hey');
// 	}, 5000);
// }

// action(function(arg) {
// 	console.log(arg);
// });

// promises are now native in our environments

// the best library for promises is probably Bluebird, at least currently
// Q is also pretty good
var fs = require('fs');
var readFile = function() {
	return new Promise(function(resolve, reject) {
		fs.readFile('./package.json', function(err, file) {
			return err ? reject(err) : resolve(file.toString());
		});
	})
}

readFile()
// whatever I return in .then is automatically 
// wrapped for me in another promise
  .then(function(file) {
  	console.log(file);

  })
  // the contents here will be contained in 
  // the next .then statement
  .then(function(word) {
  	console.log(word);
  })
  .catch(function(err) {

  })
  .finally()


var action = function() {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			reject(new Error('noooo'))
		}, 5000);
	})
}

// action is now returning a promise
// this means that I get access to a lot of methods
// (promise is just an object)
// promises were invented for single-threaded environments

// I can store promises
var promise = action()

action()
  .then(function(word) {
  	console.log(word);
  })
  .catch(function(err) {
  	console.log(err);
  })

// a very popular pattern for promises is the following:

// the function below will be defined somewhere else
// they will CONSUME the resolution of the promise before them
readFile()
// using an optional second argument below is one option to 
// catch errors
.then(logFile, function(err) {
  
})
.then(sendEmail)
.then(callHome)
.catch(function() {

})

var logFile = function() {
	return readFile()
	  .then(function() {
	  	return readFile()
	  });
}

// resolves an array of promises and waits for everything to be done
// before things are resolved

var readAllFiles = function() {
	var promises = [readFile(), readFile(), readFile()];
	return Promise.all(promises);
}

readAllFiles()
  .then(function(files) {
  	console.log(files.length);
  })


