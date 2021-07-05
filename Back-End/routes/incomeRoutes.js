const express = require('express');
const router = express.Router();
const Income = require('../Model/Income');

router.post('/income', async (req, res) => {
	try {
		const income = new Income({
			_id: req.body._id
		});
		await income.save().then((data) => {
			console.log(data);
			res.send(data);
		});
	} catch (error) {
		res.status(422).send(error.message);
	}
});
module.exports = router;
