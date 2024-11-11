import React from "react";
import { useAuthContext } from "../context/AuthContext";

const AccountDashboard = () => {
    const { authUser } = useAuthContext();

    return (
        <div className="flex justify-center">
        <div className="card lg:card-side bg-base-100 shadow-xl w-full max-w-xl">
            <figure className="lg:w-5/12 h-min p-8">
                <img
                    src={authUser.profilePic || "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"}
                    alt="User Profile"
                    className="w-10/12 h-auto object-contain"
                />
            </figure>
            <div className="card-body gap-4">
                <h2 className="card-title">{authUser.fullName || "Full Name"}</h2>
                <p>Email: {authUser.email || "user@example.com"}</p>
                <p>Username: {authUser.username || "username"}</p>
                <p>Password: *******</p>
                <p>Gender: {authUser.gender || "Prefer not to say"}</p>
                <div className="card-actions justify-start mt-4">
                    <button className="btn btn-primary">Edit Profile</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default AccountDashboard;
