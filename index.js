const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT, MONGODB_URI } = process.env;
const port = PORT || 3000;

mongoose.connect(
	MONGODB_URI,
	{
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err !== null) {
			console.log('Error connecting to DB', err);
			return;
		}

		console.log('DB successfully connected');
	}
);

//Set up controllers
const { restaurant } = require('./controllers');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set up routes
app.use('/restaurants', restaurant);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
