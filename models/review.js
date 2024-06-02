// models/review.js
const db = require('../db/connection');

class Review {
  static async createReview(userId, carId, rating, comment) {
    const result = await db.query(
      'INSERT INTO reviews (user_id, car_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, carId, rating, comment]
    );
    return result.rows[0];
  }

  static async getReviewsByCarId(carId) {
    const result = await db.query('SELECT * FROM reviews WHERE car_id = $1', [carId]);
    return result.rows;
  }
}

module.exports = Review;
