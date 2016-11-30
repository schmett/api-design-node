var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
  	type: String, 
  	required: true, 
  	unique: true
  }, 
  address: {
  	// address is an object with a state properties
  	state: {
  		type: String, 
  		required: true
  	}
  }, 
  // I have a post model which would allow me to find 
  // all the data associated with a certain user
  // ie I go to all the posts and then I can just
  // find all the posts associated with a certain id
  // what I can also do however is create a cross-reference
  // of sorts, like the one below
  // this is called denormalisation
  // in other ways, there are more than one ways
  // to access the information I'm looking for
  posts: [
    {ref: 'posts', type: Schema.Types.ObjectId}
  ]
});

module.exports = mongoose.model('user', UserSchema);
