// controllers/reviewController.js
const Review = require('../models/review');

exports.createReview = async (req, res, next) => {
  try {
    const { userId, carId, rating, comment } = req.body;
    const review = await Review.createReview(userId, carId, rating, comment);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

exports.getCarReviews = async (req, res, next) => {
  try {
    const { carId } = req.params;
    const reviews = await Review.getReviewsByCarId(carId);
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};
