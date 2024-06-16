import { useDispatch, useSelector } from "react-redux";
import { logoutUser, reset } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);

	const handleLogout = () => {
		dispatch(logoutUser())
			.then(() => {
				dispatch(reset());
				navigate("/");
			})
			.catch((error) => {
				console.error("Logout failed:", error);
			});
	};

	return (
		<header className="bg-primary py-4 sticky top-0 left-0 w-full flex items-center z-10">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center">
					<div className="flex items-center">
						<img src={logo} alt="logo" width={40} height={40} />
						<a href="/" className="font-bold pl-2 text-white text-2xl">
							Taskly.io
						</a>
					</div>

					<div>
						{user ? (
							<button
								onClick={handleLogout}
								className="btn-primary bg-secondary hover:opacity-85 hover:ease-in-out duration-200"
							>
								Logout
							</button>
						) : (
							<>
								<a
									href="/login"
									className="btn-primary bg-secondary mr-2 md:mr-5 hover:opacity-85 hover:ease-in-out duration-200"
								>
									Login
								</a>
								<a
									href="/register"
									className="btn-primary border hover:opacity-85 hover:ease-in-out hover:underline"
								>
									Register
								</a>
							</>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
