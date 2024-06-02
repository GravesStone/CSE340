// routes/reviewRoutes.js
const express = require('express');
const reviewController = require('../controllers/reviewController');
const router = express.Router();

router.post('/reviews', reviewController.createReview);
router.get('/cars/:carId/reviews', reviewController.getCarReviews);

module.exports = router;
