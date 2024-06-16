import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthMiddleware from "./middleware/AuthMiddleware";

function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<BrowserRouter>
				<Navbar />
				<main className="flex-grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route
							path="/todos"
							element={
								<AuthMiddleware>
									<Todos />
								</AuthMiddleware>
							}
						/>
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
