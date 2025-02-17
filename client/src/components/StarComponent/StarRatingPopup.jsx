import { useState, useEffect } from "react";
import StarRating3D from "./StarRating3D";
import "./StarRatingPopup.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addReview,
  fetchAllReviews,
  updateReview,
} from "../../features/rating/ratingSlice";
import { toast } from "react-toastify";

const StarRatingPopup = ({ onClose, user, editData }) => {
  const dispatch = useDispatch();
  // If editing, use editData; otherwise use defaults.
  const [rating, setRating] = useState(editData?.rating || 0);
  const [testimonial, setTestimonial] = useState(editData?.testimonial || "");

  // Only fetch average rating if NOT in edit mode.
  useEffect(() => {
    if (!editData) {
      dispatch(fetchAllReviews());
    }
  }, [dispatch, editData]);

  const { avgRating, isLoading, error } = useSelector((state) => state.rating);

  const handleSubmit = () => {
    if (editData) {
      // Update review
      dispatch(
        updateReview({ reviewId: editData.reviewId, rating, testimonial })
      )
        .unwrap()
        .then(() => {
          toast.success("Review updated successfully!");
          dispatch(fetchAllReviews());
          onClose();
        })
        .catch((err) => {
          toast.error(err || "Error updating review");
        });
    } else {
      // Add new review
      dispatch(addReview({ rating, testimonial }))
        .unwrap()
        .then(() => {
          toast.success("Thank you for your rating!");
          dispatch(fetchAllReviews());
          onClose();
        })
        .catch((err) => {
          toast.error(err || "Error submitting review");
        });
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2 className="rating-title">
          {editData ? "Edit Your Review" : "⭐ Rate My Work ⭐"}
        </h2>
        <div className="star-canvas-container">
          <StarRating3D rating={rating} setRating={setRating} />
        </div>
        <textarea
          className="testimonial-input"
          placeholder="Leave a testimonial..."
          rows={4}
          value={testimonial}
          onChange={(e) => setTestimonial(e.target.value)}
        />
        <div className="button-container">
          <button className="auth-btn review-btn" onClick={handleSubmit}>
            {editData ? "Update Review" : "Review My Services"}
          </button>
          <button
            className="auth-btn logout-btn"
            onClick={() => alert("Logout functionality goes here.")}
          >
            Logout
          </button>
        </div>
        {!editData && (
          <>
            <h3 className="avg-rating">
              ⭐ Average Rating: {avgRating || "Loading..."}
            </h3>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default StarRatingPopup;
