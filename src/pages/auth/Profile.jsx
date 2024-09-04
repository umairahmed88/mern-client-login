import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearError,
	clearMessage,
	signout,
	updateUser,
} from "../../redux/auth/authSlices";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useClearState } from "../../hooks/useClearState";
import { app } from "../../firebase";

const Profile = () => {
	const { currentUser, loading, message, error } = useSelector(
		(state) => state.auth
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const fileRef = useRef();

	const [formData, setFormData] = useState({});
	const [file, setFile] = useState(null);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [filePerc, setFilePerc] = useState(0);

	useClearState(dispatch, clearError, clearMessage);

	useEffect(() => {
		if (file) {
			handleUploadFile(file);
		}
	}, [file]);

	const handleUploadFile = (file) => {
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
				setFileUploadError(error);
			},
			async () => {
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
				dispatch(
					updateUser({
						id: currentUser.sanitizedUser.id,
						userData: { avatar: downloadURL },
					})
				);
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
			const res = await dispatch(
				updateUser({
					id: currentUser?.sanitizedUser.id,
					userData: formData,
				})
			).unwrap();

			if (res) {
				toast.success("Your profile is updated.");
			}
		} catch (err) {
			toast.error("Error updating profile.");
			console.error("Error updating: ", err);
		}
	};

	const handleSignout = async () => {
		try {
			const res = await dispatch(signout()).unwrap();

			if (res) {
				toast.success("Signed out.");
				navigate("/signin");
			}
		} catch (err) {
			console.error("Error signing out", err);
		}
	};

	if (loading) return <p>Loading...</p>;

	return (
		<div className=' max-w-2xl mx-auto p-2'>
			<h1 className=' text-2xl font-bold m-3 text-center'>Profile</h1>
			<div className=''>
				<div className=' flex justify-center items-center'>
					<img
						src={currentUser?.sanitizedUser.avatar}
						alt='profile image'
						className='rounded-full h-28 w-28 object-contain'
					/>
				</div>
				<p>
					Username:{" "}
					<span className='font-bold'>
						{currentUser?.sanitizedUser?.username}
					</span>
				</p>
				<p>
					Email:{" "}
					<span className='font-bold'>{currentUser?.sanitizedUser?.email}</span>
				</p>
			</div>
			<div className=' my-5'>
				<h1 className=' font-bold text-center m-2'>Update Your Profile</h1>
				<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
					<input
						type='file'
						accept='image/*'
						ref={fileRef}
						onChange={(e) => setFile(e.target.files[0])}
						hidden
					/>
					<img
						src={currentUser?.sanitizedUser?.avatar}
						alt='profile image'
						className=' rounded-full h-28 w-28 object-contain self-center cursor-pointer'
						onClick={() => fileRef.current.click()}
					/>
					<p>
						{fileUploadError ? (
							<span className=' text-red-700'>
								Error image upload (image must be less than 2 mb)
							</span>
						) : filePerc > 0 && filePerc < 100 ? (
							<span className=' text-zinc-900'>{`Uploading ${filePerc}%`}</span>
						) : filePerc === 100 ? (
							<span className=' text-green-600'>Profile Image Updated!</span>
						) : (
							""
						)}
					</p>
					<input
						type='text'
						className='border-2 rounded-lg p-3'
						id='username'
						onChange={handleChange}
						defaultValue={
							formData?.username || currentUser?.sanitizedUser?.username
						}
					/>
					<input
						type='email'
						className='border-2 rounded-lg p-3'
						id='email'
						onChange={handleChange}
						defaultValue={formData?.email || currentUser?.sanitizedUser?.email}
					/>
					<input
						type='text'
						className='border-2 rounded-lg p-3'
						id='username'
						onChange={handleChange}
						placeholder='Your Password...'
					/>
					<button
						disabled={loading}
						className='bg-zinc-600 p-3 rounded-lg hover:opacity-90 disabled:opacity-80'
					>
						{loading ? "Updating..." : "Update"}
					</button>
				</form>
				{error && <p className=' text-red-700'>{error}</p>}
				{message && <p className=' text-green-600'>{message}</p>}
			</div>
			<div className=' flex justify-end my-2'>
				<button
					className=' bg-red-700 hover:opacity-90 rounded-lg text-white p-3'
					onClick={handleSignout}
				>
					Signout
				</button>
			</div>
		</div>
	);
};

export default Profile;
