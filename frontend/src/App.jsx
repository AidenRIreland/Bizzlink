import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Navbar from "./components/Navbar";
import AccountDashboard from "./pages/AccountDashboard";
import AccountUpdate from "./pages/AccountUpdate";
import PublicProfile from "./pages/PublicProfile";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const { authUser } = useAuthContext();
	const location = useLocation();
	const noNavbarRoutes = ["/login", "/signup"];
	const justifyClass = noNavbarRoutes.includes(location.pathname) ? "justify-center" : "justify-start";

	return (
		<div className={`p-4 pb-16 flex flex-col items-center ${justifyClass}`}>
			{!noNavbarRoutes.includes(location.pathname) && <Navbar />}
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
				<Route path='/myaccount' element={authUser ? <AccountDashboard /> : <Navigate to={"/login"} />} />
				<Route path='/updateaccount' element={authUser ? <AccountUpdate /> : <Navigate to={"/login"} />} />
				<Route path='/publicprofile/:id' element={<PublicProfile />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
