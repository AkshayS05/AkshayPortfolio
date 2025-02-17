const express = require("express");
const {
  getAllReviews,
  getSingleReviewById,
  addReview,
  updateReview,
  deleteReview,
} = require("../controllers/ratingController");
const authMiddleware = require("../helpers/authMiddleware");

const router = express.Router();

router.get("/get", getAllReviews);
router.get("/get/:id", getSingleReviewById);
router.post("/add", authMiddleware, addReview); // protect addReview
router.put("/update/:id", authMiddleware, updateReview);
router.delete("/delete/:id", authMiddleware, deleteReview);

module.exports = router;
