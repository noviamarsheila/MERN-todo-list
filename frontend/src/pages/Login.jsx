import logo from "../assets/images/logo.png";

const Login = () => {
	return (
		<div className="py-32 flex items-center justify-center ">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4 md:mx-0">
				<div className="flex items-center justify-center mb-4">
					<img src={logo} alt="logo taskly" width={30} />
					<h1 className="text-gray-800 pl-2 font-bold text-2xl lg:text-3xl">
						Login
					</h1>
				</div>
				<form className="space-y-4">
					<div>
						<label htmlFor="email" className="text-form">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							className="form-input"
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
							className="form-input"
						/>
					</div>

					<button type="submit" className="btn-primary">
						Login
					</button>
					<p>
						Belum punya akun?{" "}
						<a href="/register" className="underline">
							daftar disini
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
