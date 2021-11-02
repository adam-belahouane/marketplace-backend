import pool from "../../db/connect.js";

const getReviews = async (req, res, next) => {
  try {
    const data = await pool.query(
      "SELECT * FROM reviews WHERE product_id=$1 ORDER BY created_at ASC",
      [req.params.id]
    );
    if (data.rows.length) {
      res.send(data.rows);
    } else {
      res.status(400).send("No reviews found");
    }
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const { comment, rate, product_id } = req.body;
    const data = await pool.query(
      "INSERT INTO reviews(comment, rate, product_id) VALUES($1, $2, $3) RETURNING *;",
      [comment, rate, product_id]
    );
    res.send(data.rows[0]);
  } catch (error) {
    next(error);
  }
};

const editReviewById = async (req, res, next) => {
  try {
    const { comment, rate, product_id } = req.body;
    const data = await pool.query(
      "UPDATE reviews SET comment=$1, rate=$2, product_id=$3, updated_at=$4 WHERE id=$5 RETURNING *;",
      [comment, rate, product_id, new Date, req.params.reviewId]
    );
    res.send(data.rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteReviewById = async (req, res, next) => {
  try {
    await pool.query("DELETE FROM reviews WHERE id=$1", [req.params.reviewId]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const reviews = {
    getReviews, createReview, editReviewById, deleteReviewById
}
