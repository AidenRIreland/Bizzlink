import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const PublicProfileEdit = () => {
    const { id } = useParams();
    const { authUser, setAuthUser } = useAuthContext();

    console.log("ID from useParams:", id);
    console.log("authUser:", authUser);

    const [businessLogo, setBusinessLogo] = useState(authUser.businessLogo || "");
    const [companyName, setCompanyName] = useState(authUser.companyName || "");
    const [industry, setIndustry] = useState(authUser.industry || "");
    const [address, setAddress] = useState(authUser.address || "");
    const [email, setEmail] = useState(authUser.email || "");
    const [phone, setPhone] = useState(authUser.phone || "");
    const [socialLinks, setSocialLinks] = useState(authUser.socialLinks || "");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`/api/users/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to load user profile");
                }
                const data = await response.json();
                setBusinessLogo(data.businessLogo || "");
                setCompanyName(data.companyName || "");
                setIndustry(data.industry || "");
                setAddress(data.address || "");
                setEmail(data.email || "");
                setPhone(data.phone || "");
                setSocialLinks(data.socialLinks || "");
            } catch (error) {
                console.error("Error fetching user profile:", error.message);
                toast.error("Failed to load user data");
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [id]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log("Base64 Encoded Image:", reader.result);
            setBusinessLogo(reader.result);
        };
        reader.readAsDataURL(file);
    };
    

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await fetch(`/api/users/update/publicprofile/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    businessLogo,
                    companyName,
                    industry,
                    address,
                    email,
                    phone,
                    socialLinks,
                }),
            });
    
            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("text/html")) {
                    throw new Error("Server returned an HTML error page");
                }
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update profile");
            }
    
            const updatedUser = await response.json();
            setAuthUser(updatedUser);
            toast.success("Profile updated successfully");
            navigate(`/publicprofile/${id}`);
        } catch (error) {
            console.error("Update profile error:", error.message);
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
                        src={businessLogo || "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"}
                        alt="Business Logo"
                        className="w-10/12 h-auto object-cover aspect-square"
                    />
                </figure>
                <div className="card-body gap-4">
                    <h2 className="card-title">Edit Public Profile</h2>
                    <form onSubmit={handleUpdate} className="flex flex-col gap-2">
                        <div>
                            <label className="label text-xs uppercase text-indigo-600">Company Name</label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label text-xs uppercase text-indigo-600">Business Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="mt-2"
                                onChange={handleImageUpload} 
                            />
                        </div>
                        <div>
                            <label className="label text-xs uppercase text-indigo-600">Industry</label>
                            <input
                                type="text"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label text-xs uppercase text-indigo-600">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label text-xs uppercase text-indigo-600">Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label text-xs uppercase text-indigo-600">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="label text-xs uppercase text-indigo-600">Social Links</label>
                            <input
                                type="text"
                                value={socialLinks}
                                onChange={(e) => setSocialLinks(e.target.value)}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div className="card-actions justify-start mt-6 items-center gap-4">
                            <button type="submit" className="btn btn-primary" disabled={loading}>
                                {loading ? "Updating..." : "Update Profile"}
                            </button>
                            <Link to={`/publicprofile/${id}`}>Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PublicProfileEdit;