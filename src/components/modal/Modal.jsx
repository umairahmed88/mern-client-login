import { useEffect } from "react";

const ConfirmationModal = ({ title, message, isOpen, onClose, onConfirm }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
				<h2 className='text-xl font-bold mb-4'>{title}</h2>
				<p className='mb-4'>{message}</p>
				<div className='flex justify-end gap-4'>
					<button
						onClick={onClose}
						className='bg-gray-300 text-black p-2 rounded-md'
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className='bg-red-600 text-white p-2 rounded-md'
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
