var mongoose 	= require('mongoose');
var Schema		= mongoose.Schema;

var memberSchema = new Schema({
	name: String,
	password: String
});

module.exports = mongoose.model('member',memberSchema);