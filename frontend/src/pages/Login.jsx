import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [localMessage, setLocalMessage] = useState("");
	const [isLocalError, setIsLocalError] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isSuccess, isError, message, user, isLoading } = useSelector(
		(state) => state.auth
	);

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(loginUser({ email, password }));
	};

	useEffect(() => {
		if (isSuccess && user) {
			navigate("/todos");
		}

		if (isError) {
			setLocalMessage(message);
			setIsLocalError(true);
		}
	}, [isSuccess, isError, message, dispatch, navigate, user]);

	return (
		<div className="py-32 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4 md:mx-0">
				<div className="flex items-center justify-center mb-4">
					<img src={logo} alt="logo taskly" width={30} />
					<h1 className="text-gray-800 pl-2 font-bold text-2xl lg:text-3xl">
						Login
					</h1>
				</div>
				<form className="space-y-4" onSubmit={handleLogin}>
					{localMessage && (
						<span className={isLocalError ? "text-red-600" : "text-green-600"}>
							{localMessage}
						</span>
					)}
					<div>
						<label htmlFor="email" className="text-form">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="form-input"
							required
						/>
					</div>
					<div>
						<label htmlFor="password" className="text-form">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="form-input"
							required
						/>
					</div>
					<button type="submit" className="btn-primary" disabled={isLoading}>
						{isLoading ? "Logging in..." : "Login"}
					</button>
					<p>
						Belum punya akun?{" "}
						<a href="/register" className="underline">
							Daftar disini
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
