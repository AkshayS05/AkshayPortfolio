import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";
import "./AuthPopup.css";
import PopupBackground3D from "./PopupBackground3D";
import EmailVerification from "./EmailVerification";

const AuthPopup = ({ onClose, onLoginSuccess }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Get a dedicated portal container from index.html
  const portalElement = document.getElementById("portal");
  if (!mounted || !portalElement) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const registerData = await dispatch(registerUser(formData)).unwrap();
      toast.success(
        "Registration successful! Please check your email for your verification code."
      );
      setUserEmail(formData.email);
      setFormData({ name: "", email: "", password: "" });
      setIsVerifying(true);
    } catch (err) {
      // Try to extract error details from the response
      const status = err.response?.status;
      const errorMessage =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "An error occurred. Please try again.";
      console.log(err.message);
      // If the error status is 400, assume the email is already registered
      if ((err.message = "Request failed with status code 400")) {
        // Optionally, you could inspect errorMessage further if needed:
        // if (errorMessage.toLowerCase().includes("user already exists")) { ... }
        toast.error("Email already registered. Please log in.");
        setIsLogin(true);
        // Optionally, keep the email field prefilled:
        setFormData({ name: "", email: formData.email, password: "" });
      } else {
        toast.error(errorMessage);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      if (!email || !password) {
        toast.error("Please enter your email and password.");
        return;
      }
      const loginData = await dispatch(loginUser({ email, password })).unwrap();
      toast.success("Login successful!");
      localStorage.setItem("token", loginData.token);
      onLoginSuccess(loginData.user);
      onClose();
    } catch (err) {
      toast.error(err || "An error occurred. Please try again.");
    }
  };

  if (isVerifying) {
    return ReactDOM.createPortal(
      <div className="auth-overlay">
        <PopupBackground3D />
        <div className="auth-container">
          <button className="auth-close-btn" onClick={onClose}>
            ❌
          </button>
          <EmailVerification
            email={userEmail}
            onVerified={() => {
              setIsVerifying(false);
              setIsLogin(true);
            }}
          />
        </div>
      </div>,
      portalElement
    );
  }

  return ReactDOM.createPortal(
    <div className="auth-overlay">
      <PopupBackground3D />
      <div className="auth-container">
        <button className="auth-close-btn" onClick={onClose}>
          ❌
        </button>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={isLogin ? handleLogin : handleRegister}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isLoading}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
          {isLogin
            ? "New here? Register now!"
            : "Already have an account? Login!"}
        </p>
      </div>
    </div>,
    portalElement
  );
};

export default AuthPopup;
