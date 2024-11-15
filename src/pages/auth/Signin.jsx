import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../redux/auth/authSlices";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import GoogleAuth from "../../components/googleAuth/GoogleAuth";
import ForgotPassword from "../../components/forgotPassword/ForgotPassword";

const Signin = () => {
	const {
		loading,
		message: authMessage,
		error: authError,
	} = useSelector((state) => state.auth);
	const [formData, setFormData] = useState("");
	const [visible, setVisible] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const res = await dispatch(signin(formData)).unwrap();

		if (res) {
			navigate("/profile");
		}
	};

	if (loading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	return (
		<div className=' max-w-2xl mx-auto p-2'>
			<h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
				Sign In
			</h1>
			<div className=''>
				<form className=' flex flex-col gap-3' onSubmit={handleSubmit}>
					<input
						type='email'
						id='email'
						placeholder='Email'
						className='p-3 rounded-lg border-2'
						onChange={handleChange}
					/>
					<input
						type='password'
						id='password'
						placeholder='Password'
						className='p-3 rounded-lg border-2'
						onChange={handleChange}
					/>
					<button
						disabled={loading}
						className='bg-zinc-500 p-3 rounded-lg font-bold text-white hover:opacity-90 disabled:opacity-80'
					>
						{loading ? "Signing In..." : "Signin"}
					</button>
					<GoogleAuth />
				</form>

				{authError && (
					<p className='text-red-600 mt-3 text-center'>{authError}</p>
				)}
				{authMessage && (
					<p className='text-green-600 mt-3 text-center'>{authMessage}</p>
				)}

				<ForgotPassword />
			</div>
			<div className=' m-2'>
				<p>
					Do not have an account?
					<Link className=' text-blue-600 px-2 hover:underline' to={"/signup"}>
						Sign Up
					</Link>
					first.
				</p>
			</div>
		</div>
	);
};

export default Signin;
