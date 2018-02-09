
var mongoose = require('mongoose'),
	schema = mongoose.Schema,
	custSchema = new schema({
		name: String,
		age: Number,
		phone: Number,
		email:String,
		dob: Date,
		service: String,
		designation: String,
		star: Number,
		createdAt: Date,
		updatedAt: Date,
		isActive: Boolean
	});

module.exports = mongoose.model('customer',custSchema);