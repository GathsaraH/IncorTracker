const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const requireToken = require('./middleware/requireToken');
const mongoose = require('mongoose');
const Users = require('./Model/Users');

const authRoutes = require('./routes/authRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
app.use(bodyParser.json());
app.use(authRoutes);
app.use(incomeRoutes);

//dbURI
const dbURI = 'mongodb+srv://Gathsara:root@incotracker.n61gn.mongodb.net/Inco-Tracker?retryWrites=true&w=majority';
//connect to the db
mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => {
		app.listen(process.env.PORT || 3000, () => {
			console.log('servr Ok');
		});
	})
	.catch((err) => {
		console.log(err);
	});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.get('/', requireToken, (req, res) => {
	const data = req.users.email;
	const data2 = req.users._id;
	res.send(data2);
});

//get
// app.get('/', (req, res) => {
// 	Users.find({})
// 		.then((response) => {
// 			res.send(response);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 		});
// });
