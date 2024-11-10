import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { loading, logout } = useLogout();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar bg-base-100 shadow-md mb-12 lg:mb-16 rounded-lg">
            <div className="flex-1">
                <Link to="/">
                    <img src="/bizlink-horizontal.jpeg" alt="BizLink" class="h-14 p-4" />
                </Link>
            </div>
            <div className="flex-none hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    <li>
                        <button
                            onClick={() => navigateTo("/")}
                            className={`btn btn-ghost min-h-0 h-auto ${location.pathname === "/" ? "bg-indigo-100 text-indigo-600" : ""}`}
                        >
                            Messages
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => navigateTo("/about")}
                            className={`btn btn-ghost min-h-0 h-auto ${location.pathname === "/about" ? "bg-indigo-100 text-indigo-600" : ""}`}
                        >
                            My Account
                        </button>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="btn btn-ghost min-h-0 h-auto" disabled={loading}>
                            {loading ? "Logging out..." : "Logout"}
                        </button>
                    </li>
                </ul>
            </div>
            <div className="flex-none lg:hidden">
                <button className="btn btn-square btn-ghost" onClick={toggleMenu}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </div>
            {menuOpen && (
                <div className="absolute top-16 right-0 bg-base-100 shadow-lg rounded-box w-48 p-2 z-50 lg:hidden">
                    <ul className="menu menu-vertical">
                        <li>
                            <button
                                onClick={() => navigateTo("/")}
                                className={`btn btn-ghost min-h-0 h-auto ${location.pathname === "/" ? "bg-indigo-100 text-indigo-600" : ""}`}
                            >
                                Messages
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => navigateTo("/about")}
                                className={`btn btn-ghost min-h-0 h-auto ${location.pathname === "/about" ? "bg-indigo-100 text-indigo-600" : ""}`}
                            >
                                My Account
                            </button>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="btn btn-ghost min-h-0 h-auto" disabled={loading}>
                                {loading ? "Logging out..." : "Logout"}
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
