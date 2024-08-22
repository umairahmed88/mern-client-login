import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, signin } from "../../redux/auth/authSlices";
import { useClearState } from "../../hooks/useClearState";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
	const { loading, message, error } = useSelector((state) => state.auth);
	const [formData, setFormData] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useClearState(dispatch, clearError, clearMessage);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await dispatch(signin(formData)).unwrap();
			if (res) {
				navigate("/");
			}
			setFormData("");
		} catch (err) {
			console.error("Error signing in: ", err);
		}
	};

	if (loading) return <div className=''>Loading...</div>;

	return (
		<div className=' max-w-2xl mx-auto p-2'>
			<h1 className=' text-2xl font-bold m-3 text-center'>Signin</h1>
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
				</form>
				{error && <p className=' text-red-700'>{error}</p>}
				{message && <p className=' text-green-700'>{message}</p>}
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
