import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getTodos,
	createTodo,
	updateTodo,
	deleteTodo,
	reset,
} from "../redux/todoSlice";
import TodoItem from "./TodoItem";
import Spinner from "./Spinner";
import EditModal from "./EditModal";

const TodoList = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { todos, isError, isLoading, message } = useSelector(
		(state) => state.todo
	);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [currentTodo, setCurrentTodo] = useState({
		uuid: "",
		title: "",
		description: "",
	});

	useEffect(() => {
		dispatch(getTodos());
		return () => {
			dispatch(reset());
		};
	}, [dispatch]);

	const handleAddTodo = (e) => {
		e.preventDefault();
		dispatch(createTodo({ title, description })).then(() => {
			dispatch(getTodos());
		});
		setTitle("");
		setDescription("");
	};

	const handleEditTodo = (uuid, title, description) => {
		dispatch(updateTodo({ uuid, todo: { title, description } })).then(() => {
			dispatch(getTodos());
		});
	};

	const handleDeleteTodo = (uuid) => {
		dispatch(deleteTodo(uuid)).then(() => {
			dispatch(getTodos());
		});
	};

	const openEditModal = (todo) => {
		setCurrentTodo(todo);
		setIsEditModalOpen(true);
	};

	const closeEditModal = () => {
		setIsEditModalOpen(false);
		setCurrentTodo({ uuid: "", title: "", description: "" });
	};

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <div>Error: {message}</div>;
	}

	return (
		<section className="py-16 flex items-center justify-center">
			<div className="container">
				<h1 className="mb-8 flex items-center justify-center text-white font-semibold text-2xl lg:text-3xl">
					Daftar Tugas - {user ? `${user.name}` : ""}
				</h1>
				<div className="px-4 md:px-16 md:py-8 py-6">
					<form
						onSubmit={handleAddTodo}
						className="flex flex-col md:flex-row md:items-center md:space-x-4"
					>
						<div className="flex flex-col md:flex-grow">
							<label htmlFor="title" className="text-form text-white text-xl">
								Judul
							</label>
							<input
								type="text"
								id="title"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className="form-input bg-bglight"
								autoComplete="off"
								required
							/>
						</div>
						<div className="flex mt-2 md:mt-0 flex-col md:flex-grow">
							<label
								htmlFor="description"
								className="text-form text-white text-xl"
							>
								Deskripsi
							</label>
							<input
								type="text"
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								className="form-input bg-bglight"
								autoComplete="off"
								required
							/>
						</div>
						<button
							type="submit"
							className="btn-primary mt-5 md:mt-7 bg-bglight text-primary font-bold md:w-auto"
						>
							Tambah
						</button>
					</form>
				</div>
				<div>
					{todos.map((todo) => (
						<TodoItem
							key={todo.uuid}
							title={todo.title}
							description={todo.description}
							onEdit={() => openEditModal(todo)}
							onDelete={() => handleDeleteTodo(todo.uuid)}
						/>
					))}
				</div>
			</div>
			<EditModal
				isOpen={isEditModalOpen}
				onClose={closeEditModal}
				onSubmit={handleEditTodo}
				todo={currentTodo}
				setTodo={setCurrentTodo}
			/>
		</section>
	);
};

export default TodoList;
