import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../../redux/auth/authSlices";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	confirmPasswordValidator,
	passwordValidator,
} from "../../hooks/PasswordValidators/PasswordValidators";

const schema = yup.object().shape({
	password: passwordValidator,
	confirmPassword: confirmPasswordValidator("password"),
});

const ResetPassword = () => {
	const { message: authMessage, error: authError } = useSelector(
		(state) => state.auth
	);

	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const query = new URLSearchParams(useLocation().search);
	const token = query.get("token");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		if (newPassword !== confirmNewPassword) {
			return;
		}

		try {
			setLoading(true);
			const res = await dispatch(
				resetPassword({
					token,
					newPassword: data.newPassword,
					confirmNewPassword,
				})
			).unwrap();

			navigate("/signin");
		} catch (err) {
			toast.error(err?.message || "Error resetting password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
				<h2 className='text-2xl font-semibold text-gray-700 text-center'>
					Reset Password
				</h2>

				<form onSubmit={handleSubmit(onSubmit)} className='mt-6'>
					<div className='mb-4'>
						<label
							htmlFor='new-password'
							className='block text-sm font-medium text-gray-700'
						>
							New Password
						</label>
						<input
							type='password'
							id='new-password'
							{...register("password")}
							className={`mt-1 block w-full px-3 py-2 border ${
								errors.password ? "border-red-500" : "border-gray-300"
							} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
							placeholder='Enter new password'
						/>
					</div>

					<div className='mb-6'>
						<label
							htmlFor='confirm-new-password'
							className='block text-sm font-medium text-gray-700'
						>
							Confirm New Password
						</label>
						<input
							type='password'
							id='confirm-new-password'
							{...register("confirmPassword")}
							className={`mt-1 block w-full px-3 py-2 border ${
								errors.confirmPassword ? "border-red-500" : "border-gray-300"
							} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
							placeholder='Confirm new password'
						/>
					</div>

					<button
						type='submit'
						disabled={loading}
						className={`w-full py-2 px-4 rounded-md text-white ${
							loading
								? "bg-gray-400 cursor-not-allowed"
								: "bg-zinc-600 hover:opacity-90"
						}`}
					>
						{loading ? "Resetting..." : "Reset Password"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
