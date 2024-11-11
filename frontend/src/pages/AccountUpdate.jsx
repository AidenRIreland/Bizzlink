import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const AccountUpdate = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const [fullName, setFullName] = useState(authUser.fullName || "");
  const [username, setUsername] = useState(authUser.username || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ fullName, username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update profile");
      }

      const updatedUser = await response.json();
      setAuthUser(updatedUser);
      toast.success("Profile updated successfully");
      navigate("/myaccount");
    } catch (error) {
      console.error("Update profile error:", error);
      toast.error(error.message || "An error occurred while updating your profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card lg:card-side bg-base-100 shadow-xl w-full max-w-3xl">
        <figure className="lg:w-4/12 h-min p-8">
          <img
            src={authUser.profilePic || "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"}
            alt="User Profile"
            className="w-10/12 h-auto object-contain"
          />
        </figure>
        <div className="card-body gap-4">
          <h2 className="card-title">Edit Profile</h2>
          <form onSubmit={handleUpdate} className="flex flex-col gap-2">
            <div>
              <label className="label text-xs uppercase text-indigo-600">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label text-xs uppercase text-indigo-600">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div className="card-actions justify-start mt-6 items-center gap-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
              </button>
              <Link to="/myaccount">Cancel</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountUpdate;