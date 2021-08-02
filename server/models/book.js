const { Schema, model } = require("mongoose");

const BookSchema = new Schema({
	name: {
		type: String,
	},
	genre: {
		type: String,
	},
	authorId: {
		type: String,
	},
});

module.exports = model("Book", BookSchema);