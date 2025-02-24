import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const EmailVerification = ({ email, onVerified }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!code) {
      toast.error("Please enter the verification code");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-email?token=${code}`
      );
      if (response.data.message) {
        toast.success(response.data.message);
        onVerified();
      }
    } catch (error) {
      toast.error("Verification failed. Please check your code and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verification-container">
      <h2>Email Verification</h2>
      <p>
        Please enter the verification code send to <strong>{email}</strong>
      </p>
      <input
        type="text"
        placeholder="Enter verification code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleVerify} disabled={loading}>
        {loading ? "Verifying..." : "Verify Email"}
      </button>
    </div>
  );
};

export default EmailVerification;
