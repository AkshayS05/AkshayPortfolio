import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllReviews,
  deleteReview,
} from "../../features/rating/ratingSlice";

import { toast } from "react-toastify";
import "./Testimonials3D.css";
import TestimonialCard from "./TestimonialCard";
import StarRatingPopup from "../StarComponent/StarRatingPopup";
import AnimatedCardWrapper from "./AnimatedCardWrapper";

const Testimonials3D = () => {
  const dispatch = useDispatch();
  const { reviews, isLoading, error } = useSelector((state) => state.rating);
  const { user } = useSelector((state) => state.auth);
  // Show one review at a time
  const [currentIndex, setCurrentIndex] = useState(0);
  // Popup state for editing
  const [popupData, setPopupData] = useState(null);
  // Trigger deletion animation on the current card
  const [deleteTriggered, setDeleteTriggered] = useState(false);

  useEffect(() => {
    dispatch(fetchAllReviews());
  }, [dispatch]);

  // Navigation
  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? reviews.length - 1 : prev - 1));
  };

  // For editing, simply set popup data
  const handleEditClick = (data) => {
    setPopupData(data);
  };

  // When delete icon is clicked, trigger animation
  const handleDeleteClick = (reviewId) => {
    setDeleteTriggered(true);
  };

  // Called when the deletion animation finishes
  const onDeleteAnimationEnd = () => {
    // Dispatch deletion of the current review
    dispatch(deleteReview(reviews[currentIndex]._id))
      .unwrap()
      .then(() => {
        toast.success("Review deleted successfully!");
        // If there are still reviews, show the next one (or wrap around)
        setCurrentIndex((prev) => (prev >= reviews.length - 1 ? 0 : prev));
        setDeleteTriggered(false);
      })
      .catch((err) => {
        toast.error(err || "Error deleting review");
        setDeleteTriggered(false);
      });
  };

  if (isLoading) {
    return (
      <section className="hero2 flex-center">
        <h2>Loading...</h2>
      </section>
    );
  }
  if (error) {
    return (
      <section className="hero2 flex-center">
        <h2>Error: {error}</h2>
      </section>
    );
  }
  if (!reviews || reviews.length === 0) {
    return (
      <section className="hero2 flex-center">
        <h2>No testimonials yet.</h2>
      </section>
    );
  }

  return (
    <>
      <section className="hero2">
        <Canvas
          className="canvas"
          gl={{ alpha: true }}
          camera={{ position: [0, 0, 9] }}
        >
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Suspense fallback={null}>
            <AnimatedCardWrapper
              triggerDelete={deleteTriggered}
              onDeleteAnimationEnd={onDeleteAnimationEnd}
            >
              <TestimonialCard
                testimonial={reviews[currentIndex].testimonial}
                username={reviews[currentIndex].userId?.name || "Anonymous"}
                rating={reviews[currentIndex].rating}
                position={[0, 0, 0]}
                userPic={reviews[currentIndex].userId?.profilePic}
                reviewId={reviews[currentIndex]._id}
                ownerId={reviews[currentIndex].userId} // Adjust if needed
                currentUserId={user?.id}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
              />
            </AnimatedCardWrapper>
          </Suspense>
        </Canvas>
        <button className="nav-button prev" onClick={handlePrev}>
          &#9664;
        </button>
        <button className="nav-button next" onClick={handleNext}>
          &#9654;
        </button>
        <div className="scroll-instructions">
          Use arrows to navigate reviews
        </div>
      </section>
      {popupData && (
        <StarRatingPopup
          onClose={() => setPopupData(null)}
          editData={popupData}
          user={user}
        />
      )}
    </>
  );
};

export default Testimonials3D;
