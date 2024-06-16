/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	todos: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

const apiUrl = "http://localhost:8000/todos";

export const getTodos = createAsyncThunk(
	"todo/getTodos",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get(apiUrl);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const createTodo = createAsyncThunk(
	"todo/createTodo",
	async (todo, thunkAPI) => {
		try {
			const response = await axios.post(apiUrl, todo);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const updateTodo = createAsyncThunk(
	"todo/updateTodo",
	async ({ uuid, todo }, thunkAPI) => {
		try {
			const response = await axios.put(`${apiUrl}/${uuid}`, todo);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const deleteTodo = createAsyncThunk(
	"todo/deleteTodo",
	async (uuid, thunkAPI) => {
		try {
			await axios.delete(`${apiUrl}/${uuid}`);
			return uuid;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getTodos.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getTodos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.todos = action.payload;
			})
			.addCase(getTodos.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createTodo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createTodo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.todos.push(action.payload);
			})
			.addCase(createTodo.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateTodo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateTodo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.todos = state.todos.map((todo) =>
					todo.uuid === action.payload.uuid ? action.payload : todo
				);
			})
			.addCase(updateTodo.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteTodo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.todos = state.todos.filter(
					(todo) => todo.uuid !== action.payload
				);
			})
			.addCase(deleteTodo.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = todoSlice.actions;
export default todoSlice.reducer;
