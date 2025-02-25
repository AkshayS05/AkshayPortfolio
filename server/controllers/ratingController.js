const Review = require("../models/Rating");

// 🔹 Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("userId", "name avatar");
    const avgRating = (
      reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
    ).toFixed(1);
    res.json({ avgRating, reviews });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// 🔹 Get a single review by ID
const getSingleReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "userId",
      "name avatar"
    );
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// 🔹 Add a new review (Only one per user)
const addReview = async (req, res) => {
  console.log(req.body, "here.....");
  try {
    const { rating, testimonial } = req.body;
    const userId = req.user.id; // Get user ID from authentication

    const existingReview = await Review.findOne({ userId });
    if (existingReview)
      return res
        .status(400)
        .json({ error: "You have already submitted a review" });

    const newReview = await Review.create({ userId, rating, testimonial });
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// 🔹 Update review (Only the review owner can update)
const updateReview = async (req, res) => {
  try {
    const { rating, testimonial } = req.body;
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    review.rating = rating;
    review.testimonial = testimonial;
    await review.save();
    res.json({ message: "Review updated successfully", review });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// 🔹 Delete review (Only the review owner can delete)
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    await review.deleteOne();
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

//top k reviews
// While we can use MongoDB’s built‑in sorting (e.g., .sort({ rating: -1 }).limit(10)), this requires querying the database each time the top 10 is requested.
const getTopKReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("userId");
    //create a heap and insert all reviews
    const heap = new MaxHeap();
    reviews.forEach((review) => heap.insert(review));

    const topReviews = [];
    const k = 10;
    for (let i = 0; i < k && heap.heap.length > 0; i++) {
      topReviews.push(heap.extractMax());
    }
    res.json({ topReviews });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getAllReviews,
  getSingleReviewById,
  addReview,
  updateReview,
  deleteReview,
};
