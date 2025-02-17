import ReactDOM from "react-dom";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "./components/hero/Hero";
import Services from "./components/services/Services";
import Portfolio from "./components/portfolio/Portfolio";
import Contact from "./components/contact/Contact";
import StarRatingPopup from "./components/StarComponent/StarRatingPopup";
import AuthPopup from "./components/AuthPopup/AuthPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  checkAuth,
  logoutUser,
  resetTokenAndCredentials,
} from "./features/auth/authSlice";
import TestimonialsSection from "./components/Testimonials/TestimonialsSection ";
import GlowingTree from "./components/SkillSets/Tree";

const App = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const dispatch = useDispatch();

  // Get user and auth state from Redux
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );

  // Dispatch checkAuth() on mount to fetch user info using cookies
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("token"));
    dispatch(checkAuth(token));
  }, [dispatch]);

  const handleLoginSuccess = () => {
    // When login succeeds, Redux state is updated.
    setShowAuth(false);
  };

  const handleReviewSubmit = (review) => {
    // Handle review submission logic (e.g., update state or refetch reviews)
    setShowReviewPopup(false);
  };

  function handleLogout() {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
  }
  return (
    <div className="container">
      <section id="home">
        <Hero
          user={user}
          onAuthOpen={() => setShowAuth(true)}
          onReviewOpen={() => setShowReviewPopup(true)}
          onLogout={handleLogout}
        />
      </section>
      <section id="services">
        <Services />
      </section>
      <Portfolio />
      <section>
        <TestimonialsSection />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section>{/* <GlowingTree /> */}</section>
      {showAuth &&
        ReactDOM.createPortal(
          <AuthPopup
            onClose={() => setShowAuth(false)}
            onLoginSuccess={handleLoginSuccess}
          />,
          document.body
        )}

      {showReviewPopup &&
        user &&
        ReactDOM.createPortal(
          <StarRatingPopup
            user={user}
            onSubmit={handleReviewSubmit}
            onClose={() => setShowReviewPopup(false)}
          />,
          document.body
        )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;
