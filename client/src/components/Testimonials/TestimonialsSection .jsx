import { useEffect } from "react";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";

import TestimonialCarousel3D from "./Testimonials3D";
import "./TestimonialsSection.css";
import { fetchAllReviews } from "../../features/rating/ratingSlice";

const textVariants = {
  initial: {
    x: -100,
    y: -100,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const TestimonialsSection = () => {
  const dispatch = useDispatch();
  const { reviews, isLoading, error } = useSelector((state) => state.rating);

  useEffect(() => {
    // Dispatch fetchAllReviews on mount regardless of auth state.
    dispatch(fetchAllReviews());
  }, [dispatch]);

  return (
    <section id="testimonials" className="testimonials-section">
      <motion.h2
        className="section-title"
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        What Others Say
      </motion.h2>
      {isLoading ? (
        <p>Loading reviews...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <TestimonialCarousel3D reviews={reviews} />
      )}
    </section>
  );
};

export default TestimonialsSection;
