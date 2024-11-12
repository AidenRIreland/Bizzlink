import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePasswordPage = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/auth/change-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess(data.message);
                setTimeout(() => navigate("/myaccount"), 2000);
            } else {
                setError(data.message || "Failed to change password");
            }
        } catch (error) {
            console.error("Error changing password:", error);
            setError("Server error");
        }
    };

    return (
        <div className="flex justify-center">
            <div className="card lg:card-side bg-base-100 shadow-xl w-full max-w-3xl">
                <div className="card-body gap-4">
                    <h2 className="card-title">Change Password</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <form onSubmit={handleChangePassword} className="flex flex-col gap-2">
                        <div>
                            <label className="label text-xs uppercase text-indigo-600">Current Password</label>
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label text-xs uppercase text-indigo-600">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="card-actions justify-start mt-6 items-center gap-4">
                            <button type="submit" className="btn btn-primary">
                                Change Password
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => navigate("/myaccount")}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
