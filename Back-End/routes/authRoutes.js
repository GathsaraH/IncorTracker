const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Users = require('../Model/Users');
const jwtKey = 'jnsdnfdju38h';
//post
router.post('/register', async (req, res) => {
	try {
		const users = new Users({
			name: req.body.name,
			pnumber: req.body.pnumber,
			email: req.body.email,
			password: req.body.password
		});
		await users.save().then((data) => {
			console.log(data);
			const token = jwt.sign({ userId: users._id }, jwtKey);
			res.send({ token });
		});
	} catch (error) {
		res.status(422).send(error.message);
	}
});

router.post('/sign-in', async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).send({ error: 'must provide email or password' });
	}
	const users = await Users.findOne({ email });
	if (!users) {
		return res.status(422).send({ error: 'must provide email or password' });
	}
	try {
		await users.comparePassword(password);
		const token = jwt.sign({ userId: users._id }, jwtKey);
		res.send({ token });
	} catch (err) {
		return res.status(422).send({ error: 'must provide email or password' });
	}
});

module.exports = router;
