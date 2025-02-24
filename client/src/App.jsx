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
import { checkAuth, logoutUser } from "./features/auth/authSlice";
import TestimonialsSection from "./components/Testimonials/TestimonialsSection ";

import Timeline from "./components/Timeline/Timeline";
import SplashScreen from "./components/SplashScreen/SplashScreen";
import Footer from "./components/Footer/Footer";

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
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLoginSuccess = () => {
    // When login succeeds, Redux state is updated.
    setShowAuth(false);
  };

  const handleReviewSubmit = (review) => {
    // Handle review submission logic (e.g., update state or refetch reviews)
    setShowReviewPopup(false);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    localStorage.removeItem("token"); // 🔹 Clear token on logout
    setShowAuth(false); // 🔹 Close auth popup if open
  };

  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      ) : (
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
            <Timeline />
          </section>
          <section>
            <TestimonialsSection />
          </section>
          <section id="contact">
            <Contact />
          </section>
          <section className="footer-section">
            <Footer />
          </section>
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
      )}
    </>
  );
};
export default App;
