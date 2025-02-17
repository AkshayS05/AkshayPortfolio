import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";
import "./AuthPopup.css";
import PopupBackground3D from "./PopupBackground3D"; // Import our new 3D background

const AuthPopup = ({ onClose, onLoginSuccess }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isLogin) {
        // Registration: use the whole formData (including name)
        const registerData = await dispatch(registerUser(formData)).unwrap();
        toast.success("Registration successful! Please log in.");
        setFormData({ name: "", email: "", password: "" });
        setIsLogin(true);
      } else {
        // Login: only use email and password
        const { email, password } = formData;
        if (!email || !password) {
          toast.error("Please enter your email and password.");
          return;
        }
        const loginData = await dispatch(
          loginUser({ email, password })
        ).unwrap();
        toast.success("Login successful!");
        localStorage.setItem("token", loginData.token);
        onLoginSuccess(loginData.user);
        onClose();
      }
    } catch (err) {
      toast.error(err || "An error occurred. Please try again.");
    }
  };

  return ReactDOM.createPortal(
    <div className="auth-overlay">
      {/* The 3D background behind our popup */}
      <PopupBackground3D />

      {/* The actual popup container */}
      <div className="auth-container">
        <button className="auth-close-btn" onClick={onClose}>
          ❌
        </button>
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
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
    document.body
  );
};

export default AuthPopup;
