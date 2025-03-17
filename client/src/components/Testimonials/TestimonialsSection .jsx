import { useCallback, useEffect, useMemo, useState } from "react";
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
  const [filter, setFilter] = useState("");

  const filterParams = useMemo(() => {
    ({ sort: filter });
  }, [filter]);

  const fetchReviews = useCallback(() => {
    dispatch(fetchAllReviews(filterParams));
  }, [dispatch, filterParams]);

  useEffect(() => {
    // Dispatch fetchAllReviews on mount regardless of auth state.
    fetchReviews();
  }, [fetchReviews]);

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
      <div className="filter-container">
        <label htmlFor="filter" className="filter-label">
          <span role="img" aria-label="filter">
            🔍
          </span>{" "}
          Filter:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">Default</option>
          <option value="top10">Top 10 Reviews</option>
          <option value="asc">Lowest to Highest</option>
          <option value="desc">Highest to Lowest</option>
        </select>
      </div>
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
