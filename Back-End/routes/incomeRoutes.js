const express = require('express');
const router = express.Router();
const Income = require('../Model/Income');

router.post('/income', async (req, res) => {
	try {
		const income = new Income({
			email: req.body.email,
			month: req.body.month,
			income: req.body.income
		});
		await income.save().then((data) => {
			console.log(data);
			res.send(data);
		});
	} catch (error) {
		res.status(422).send(error.message);
	}
});

router.post('/getDetails', async (req, res) => {
	try {
		const { email } = req.body;
		const mail = await Income.find({ email }).then((data) => {
			console.log(data);
			res.send(data);
		});
	} catch (error) {
		res.status(422).send(error.message);
	}

	// try {
	// 	const income = new Income({
	// 		mail: req.body.mail
	// 	});
	// 	await income.findOne({ mail }).then((data) => {
	// 		console.log(data);
	// 		res.send(data);
	// 	});
	// } catch (error) {
	// 	res.status(422).send(error.message);
	// }
});
module.exports = router;
