const express = require('express');
const router = express.Router();

const { Restaurant } = require('../models');

const createRestaurant = (req, res) => {
	console.log('POST /restaurants');
	const {
		name,
		address,
		city,
		country,
		stars,
		cuisine,
		priceCategory,
	} = req.body;

	const restaurant = new Restaurant({
		name,
		address,
		city,
		country,
		stars,
		cuisine,
		priceCategory,
	});

	restaurant.save((err, restaurant) => {
		if (err !== null) {
			res.json({
				success: false,
				message: err.toString(),
			});
			return;
		}

		res.json({
			success: true,
			data: restaurant,
		});
	});
};

const deleteRestaurant = (req, res) => {
	console.log('DELETE /restaurants/:id');
	const restaurantId = req.params.id;

	Restaurant.deleteOne({ _id: restaurantId }, (err, deletedObj) => {
		console.log('deleted:', deletedObj);
		if (err !== null) {
			res.json({
				success: false,
				message: err.toString(),
			});
			return;
		}

		res.json({
			success: true,
			data: {
				isDeleted: true,
			},
		});
	});
};

const readRestaurant = (req, res) => {
	console.log('GET /restaurants/:id');
	const restaurantId = req.params.id;

	Restaurant.findById(restaurantId, (err, restaurant) => {
		if (err !== null) {
			res.json({
				success: false,
				message: err.toString(),
			});
			return;
		}

		res.json({
			success: true,
			data: restaurant,
		});
	});
};

const readRestaurants = (req, res) => {
	console.log('GET /restaurants');
	Restaurant.find({}, (err, restaurant) => {
		if (err !== null) {
			res.json({
				success: false,
				message: err.toString(),
			});
			return;
		}

		res.json({
			success: true,
			data: restaurant,
		});
	});
};

const updateRestaurant = (req, res) => {
	console.log('PUT /restaurants/:id');
	const restaurantId = req.params.id;
	const newName = req.query.name;

	Restaurant.updateOne(
		{ _id: restaurantId },
		{ name: newName },
		(err, status) => {
			console.log('err', err);
			console.log('status', status);

			if (err !== null) {
				res.json({
					success: false,
					message: err.toString(),
				});
				return;
			}

			res.json({
				success: true,
				data: `The restaurant on id ${restaurantId} has been successfully updated`,
			});
		}
	);
};

// router.get('/', readRestaurants);
// router.get('/:id', readRestaurant);
// router.post('/', createRestaurant);
// router.put('/:id', updateRestaurant);
// router.delete('/:id', deleteRestaurant);

router.route('/').get(readRestaurants).post(createRestaurant);

router
	.route('/:id')
	.get(readRestaurant)
	.put(updateRestaurant)
	.delete(deleteRestaurant);

module.exports = router;
