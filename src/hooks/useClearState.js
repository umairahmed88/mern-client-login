import { useEffect } from "react";

export const useClearState = (dispatch, clearError, clearMessage) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(clearError()), dispatch(clearMessage());
		}, 4000);

		return () => clearTimeout(timer);
	}, [dispatch, clearError, clearMessage]);
};
