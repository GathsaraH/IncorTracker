const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const incomeSchema = new Schema({
	_id: {
		type: Schema.Types.ObjectId,
		required: true
	}
});

const Income = mongoose.model('Income', incomeSchema);
module.exports = Income;
