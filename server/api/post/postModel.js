var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
  	type: String, 
  	required: true
  }, 
  text: {
  	type: String
  }, 
  author: {
  	type: Schema.Types.ObjectId, 
  	ref: 'user', 
  	// user collection we made earlier
  	required: true
  }, 
  categories: [{
  	type: Schema.Types.ObjectId, 
  	ref: 'category'
  }]
});

module.exports = mongoose.model('post', PostSchema);
