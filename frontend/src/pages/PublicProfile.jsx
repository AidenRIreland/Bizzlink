import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faSquareFacebook, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';

const PublicProfile = () => {
    const { id } = useParams();
    const { authUser } = useAuthContext();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`/api/users/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to load user profile");
                }
                const data = await response.json();
                setUserProfile(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex justify-center">
            <div className="card lg:card-side bg-base-100 shadow-xl w-full max-w-4xl">
                <figure className="lg:w-5/12 h-min p-8">
                    {/* Need to replace this with company logo */}
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                        alt="User Profile"
                        className="w-full h-auto object-contain rounded-full"
                    />
                </figure>
                <div className="card-body gap-4">
                    {/* Replace placeholders when Registration is done */}
                    <div className="flex flex-row justify-between items-center">
                        {/* <h2 className="card-title">{userProfile?.fullName || "Full Name"}</h2> */}
                        <h2 className="card-title">Company Name</h2>
                        {authUser?._id === id && (
                            <Link to="/" className="btn btn-link">Edit Public Profile</Link>
                        )}
                    </div>
                    {/* <div>
                        <p className="text-xs uppercase text-indigo-600">Username</p>
                        <p>{userProfile?.username || "username"}</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase text-indigo-600">Gender</p>
                        <p>{userProfile?.gender || "Prefer not to say"}</p>
                    </div> */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-indigo-900">Industry</h4>
                        <div className="flex flex-row gap-2">
                            <div className="badge bg-pink-200 border-pink-200 uppercase text-xs">Packaging</div>
                            <div className="badge bg-cyan-200 border-cyan-200 uppercase text-xs">B2B</div>
                            <div className="badge bg-purple-200 border-purple-200 uppercase text-xs">Wholesale</div>
                            <div className="badge bg-teal-200 border-teal-200 uppercase text-xs">Wholesale</div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-indigo-900 mb-2">Contact Details</h4>
                        <div className="flex flex-row gap-4 ">
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="text-xs uppercase text-indigo-600">Email</p>
                                <p>company@example.com</p>
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="text-xs uppercase text-indigo-600">Phone</p>
                                <p>+1 234 567 8901</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4 ">
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="text-xs uppercase text-indigo-600">Address</p>
                                <p>Scarborough, ON</p>
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="text-xs uppercase text-indigo-600">Socials</p>
                                <div className="flex flex-row gap-2">
                                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faLinkedin} size="lg" className="text-indigo-300 hover:text-indigo-600 transition-all duration-300" />
                                    </a>
                                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faSquareFacebook} size="lg" className="text-indigo-300 hover:text-indigo-600 transition-all duration-300" />
                                    </a>
                                    <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faSquareXTwitter} size="lg" className="text-indigo-300 hover:text-indigo-600 transition-all duration-300" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-indigo-900">Products</h4>
                        <div className="grid grid-cols-4 grid-flow-col gap-4">
                            <div className="rounded-lg border border-gray-100 shadow-sm flex flex-col gap-4 p-4">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                                    alt="User Profile"
                                    className="h-auto object-contain rounded-lg"
                                />
                                <h5>Product 1</h5>
                                <button onClick="" className="btn btn-primary">View</button>
                            </div>
                            <div className="rounded-lg border border-gray-100 shadow-sm flex flex-col gap-4 p-4">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                                    alt="User Profile"
                                    className="h-auto object-contain rounded-lg"
                                />
                                <h5>Product 2</h5>
                                <button onClick="" className="btn btn-primary">View</button>
                            </div>
                            <div className="rounded-lg border border-gray-100 shadow-sm flex flex-col gap-4 p-4">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                                    alt="User Profile"
                                    className="h-auto object-contain rounded-lg"
                                />
                                <h5>Product 3</h5>
                                <button onClick="" className="btn btn-primary">View</button>
                            </div>
                            <div className="rounded-lg border border-gray-100 shadow-sm flex flex-col gap-4 p-4">
                                <img
                                    src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                                    alt="User Profile"
                                    className="h-auto object-contain rounded-lg"
                                />
                                <h5>Product 4</h5>
                                <button onClick="" className="btn btn-primary">View</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
