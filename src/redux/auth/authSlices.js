import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REHYDRATE } from "redux-persist/es/constants";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { getAuthToken } from "../../hooks/getAuthToken/GetAuthToken";

const API_URL = "https://ua-mern-api.vercel.app/api/v1/auth";

export const signup = createAsyncThunk(
	"auth/signup",
	async (userData, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${API_URL}/signup`, userData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(response.data);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const signin = createAsyncThunk(
	"auth/signin",
	async (userData, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${API_URL}/signin`, userData, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(response.data);
			return response.data;
		} catch (err) {
			return rejectWithValue(
				err.response ? err.response.data : err.response.message
			);
		}
	}
);

export const googleAuth = createAsyncThunk(
	"auth/googleAuth",
	async (googleUserData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${API_URL}/signin-google`,
				googleUserData,
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const forgotPassword = createAsyncThunk(
	"auth/forgotPassword",
	async ({ email }, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${API_URL}/forgot-password`,
				{ email },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const resetPassword = createAsyncThunk(
	"auth/resetPassword",
	async ({ token, newPassword, confirmNewPassword }, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${API_URL}/reset-password?token=${token}`,
				{ newPassword, confirmNewPassword },
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const updateUser = createAsyncThunk(
	"auth/updateUser",
	async ({ id, userData }, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });
			const response = await axios.put(
				`${API_URL}/update-user/${id}`,
				userData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response.data);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const signout = createAsyncThunk(
	"auth/signout",
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.currentUser.sanitizedUser.token;
			const response = await axios.post(
				`${API_URL}/signout`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response.data);
			return response.data;
		} catch (err) {
			return rejectWithValue(
				err.response ? err.response.data : err.response.message
			);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: {
		currentUser: null,
		loading: false,
		message: null,
		error: null,
	},
	reducers: {
		clearMessage: (state) => {
			state.message = null;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(REHYDRATE, (state, action) => {
				if (action.payload && action.payload.auth) {
					return {
						...state,
						...action.payload.auth,
					};
				}
			})
			.addCase(signup.pending, (state) => {
				state.loading = true;
				state.message = null;
				state.error = null;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.loading = false;
				state.message = action.payload.message;
			})
			.addCase(signup.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message || "An error occurred, signup failed";
			})
			.addCase(signin.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(signin.fulfilled, (state, action) => {
				state.loading = false;
				state.currentUser = action.payload || action.payload.auth;
				state.message = action.payload.message;
			})
			.addCase(signin.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message || "An error occurred while signing in";
			})
			.addCase(forgotPassword.pending, (state) => {
				state.loading = true;
				state.message = null;
				state.error = null;
			})
			.addCase(forgotPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.message = action.payload.message;
			})
			.addCase(forgotPassword.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message ||
					"An error occurred while reset the password";
			})
			.addCase(resetPassword.pending, (state) => {
				state.loading = true;
				state.message = null;
				state.error = null;
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.loading = false;
				state.message = action.payload.message;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message ||
					"An error occurred while resetting the password";
			})
			.addCase(googleAuth.pending, (state) => {
				state.loading = true;
				state.message = null;
				state.error = null;
			})
			.addCase(googleAuth.fulfilled, (state, action) => {
				state.loading = false;
				state.currentUser = action.payload || action.payload.auth;
				state.message = action.payload.message;
			})
			.addCase(googleAuth.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message;
			})
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false;
				state.message = action.payload.message;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message || "An error occurred while updating";
			})
			.addCase(signout.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(signout.fulfilled, (state, action) => {
				state.loading = false;
				state.currentUser = null;
				state.message = action.payload.message;
			})
			.addCase(signout.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message || "An error occurred while updating";
			});
	},
});

export const { clearMessage, clearError } = authSlice.actions;

export default persistReducer(
	{
		key: "auth",
		storage,
	},
	authSlice.reducer
);
