import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [is2FA, setIs2FA] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP/New Password

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setIs2FA(data.is2FA); // Indicates if user has 2FA enabled
        setStep(2); // Proceed to next step
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      const endpoint = is2FA
        ? "http://localhost:5000/api/auth/2fa/forgot-password"
        : "http://localhost:5000/api/auth/reset-password";
      const body = is2FA
        ? { email, otp }
        : { email, newPassword: e.target.newPassword.value };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Password reset successful!");
        // Redirect to login page
      } else {
        alert(data.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="forgot-password">
      <h1>Forgot Password</h1>
      {step === 1 ? (
        <form onSubmit={handleEmailSubmit}>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP/Reset Link</button>
        </form>
      ) : (
        <form onSubmit={handlePasswordReset}>
          {is2FA ? (
            <>
              <label>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </>
          ) : (
            <>
              <label>Enter New Password</label>
              <input type="password" name="newPassword" required />
            </>
          )}
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;