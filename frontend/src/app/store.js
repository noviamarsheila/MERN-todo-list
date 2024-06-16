import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/authSlice";
import todoReducer from "../redux/todoSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		todo: todoReducer,
	},
});
