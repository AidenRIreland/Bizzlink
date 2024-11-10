import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const { authUser } = useAuthContext();
	const location = useLocation();
	const noNavbarRoutes = ["/login", "/signup"];
	const justifyClass = noNavbarRoutes.includes(location.pathname) ? "justify-center" : "justify-start";

	return (
		<div className={`p-4 h-screen flex flex-col items-center ${justifyClass}`}>
			{!noNavbarRoutes.includes(location.pathname) && <Navbar />}
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
