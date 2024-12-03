import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchFilterPage = () => {
    const [users, setUsers] = useState([]); // All users fetched from the database
    const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users based on search query
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch users from the database
    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/users"); // Adjust this endpoint to match your backend
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            setUsers(data);
            setFilteredUsers(data); // Initially, all users are shown
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle the search query input and filter users
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = users.filter(user =>
            user.fullName.toLowerCase().includes(query) ||
            user.industry.some(industry => industry.toLowerCase().includes(query)) // Match industry
        );
        setFilteredUsers(filtered);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-8 text-gray-800">
            <h1 className="text-4xl font-bold mb-6">Search and Filter Page</h1>
            <div className="mb-8">
                <label htmlFor="search" className="block text-lg font-medium mb-2">
                    Search by Name or Industry:
                </label>
                <input
                    type="text"
                    id="search"
                    placeholder="Search for users..."
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={searchQuery}
                    onChange={handleSearch} // Trigger filtering on input change
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map(user => (
                    <div
                        key={user._id}
                        className="p-4 border border-gray-300 rounded-lg shadow-md flex flex-col items-center bg-white"
                    >
                        <img
                            src={user.profilePic}
                            alt={`${user.fullName}'s profile`}
                            className="w-24 h-24 rounded-full mb-4"
                        />
                        <h2 className="text-xl font-semibold">{user.fullName}</h2>
                        <p className="text-gray-600 mb-2">{user.companyName}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {user.industry.map((industry, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 text-sm bg-blue-200 text-blue-700 rounded-full"
                                >
                                    {industry}
                                </span>
                            ))}
                        </div>
                        <Link
                            to={`/publicprofile/${user._id}`}
                            className="text-blue-500 underline mt-4"
                        >
                            View Profile
                        </Link>
                    </div>
                ))}
                {filteredUsers.length === 0 && (
                    <p className="text-center text-gray-500">No users found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchFilterPage;
