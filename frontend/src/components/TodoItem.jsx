/* eslint-disable react/prop-types */
import { FaEdit, FaTrash } from "react-icons/fa";

const TodoItem = ({ title, description, onEdit, onDelete }) => {
	return (
		<div className="mx-4 md:mx-16 flex justify-between items-center bg-bglight text-white p-4 mb-4 rounded-md shadow-md">
			<div>
				<h2 className="text-xl font-semibold text-primary">{title}</h2>
				<p className="text-primary">{description}</p>
			</div>
			<div className="flex space-x-4">
				<button
					onClick={onEdit}
					className="text-blue-700 text-3xl hover:text-blue-600 transition duration-200"
				>
					<FaEdit />
				</button>
				<button
					onClick={onDelete}
					className="text-red-600 text-2xl hover:text-red-600 transition duration-200"
				>
					<FaTrash />
				</button>
			</div>
		</div>
	);
};

export default TodoItem;
