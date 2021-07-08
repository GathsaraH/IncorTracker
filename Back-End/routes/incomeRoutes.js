const express = require('express');
const router = express.Router();
const Income = require('../Model/Income');

router.post('/income', async (req, res) => {
	const income1= req.body.income;
	const expense2=req.body.expense;
	const incomeValue=Integer.parseInt(income1)
	const expenseValue=Integer.parseInt(expense2)
    const total=incomeValue-expenseValue
	try {
		const income = new Income({
			email: req.body.email,
			month: req.body.month,
			income: req.body.income,
			expense:req.body.expense,
			total:total
		});
          
		// Solved Income
		// Income.income-Income.express
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
