const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const incomeSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	month: {
		type: String,
		required: true
	},
	income: {
		type: String,
		required: true
	}
});

const Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
