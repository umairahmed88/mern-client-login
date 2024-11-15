import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
	clearError as clearAuthError,
	clearMessage as clearAuthMessage,
} from "../redux/auth/authSlices";

export const useClearState = () => {
	const dispatch = useDispatch();
	const prevState = useRef({});

	const { error: authError, message: authMessage } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		const slices = [
			{
				name: "auth",
				error: authError,
				message: authMessage,
				clearError: () => dispatch(clearAuthError()),
				clearMessage: () => dispatch(clearAuthMessage()),
			},
		];

		slices.forEach(({ name, error, message, clearError, clearMessage }) => {
			if (error && error !== prevState.current[`${name}Error`]) {
				toast.error(error, { toastId: `${name}Error` });
				clearError();
				prevState.current[`${name}Error`] = error;
			}

			if (message && message !== prevState.current[`${name}Message`]) {
				toast.success(message, { toastId: `${name}Message` });
				clearMessage();
				prevState.current[`${name}Message`] = message;
			}
		});

		const timer = setTimeout(() => {
			prevState.current = {};
		}, 4000);

		return () => clearTimeout(timer);
	}, [dispatch, authError, authMessage]);
};
