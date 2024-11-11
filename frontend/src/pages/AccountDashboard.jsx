import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const AccountDashboard = () => {
    const { authUser } = useAuthContext();
    const navigate = useNavigate();

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
                <div>
                <p className="text-xs uppercase text-indigo-600">Email</p>
                <p>{authUser.email || "user@example.com"}</p>
                </div>
                <div>
                <p className="text-xs uppercase text-indigo-600">Username</p>
                <p>{authUser.username || "username"}</p>
                </div>
                <div>
                <p className="text-xs uppercase text-indigo-600">Password</p>
                <p>************</p>
                </div>
                <div>
                <p className="text-xs uppercase text-indigo-600">Gender</p>
                <p>{authUser.gender || "Prefer not to say"}</p>
                </div>
                <div className="card-actions justify-start mt-4">
                    <button onClick={() => navigate("/updateaccount")} className="btn btn-primary">Edit Profile</button>
                </div>
            </div>
        </div>
    </div>
    );
};

export default AccountDashboard;
