import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, signup } from "../../redux/auth/authSlices";
import { useClearState } from "../../hooks/useClearState";
import { toast } from "react-toastify";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const Signup = () => {
	const { loading, message, error } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState("");
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [filePerc, setFilePerc] = useState(0);

	useEffect(() => {
		if (file) {
			handleUploadFile(file);
		}
	}, [file]);

	useClearState(dispatch, clearError, clearMessage);

	const handleUploadFile = (file) => {
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
				toast.error("Error uploading image");
				toast.error(error);
			},
			async () => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setFormData({ ...formData, avatar: downloadURL });
					setUploading(false);
					toast.success("Image uploaded");
				});
			}
		);
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await dispatch(signup(formData)).unwrap();
			if (res) {
				navigate("/signin");
			}
			setFormData("");
		} catch (err) {
			toast.error("Error signing up.", err);
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
					<div className=' border-2 p-2 flex flex-col'>
						<p className=' text-center'>Select profile image</p>
						<div className=''>
							<input
								type='file'
								onChange={(e) => setFile(e.target.files[0])}
								accept='image/*'
								required
							/>
							<p>
								{fileUploadError ? (
									<span className=' text-red-700'>
										Error uploading image(image must be less than 2 mb)
									</span>
								) : filePerc > 0 && filePerc < 100 ? (
									<span>{`Uploading ${filePerc}%`}</span>
								) : filePerc === 100 ? (
									<span>Image successfully uploaded!</span>
								) : (
									""
								)}
							</p>
						</div>
						{file && (
							<div className=' flex justify-between items-center'>
								<img
									src={formData.avatar}
									alt={formData.username}
									className='h-24 w-24 rounded-full object-contain self-center'
								/>
								<button
									onClick={handleRemoveImage}
									className=' text-red-700 p-3 rounded-lg uppercase'
								>
									Delete
								</button>
							</div>
						)}
					</div>

					<button
						disabled={loading || uploading}
						className=' bg-zinc-500 p-3 rounded-lg hover:opacity-90 disabled:opacity-80 text-white font-bold text-xl'
					>
						{loading ? "Signing up..." : "Signup"}
					</button>
					{error && <p className=' text-red-700'>{error}</p>}
					{message && <p className=' text-green-700'>{message}</p>}
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
