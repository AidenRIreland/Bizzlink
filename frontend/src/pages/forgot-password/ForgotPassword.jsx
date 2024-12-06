import { useEffect, useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [backendUrl, setBackendUrl] = useState("");
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [token, setToken] = useState("");
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchBackendUrl = async () => {
            try {
                const response = await axios.get("/api/config");
                setBackendUrl(response.data.backendUrl);
            } catch (error) {
                console.error("Error fetching backend URL:", error);
            }
        };
        fetchBackendUrl();
    }, []);

    const handleCheck2FA = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/auth/check-2fa`, { username });
            setTwoFactorEnabled(response.data.twoFactorEnabled);
            setMessage("");
        } catch (error) {
            setMessage("Error checking 2FA status");
        }
    };

    const handleResetPassword = async () => {
        try {
            const payload = {
                username,
                newPassword,
                ...(twoFactorEnabled && { token }),
            };

            const response = await axios.post(`${backendUrl}/api/auth/forgot-password`, payload);
            setMessage(response.data.message || "Password reset successfully");
        } catch (error) {
            setMessage(error.response?.data?.error || "Error resetting password");
        }
    };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-white">
        <h1 className="text-3xl font-semibold text-center text-gray-500">
          Forgot <span className="text-[#5A68D8]">Password</span>
        </h1>

        {/* Display message */}
        {message && (
          <p className="text-sm text-center text-red-500 my-2">{message}</p>
        )}

        <div>
          <label className="label p-2">
            <span className="text-base label-text text-gray-500">
              Enter your username
            </span>
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="btn btn-block btn-sm mt-2 bg-[#5A68D8] text-white"
            onClick={handleCheck2FA}
          >
            Check 2FA Status
          </button>
        </div>

        {twoFactorEnabled !== null && (
          <>
            {twoFactorEnabled && (
              <div>
                <label className="label p-2">
                  <span className="text-base label-text text-gray-500">
                    Enter 2FA Code
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Enter 2FA Code"
                  className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
            )}
            <div>
              <label className="label p-2">
                <span className="text-base label-text text-gray-500">
                  New Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter your new password"
                className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-block btn-sm mt-2 bg-[#5A68D8] text-white"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;