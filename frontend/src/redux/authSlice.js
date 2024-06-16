/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	user: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async (userData, thunkAPI) => {
		try {
			const response = await axios.post("http://localhost:8000/", userData);
			return response.data;
		} catch (error) {
			const message = error.response?.data?.message || error.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async (credentials, thunkAPI) => {
		try {
			const response = await axios.post(
				"http://localhost:8000/login",
				credentials
			);
			return response.data;
		} catch (error) {
			const message = error.response?.data?.message || error.message;
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const getMe = createAsyncThunk("auth/getMe", async (_, thunkAPI) => {
	try {
		const response = await axios.get("http://localhost:8000/me");
		return response.data;
	} catch (error) {
		const message = error.response?.data?.message || error.message;
		return thunkAPI.rejectWithValue(message);
	}
});

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
	await axios.delete("http://localhost:8000/logout");
	return null;
});

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.isLoading = false;
			state.isSuccess = true;
			state.isError = false;
			state.message = "Login successful!";
		},
		reset: (state) => {
			state.user = null;
			state.isLoading = false;
			state.isSuccess = false;
			state.isError = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
				state.isSuccess = false;
				state.message = "";
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
				state.isSuccess = false;
				state.isError = false;
				state.message = "";
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(logoutUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.isLoading = false;
				state.user = null;
				state.isSuccess = true;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getMe.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMe.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(getMe.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { setUser, reset } = authSlice.actions;
export default authSlice.reducer;
