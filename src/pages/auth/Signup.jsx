import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/auth/authSlices";

const Signup = () => {
	const [formData, setFormData] = useState("");
	const dispatch = useDispatch();
	const { loading, message, error } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			dispatch(signup(formData)).unwrap();
			setFormData("");
			navigate("/");
		} catch (err) {
			console.error("Error signing up: ", err);
		}
	};

	if (loading) return <div className=''>Loading...</div>;

	return (
		<div className=' max-w-2xl mx-auto'>
			<h1 className=' text-2xl font-bold m-3 text-center'>Signup</h1>
			<div className=''>
				<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
					<input
						type='text'
						className='border-2 p-3 rounded-lg'
						placeholder='Username'
						id='username'
						onChange={handleChange}
					/>
					<input
						type='email'
						className='border-2 p-3 rounded-lg'
						placeholder='Email'
						id='email'
						onChange={handleChange}
					/>
					<input
						type='password'
						className='border-2 p-3 rounded-lg'
						placeholder='Password'
						id='password'
						onChange={handleChange}
					/>
					<input
						type='password'
						className='border-2 p-3 rounded-lg'
						placeholder='Confirm Password'
						id='confirmPassword'
						onChange={handleChange}
					/>

					<button className=' bg-zinc-500 p-3 rounded-lg hover:opacity-90 text-white font-bold text-xl'>
						Signup
					</button>
				</form>
				<div className=' m-2'>
					<p>
						Already have an account?
						<Link
							className=' text-blue-600 px-2 hover:underline'
							to={"/signin"}
						>
							Sign In
						</Link>
						Instead
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
