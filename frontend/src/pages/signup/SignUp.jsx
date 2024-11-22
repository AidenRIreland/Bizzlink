import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
	const [inputs, setInputs] = useState({
		fullName: "",
		username: "",
		password: "",
		confirmPassword: "",
		email: "",
		phone: "",
		companyName: "",
		industry: "",
		address: "",
		socialLinks: "",
		businessLogo: "",
		gender: "",
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Inputs sent to signup:", inputs);
		await signup(inputs);
	};
	

	return (
		<div className="flex flex-col items-center justify-center min-w-96 mx-auto">
			<div className="w-full p-6 rounded-lg shadow-md bg-white">
				<h1 className="text-3xl font-semibold text-center text-gray-500">
					Sign Up <span className="text-[#5A68D8]">Bizlink</span>
				</h1>

				<form onSubmit={handleSubmit}>
					{/* Full Name */}
					<div>
						<label className="label p-2">
							<span className="text-base label-text text-gray-500">Full Name</span>
						</label>
						<input
							type="text"
							className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					{/* Email */}
					<div>
						<label className="label p-2">
							<span className="text-base label-text text-gray-500">Email</span>
						</label>
						<input
							type="email"
							className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
							value={inputs.email}
							onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
						/>
					</div>

					{/* Username */}
					<div>
						<label className="label p-2">
							<span className="text-base label-text text-gray-500">Username</span>
						</label>
						<input
							type="text"
							className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					{/* Password */}
					<div>
						<label className="label">
							<span className="text-base label-text text-gray-500">Password</span>
						</label>
						<input
							type="password"
							className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					{/* Confirm Password */}
					<div>
						<label className="label">
							<span className="text-base label-text text-gray-500">Confirm Password</span>
						</label>
						<input
							type="password"
							className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					{/* Phone */}
					<div>
						<label className="label p-2">
							<span className="text-base label-text text-gray-500">Phone</span>
						</label>
						<input
							type="text"
							className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
							value={inputs.phone}
							onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
						/>
					</div>

					{/* Company Name */}
					<div>
						<label className="label p-2">
							<span className="text-base label-text text-gray-500">Company Name</span>
						</label>
						<input
							type="text"
							className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
							value={inputs.companyName}
							onChange={(e) => setInputs({ ...inputs, companyName: e.target.value })}
						/>
					</div>

					{/* Industry */}
					<div>
						<label className="label p-2">
							<span className="text-base label-text text-gray-500">Industry</span>
						</label>
						<input
							type="text"
							className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
							value={inputs.industry}
							onChange={(e) => setInputs({ ...inputs, industry: e.target.value })}
						/>
					</div>

					{/* Address */}
					<div>
						<label className="label p-2">
							<span className="text-base label-text text-gray-500">Address</span>
						</label>
						<input
							type="text"
							className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
							value={inputs.address}
							onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
						/>
					</div>

					{/* Social Links */}
					<div>
						<label className="label p-2">
							<span className="text-base label-text text-gray-500">Social Links</span>
						</label>
						<input
							type="text"
							placeholder="Comma-separated URLs"
							className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
							value={inputs.socialLinks}
							onChange={(e) => setInputs({ ...inputs, socialLinks: e.target.value })}
						/>
					</div>

					{/* Business Logo */}
					<div>
						<label className="label p-2">
							<span className="text-base label-text text-gray-500">Business Logo</span>
						</label>
						<input
							type="text"
							placeholder="URL to business logo"
							className="w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md"
							value={inputs.businessLogo}
							onChange={(e) => setInputs({ ...inputs, businessLogo: e.target.value })}
						/>
					</div>

					{/* Gender */}
					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link to={"/login"} className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
						Already have an account?
					</Link>

					<div>
						<button className="btn btn-block btn-sm mt-2 bg-[#5A68D8] text-white" disabled={loading}>
							{loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
