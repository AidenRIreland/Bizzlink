import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [token, setToken] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(null);
  const [message, setMessage] = useState("");

  const handleCheck2FA = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/check-2fa",
        { username }
      );
      setTwoFactorEnabled(response.data.twoFactorEnabled);
    } catch (error) {
      setMessage("Error checking 2FA status");
    }
  };

  const handleResetPassword = async () => {
    try {
      const payload = {
        username,
        newPassword,
        ...(twoFactorEnabled && { token }), // Include the token only if 2FA is enabled
      };

      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        payload
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error resetting password");
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleCheck2FA}>Check 2FA Status</button>

      {twoFactorEnabled !== null && (
        <>
          {twoFactorEnabled && (
            <input
              type="text"
              placeholder="Enter 2FA Code"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          )}
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
