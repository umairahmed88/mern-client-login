/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { signup } from "../../redux/auth/authSlices";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import GoogleAuth from "../../components/googleAuth/GoogleAuth";
import ForgotPassword from "../../components/forgotPassword/ForgotPassword";

const passwordRequirementsMessage =
	"Password is required and it must contain at least 8 characters, an uppercase letter, a lowercase letter, and a number";

const schema = yup.object().shape({
	username: yup.string().required("Username is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.required(passwordRequirementsMessage)
		.min(8, passwordRequirementsMessage)
		.matches(/[A-Z]/, passwordRequirementsMessage)
		.matches(/[a-z]/, passwordRequirementsMessage)
		.matches(/[0-9]/, passwordRequirementsMessage)
		.matches(/[!@#$%^&*(),.?":{}|<>]/, passwordRequirementsMessage),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Passwords must match")
		.required("Confirm password is required"),
});

const Signup = () => {
	const {
		loading,
		message: authMessage,
		error: authError,
	} = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [visible, setVisible] = useState(false);
	const [formData, setFormData] = useState({ avatar: "" });
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [filePerc, setFilePerc] = useState(0);

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if (file) {
			handleUploadFile(file);
		}
	}, [file]);

	useEffect(() => {
		console.log("formData:", formData);
	}, [formData]);

	const handleUploadFile = (file) => {
		if (file.size > 2 * 1024 * 1024) {
			setFileUploadError(true);
			toast.error("Image must be less than 2MB.");
			return;
		}
		setUploading(true);

		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setFilePerc(Math.round(progress));
			},
			(error) => {
				setFileUploadError(true);
				setUploading(false);
				toast.error("Error uploading image.");
			},
			async () => {
				const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
				setFormData((prevData) => ({ ...prevData, avatar: downloadUrl }));
				setValue("avatar", downloadUrl);
				setUploading(false);
				toast.success("Image uploaded.");
			}
		);
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmit = async (data) => {
		const completeData = { ...data, ...formData };
		try {
			const res = await dispatch(signup(completeData)).unwrap();
			if (res) {
				setFormData({});
				setFile(null);
				toast.success("Signup successful! Please verify your email.");
				navigate("/signin");
			}
		} catch (err) {
			console.error("Error during signup:", err);
		}
	};

	if (loading) return <div className=''>Loading...</div>;

	const handleRemoveImage = () => {
		setFormData({
			...formData,
			avatar: "",
		});
	};

	return (
		<div className=' max-w-lg mx-auto border border-t-0 shadow-md p-6 mt-12 rounded-lg'>
			<h1 className=' text-2xl font-bold m-3 text-center'>Signup</h1>
			<form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
				<input
					type='text'
					id='username'
					placeholder='Username'
					{...register("username")}
					onChange={handleChange}
					className='p-3 border-2 rounded-lg w-full border-zinc-300 text-gray-700 focus:outline-none focus:border-zinc-400'
				/>
				<p className='text-red-700'>{errors.username?.message}</p>

				<input
					type='email'
					id='email'
					placeholder='Email'
					{...register("email")}
					onChange={handleChange}
					className='p-3 border-2 rounded-lg w-full text-gray-700 border-zinc-300 focus:outline-none focus:border-zinc-400'
				/>
				<p className='text-red-700'>{errors.email?.message}</p>

				<div className='flex items-center border-2 border-zinc-300 rounded-lg p-3 focus-within:outline-none focus-within:border-zinc-400'>
					<input
						type={visible ? "text" : "password"}
						placeholder='Password'
						className='w-full border-none outline-none text-gray-700'
						id='password'
						{...register("password")}
						onChange={handleChange}
					/>
					<div
						onClick={() => setVisible(!visible)}
						className='cursor-pointer text-gray-600'
					>
						{visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
					</div>
				</div>
				<p className='text-red-700'>{errors.password?.message}</p>

				<div className='flex items-center border-2 border-zinc-300 rounded-lg p-3 focus-within:outline-none focus-within:border-zinc-400'>
					<input
						type={visible ? "text" : "password"}
						placeholder='Confirm Password'
						className='w-full border-none outline-none text-gray-700'
						id='confirmPassword'
						{...register("confirmPassword")}
						onChange={handleChange}
					/>
				</div>
				<p className='text-red-700'>{errors.confirmPassword?.message}</p>

				<div className='border-2 rounded-lg p-4 flex flex-col border-zinc-300 items-start'>
					<p className='text-center text-gray-700 mb-2'>
						Select a profile image
					</p>
					<input
						type='file'
						onChange={(e) => setFile(e.target.files[0])}
						accept='image/*'
						className='mb-3'
					/>
					<p className='text-sm text-gray-600'>
						{fileUploadError ? (
							<span className='text-red-700'>
								Error uploading image. Image must be less than 2MB.
							</span>
						) : filePerc > 0 && filePerc < 100 ? (
							<span>Uploading {filePerc}%</span>
						) : filePerc === 100 ? (
							<span className='text-green-600'>
								Image successfully uploaded!
							</span>
						) : (
							""
						)}
					</p>
					{file && (
						<div className='flex items-center gap-4'>
							<img
								src={formData.avatar}
								alt='Profile'
								className='h-24 w-24 rounded-full object-cover'
							/>
							<button
								type='button'
								onClick={handleRemoveImage}
								className='text-red-700 font-semibold hover:underline'
							>
								Delete
							</button>
						</div>
					)}
				</div>

				<button
					disabled={uploading || loading || (file && filePerc < 100)}
					className='w-full py-3 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-opacity disabled:opacity-75'
				>
					{loading ? "Signing up..." : "Sign Up"}
				</button>

				<GoogleAuth />
			</form>
			{authError && (
				<p className='text-red-700 mt-3 text-center'>{authError}</p>
			)}
			{authMessage && (
				<p className='text-green-600 mt-3 text-center'>{authMessage}</p>
			)}

			<ForgotPassword />

			<div className='flex justify-start mt-6 gap-2'>
				<p className='text-gray-700'>
					Already have an account?
					<Link className='text-indigo-600 hover:underline px-2' to='/signin'>
						Signin
					</Link>
					Instead.
				</p>
			</div>
		</div>
	);
};

export default Signup;
