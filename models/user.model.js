var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema({
	time: {
		type: Date,
		default: Date.now
	},
	from: String,
	message: String
});

var chatSchema = new Schema({
	user: {
		email: String,
		name: {
			first: String,
			last: String
		}
	},
	messages: [messageSchema]
});

var userSchema = new Schema({
	name: {
		first: String,
		last: String
	},
	email: String,
	password: String,
	chats: [chatSchema]
});

userSchema.set('toJSON', {
	transform: function(doc, ret, options) {
		delete ret.password;
		return ret;
	}
});

module.exports = mongoose.model('User', userSchema);