export const getAuthToken = (getState, rejectWithValue) => {
	const { currentUser } = getState().auth;

	if (!currentUser) {
		return rejectWithValue({
			message: "Please login or signup first to continue.",
		});
	}

	return currentUser.sanitizedUser.token;
};
