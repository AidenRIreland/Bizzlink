import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PublicProfile = () => {
    const { id } = useParams();
    const { authUser } = useAuthContext();
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [products, setProducts] = useState([]);
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

    useEffect(() => {
        const fetchUserProducts = async () => {
            try {
                const response = await fetch(`/api/products/user/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user products");
                }

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching user products:", error.message);
                toast.error("Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProducts();
    }, [id]);
    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete product");
            }

            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
            toast.success("Product deleted successfully");
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to delete product");
        }
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="flex justify-center">
            <div className="card lg:card-side bg-base-100 shadow-xl w-full max-w-4xl">
                <div className="lg:w-[250px] flex-shrink-0 p-8">
                    <figure>
                        <img
                            src={userProfile?.businessLogo || "https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"}
                            alt="User Profile"
                            className="w-full h-auto object-cover rounded-full border-2 border-gray-200"
                        />
                    </figure>
                </div>
                <div className="card-body gap-4">
                    {/* Replace placeholders when Registration is done */}
                    <div className="flex flex-row justify-between items-center">
                        {/* <h2 className="card-title">{userProfile?.fullName || "Full Name"}</h2> */}
                        <h2 className="card-title">{userProfile?.companyName || "Company Name"}</h2>
                        {authUser?._id === id && (
                            <Link to={`/editprofile/${id}`} className="btn btn-link">Edit Public Profile</Link>
                        )}
                    </div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-indigo-900">Industry</h4>
                        <div className="flex flex-row gap-2">
                            {userProfile?.industry.map((tag, index) => (
                                <div key={index} className="badge bg-pink-200 border-pink-200 uppercase text-xs">
                                    {tag}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-indigo-900 mb-2">Contact Details</h4>
                        <div className="flex flex-row gap-4 ">
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="text-xs uppercase text-indigo-600">Email</p>
                                <p>{userProfile?.email || "company@example.com"}</p>
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="text-xs uppercase text-indigo-600">Phone</p>
                                <p>{userProfile?.phone || "+1 234 567 8901"}</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4 ">
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="text-xs uppercase text-indigo-600">Address</p>
                                <p>{userProfile?.address || "Scarborough, ON"}</p>
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <p className="text-xs uppercase text-indigo-600">Socials</p>
                                <div className="flex flex-col gap-1">
                                    {userProfile?.socialLinks.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-indigo-600 hover:underline hover:text-indigo-800 transition-all duration-300"
                                        >
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between items-center">
                            <h4 className="text-indigo-900">Products</h4>
                            {authUser?._id === id && (
                                <Link to="/create-product" className="btn btn-link">Add New Product</Link>
                            )}
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="rounded-lg border border-gray-100 shadow-sm flex flex-col gap-4 p-4"
                                    style={{ minHeight: "320px" }}
                                >
                                    <div className="aspect-[1/1] overflow-hidden rounded-lg">
                                        <img
                                            src={product.productImage}
                                            alt={product.productName}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-row justify-between items-start">
                                        <h5 className="text-lg font-semibold">{product.productName}</h5>
                                        <h5 className="text-lg font-semibold">${product.price}</h5>
                                    </div>
                                    <p className="text-gray-400 text-sm">
                                        {product.shortDescription}
                                    </p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => navigate(`/edit-product/${product._id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button className="btn btn-error" onClick={() => handleDeleteProduct(product._id)}>
                                        Delete
                                    </button>
                                </div>
                            ))}
                            {products.length === 1 && (
                                <div
                                    className="rounded-lg border border-gray-100 shadow-sm flex flex-col gap-4 p-4 opacity-0 pointer-events-none"
                                >
                                    {/* Placeholder to maintain the grid layout */}
                                </div>
                            )}
                            {products.length === 0 && (
                                <p className="text-gray-400 col-span-full">
                                    This user has not created any products yet.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfile;
