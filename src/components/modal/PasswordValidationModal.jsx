import { useState } from "react";

const PasswordValidationModal = ({ isOpen, onClose, onConfirm }) => {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleConfirm = async () => {
		setIsSubmitting(true);
		setError("");

		try {
			// Simulate password validation
			const isValid = await onConfirm(password);
			if (!isValid) {
				setError("Invalid password. Please try again.");
				setIsSubmitting(false);
				return;
			}

			// Close the modal on successful validation
			onClose();
		} catch (err) {
			setError("An error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-10 flex justify-center items-center z-50'>
			<div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
				<p className='mb-4'>
					Please enter your password to proceed with the update.
				</p>
				<input
					type='password'
					placeholder='Enter your password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='w-full p-2 border border-gray-300 rounded-md mb-2'
				/>
				{error && <p className='text-red-600 text-sm mb-2'>{error}</p>}
				<div className='flex justify-end gap-4'>
					<button
						onClick={onClose}
						className='bg-gray-300 text-black p-2 rounded-md'
						disabled={isSubmitting}
					>
						Cancel
					</button>
					<button
						onClick={handleConfirm}
						className='bg-red-800 text-white p-2 rounded-md hover:opacity-90'
						disabled={isSubmitting}
					>
						{isSubmitting ? "Validating..." : "Confirm"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default PasswordValidationModal;
