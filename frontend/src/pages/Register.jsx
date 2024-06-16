import logo from "../assets/images/logo.png";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, reset } from "../redux/authSlice";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [localMessage, setLocalMessage] = useState("");
	const [isLocalError, setIsLocalError] = useState(false);

	const dispatch = useDispatch();
	const { isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const saveUser = (e) => {
		e.preventDefault();
		if (name.length < 5) {
			setLocalMessage("Nama harus memiliki setidaknya 5 karakter.");
			setIsLocalError(true);
			return;
		}

		dispatch(registerUser({ name, email, password, confirmPassword }));
	};

	useEffect(() => {
		if (isSuccess) {
			setName("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");
			setLocalMessage("Registration successful!");
			setIsLocalError(false);
		}

		if (isError) {
			setLocalMessage(message);
			setIsLocalError(true);
		}

		return () => {
			dispatch(reset());
		};
	}, [isSuccess, isError, message, dispatch]);

	return (
		<div className="py-16 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4 md:mx-0">
				<div className="flex items-center justify-center mb-4">
					<img src={logo} alt="logo taskly" width={30} />
					<h1 className="text-gray-800 pl-2 font-bold text-2xl lg:text-3xl">
						Register
					</h1>
				</div>
				<form className="space-y-4" onSubmit={saveUser}>
					{localMessage && (
						<span className={isLocalError ? "text-red-600" : "text-green-600"}>
							{localMessage}
						</span>
					)}
					<div>
						<label htmlFor="name" className="text-form">
							Nama
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="form-input"
							required
						/>
					</div>
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
					<div>
						<label htmlFor="confirm-password" className="text-form">
							Confirm Password
						</label>
						<input
							type="password"
							id="confirm-password"
							name="confirm-password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							className="form-input"
							required
						/>
					</div>
					<button type="submit" className="btn-primary" disabled={isLoading}>
						Register
					</button>
				</form>
				<p className="mt-2">
					Sudah punya akun?{" "}
					<a href="/login" className="underline">
						login disini
					</a>
				</p>
			</div>
		</div>
	);
};

export default Register;
