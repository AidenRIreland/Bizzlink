import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

const EditProduct = () => {
    const { id } = useParams();
    const { authUser } = useAuthContext();
    const navigate = useNavigate();
    const [productName, setProductName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [price, setPrice] = useState("");
    const [productImage, setProductImage] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch product details
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
                const product = await response.json();
                setProductName(product.productName);
                setShortDescription(product.shortDescription);
                setPrice(product.price);
                setProductImage(product.productImage);
            } catch (error) {
                console.error(error.message);
                toast.error("Failed to load product details");
            }
        };

        fetchProduct();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ productName, shortDescription, price, productImage }),
            });

            if (!response.ok) {
                throw new Error("Failed to update product");
            }

            toast.success("Product updated successfully");
            navigate(`/publicprofile/${authUser._id}`);
        } catch (error) {
            console.error(error.message);
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 justify-center">
            <Link to={`/publicprofile/${authUser._id}`} className="text-white underline">
                Back to Profile
            </Link>
            <div className="card w-full max-w-3xl bg-base-100 shadow-xl p-8">
                <h2 className="card-title mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="label text-sm font-bold text-gray-700">Product Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="label text-sm font-bold text-gray-700">Short Description</label>
                        <textarea
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            className="textarea textarea-bordered w-full"
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className="label text-sm font-bold text-gray-700">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div>
                        <label className="label text-sm font-bold text-gray-700">Product Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setProductImage(reader.result);
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="mt-2"
                        />
                        {productImage && (
                            <img src={productImage} alt="Preview" className="mt-4 max-h-48 object-contain" />
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-full"
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
