/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { toast } from "react-toastify";
import { signout, updateUser } from "../../redux/auth/authSlices";
import { useNavigate } from "react-router-dom";
import PasswordValidationModal from "../../components/modal/PasswordValidationModal";
import { useFormSetup } from "../../hooks/useFormSetup/useFormSetup";
import ConfirmationModal from "../../components/modal/ConfirmationModal";

const Profile = () => {
	const { currentUser, loading } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const fileRef = useRef();
	const [formData, setFormData] = useState({});
	const [file, setFile] = useState(null);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [filePerc, setFilePerc] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);

	const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
	const [emailToUpdate, setEmailToUpdate] = useState("");

	const { avatar, username, email, id } = currentUser?.sanitizedUser || {};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormSetup("profile");

	useEffect(() => {
		if (file) {
			handleUploadFile(file);
		}
	}, [file]);

	const handleUploadFile = (file) => {
		if (file.size > 2 * 1024 * 1024) {
			setFileUploadError(true);
			toast.error("Image must be less than 2MB.");
			return;
		}

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
				if (progress > 0 && progress < 100) {
					toast.info(`Uploading ${Math.round(progress)}%`);
				}
			},
			(error) => {
				setFileUploadError(true);
				toast.error("Error during image upload. (Image must be less than 2MB)");
			},
			async () => {
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
				dispatch(
					updateUser({
						id,
						userData: { avatar: downloadURL },
					})
				);
				toast.success("Profile Image Updated!");
				setFile(null);
				setFilePerc(0);
			}
		);
	};

	const handlePasswordValidation = async (password) => {
		try {
			// Simulate password validation (replace with actual dispatch/API call)
			const isValid = await dispatch(signout({ password })).unwrap();
			if (isValid) {
				// Proceed to update email after successful password validation
				await dispatch(
					updateUser({
						id,
						userData: { email: emailToUpdate },
					})
				).unwrap();
				toast.success("Email updated successfully!");
				setPasswordModalOpen(false);
			} else {
				toast.error("Invalid password. Please try again.");
			}
		} catch (err) {
			toast.error("Error validating password. Please try again.");
		}
	};

	const onSubmit = async (data) => {
		const isEmailUpdated = data.email && data.email !== email;

		try {
			const res = await dispatch(
				updateUser({
					id,
					userData: data,
				})
			).unwrap();

			if (res) {
				setFormData({});

				if (isEmailUpdated) {
					await dispatch(signout()).unwrap();
					navigate("/signin");
				}
			}
		} catch (err) {
			console.error("Error updating profile:", err);
		}
	};

	const handleSignout = async () => {
		try {
			const res = await dispatch(signout()).unwrap();

			if (res) {
				navigate("/signin");
			}
		} catch (err) {
			console.error("Error signing out", err);
		}
	};

	const toggleModal = () => {
		setIsModalOpen((prev) => !prev);
	};

	const toggleUpdateForm = () => {
		setShowUpdateForm((prev) => !prev);
	};

	if (loading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	return (
		<div className=' max-w-lg mx-auto border border-t-0 shadow-md p-6 mt-12 rounded-lg'>
			<h1 className='text-3xl font-bold mb-6 text-center'>Profile</h1>
			{!showUpdateForm ? (
				// Display Profile Information
				<>
					<div className='flex flex-col items-center gap-4'>
						<div className='flex justify-center'>
							<img
								src={avatar}
								className='h-28 w-28 rounded-3xl object-cover border-2 shadow-lg'
								alt='profile picture'
							/>
						</div>
						<p className='text-lg text-left w-full pl-6'>
							Username:{" "}
							<span className='font-semibold text-gray-700'>{username}</span>
						</p>
						<p className='text-lg text-left w-full pl-6'>
							Email:{" "}
							<span className='font-semibold text-gray-700'>{email}</span>
						</p>
					</div>
					<div className=' flex justify-end'>
						<button
							className='bg-zinc-800 my-6 text-white py-3 px-6 rounded-lg hover:bg-zinc-700 transition-all'
							onClick={toggleUpdateForm}
						>
							Update
						</button>
					</div>
				</>
			) : (
				// Display Update Form when toggled
				<div className='my-8'>
					<h2 className='text-2xl font-semibold mb-4 text-center'>
						Update Profile
					</h2>
					<form
						className='flex flex-col gap-3'
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='flex justify-center'>
							<input
								type='file'
								accept='image/*'
								ref={fileRef}
								onChange={(e) => setFile(e.target.files[0])}
								hidden
							/>
							<img
								src={formData.avatar || avatar}
								className='h-28 w-28 rounded-full object-cover border-2 border-gray-300 shadow-lg cursor-pointer'
								alt='profile update picture'
								onClick={() => fileRef.current.click()}
							/>
						</div>
						{fileUploadError && (
							<p className='text-red-600'>Image must be less than 2MB.</p>
						)}

						<input
							type='text'
							id='username'
							defaultValue={formData.username || username}
							className='border-2 border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:border-indigo-500 focus:outline-none'
							placeholder='Update Username'
							{...register("username")}
						/>
						<p className='text-red-600'>{errors.username?.message}</p>

						<input
							type='email'
							id='email'
							defaultValue={formData.email || email}
							className='border-2 border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:border-indigo-500 focus:outline-none'
							placeholder='Update Email'
							{...register("email")}
							onBlur={(e) => {
								if (e.target.value !== email) {
									setEmailToUpdate(e.target.value);
									setPasswordModalOpen(true);
								}
							}}
						/>
						<p className='text-red-600'>{errors.email?.message}</p>

						<input
							type='password'
							id='password'
							placeholder='Update Password'
							className='border-2 border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:border-indigo-500 focus:outline-none'
							{...register("password")}
						/>
						<p className='text-red-600'>{errors.password?.message}</p>

						<input
							type='password'
							id='confirmPassword'
							placeholder='Confirm Password'
							className='border-2 border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:border-indigo-500 focus:outline-none'
							{...register("confirmPassword")}
						/>
						<p className='text-red-600'>{errors.confirmPassword?.message}</p>

						<div className='flex justify-between'>
							<button
								className='bg-zinc-800 text-white py-3 px-6 rounded-lg hover:bg-zinc-600 transition-all disabled:opacity-80'
								disabled={loading}
							>
								{loading ? "Updating..." : "Update"}
							</button>
							<button
								type='button'
								className='bg-red-700 text-white py-3 px-6 rounded-lg hover:bg-red-500 transition-all'
								onClick={toggleUpdateForm}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}
			<div className='flex justify-end'>
				<button
					onClick={toggleModal}
					className='bg-red-700 text-white py-3 px-6 rounded-lg hover:opacity-90 transition-all disabled:opacity-80'
				>
					Signout
				</button>
				<ConfirmationModal
					isOpen={isModalOpen}
					title='Confirm Signout'
					message='Are you sure you want to signout?'
					onClose={toggleModal}
					onConfirm={() => {
						toggleModal();
						handleSignout();
					}}
				/>
			</div>
			<PasswordValidationModal
				isOpen={isPasswordModalOpen}
				onClose={() => setPasswordModalOpen(false)}
				onConfirm={handlePasswordValidation}
			/>
		</div>
	);
};

export default Profile;
