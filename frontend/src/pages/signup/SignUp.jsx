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
		gender: "",
	});

	const { loading, signup } = useSignup();

	const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup(inputs);
	};

	return (
		<div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-white'>
				<h1 className='text-3xl font-semibold text-center text-gray-500'>
					Sign Up <span className='text-[#5A68D8]'>Bizlink</span> {/* Updated color for Bizlink */}
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-gray-500'>Full Name</span>
						</label>
						<input
							type='text'
							
							className='w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div>
						<label className='label p-2'>
							<span className='text-base label-text text-gray-500'>Username</span>
						</label>
						<input
							type='text'
					
							className='w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md'
							value={inputs.username}
							onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-gray-500'>Password</span>
						</label>
						<input
							type='password'
							placeholder=''
							className='w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text text-gray-500'>Confirm Password</span>
						</label>
						<input
							type='password'
							placeholder=''
							className='w-full input input-bordered h-10 bg-[#f0f0f0] text-gray-500 rounded-md'
							value={inputs.confirmPassword}
							onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
						/>
					</div>

					<GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

					<Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 bg-[#5A68D8] text-white' disabled={loading}>
							{loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
