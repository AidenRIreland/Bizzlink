import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const CreateProduct = () => {
    const [productName, setProductName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [price, setPrice] = useState("");
    const [productImage, setProductImage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setProductImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ productName, shortDescription, price, productImage }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create product");
            }

            const product = await response.json();
            toast.success("Product created successfully");
            navigate(`/product/${product._id}`);
        } catch (error) {
            console.error("Error creating product:", error.message);
            toast.error(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="card w-full max-w-3xl bg-base-100 shadow-xl p-8">
                <h2 className="card-title mb-4">Create Product</h2>
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
                            onChange={handleImageUpload}
                            className="mt-2"
                        />
                        {productImage && (
                            <img
                                src={productImage}
                                alt="Preview"
                                className="mt-4 max-h-48 object-contain"
                            />
                        )}
                    </div>
                    <div className="mt-4">
                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Create Product"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
