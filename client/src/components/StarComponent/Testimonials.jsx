// import "./StarRating.css";

// const sampleTestimonials = [
//   {
//     name: "Alice",
//     rating: 5,
//     testimonial: "Amazing work! Highly recommended!",
//   },
//   {
//     name: "Bob",
//     rating: 4,
//     testimonial: "Great experience, but some improvements needed.",
//   },
//   {
//     name: "Charlie",
//     rating: 5,
//     testimonial: "Superb design and functionality!",
//   },
// ];

// const Testimonials = () => {
//   const avgRating = (
//     sampleTestimonials.reduce((acc, t) => acc + t.rating, 0) /
//     sampleTestimonials.length
//   ).toFixed(1);

//   return (
//     <div className="testimonials-section">
//       <h3 className="avg-rating">⭐ Average Rating: {avgRating}/5</h3>
//       <h3 className="testimonials-title">What Others Say:</h3>
//       <div className="testimonials-container">
//         {sampleTestimonials.map((t, i) => (
//           <div key={i} className="testimonial-card">
//             <p className="testimonial-text">"{t.testimonial}"</p>
//             <span className="testimonial-rating">
//               ⭐ {t.rating}/5 - {t.name}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Testimonials;
