import TodoList from "../components/TodoList";
import AuthMiddleware from "../middleware/AuthMiddleware";

const Todos = () => {
	return (
		<AuthMiddleware>
			<TodoList />
		</AuthMiddleware>
	);
};

export default Todos;
