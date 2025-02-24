import { useEffect } from "react";
import "./SplashScreen.css";

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    // Hide splash screen after 3 seconds (adjust as needed)
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="splash-container">
      <img src="/public/brand_logo.png" alt="Logo" className="splash-logo" />
    </div>
  );
};

export default SplashScreen;
