import { motion } from "motion/react";
import TestimonialCarousel3D from "./Testimonials3D";
import "./TestimonialsSection.css"; // Import the CSS file
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
      <TestimonialCarousel3D />
    </section>
  );
};

export default TestimonialsSection;
