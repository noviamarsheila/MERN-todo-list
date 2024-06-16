/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";

const EditModal = ({ isOpen, onClose, onSubmit, todo, setTodo }) => {
	if (!isOpen) return null;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(todo.uuid, todo.title, todo.description);
		onClose();
	};

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white p-6 rounded-md w-[500px]">
				<h2 className="text-2xl mb-4 font-semibold">Edit Todo</h2>
				<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						id="title"
						name="title"
						value={todo.title}
						onChange={handleChange}
						className="border p-2 rounded"
					/>
					<label htmlFor="description">Description</label>
					<input
						type="text"
						id="description"
						name="description"
						value={todo.description}
						onChange={handleChange}
						className="border p-2 rounded"
					/>
					<div className="flex justify-end space-x-4">
						<button
							type="button"
							onClick={onClose}
							className="btn-secondary w-1/2 border font-semibold border-primary rounded-md hover:text-primary"
						>
							Cancel
						</button>
						<button type="submit" className="btn-primary w-1/2">
							Update
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditModal;
