import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TwoFASetup = () => {
  const [qrCode, setQrCode] = useState(null);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await fetch("/api/auth/2fa/setup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await response.json();
        if (response.ok) {
          setQrCode(data.qrCode);
        } else {
          toast.error(data.error || "Failed to fetch QR code");
        }
      } catch (error) {
        console.error("Error fetching QR code:", error);
        toast.error("Failed to fetch QR code");
      }
    };

    fetchQRCode();
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ token: otp }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("2FA setup successfully");
        navigate("/myaccount");
      } else {
        toast.error(data.error || "Failed to verify 2FA");
      }
    } catch (error) {
      console.error("Error verifying 2FA:", error);
      toast.error("Failed to verify 2FA");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Set Up Two-Factor Authentication</h1>
      {qrCode ? (
        <>
          <img src={qrCode} alt="Scan this QR code" className="my-4" />
          <p>Scan the QR code above with your authenticator app.</p>
          <form onSubmit={handleVerify} className="mt-4 flex flex-col gap-2">
            <label className="text-sm font-semibold">Enter the OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="input input-bordered"
              required
            />
            <button type="submit" className="btn btn-primary">
              Verify & Enable
            </button>
          </form>
        </>
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
};

export default TwoFASetup;