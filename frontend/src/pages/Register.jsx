import logo from "../assets/images/logo.png";

const Register = () => {
	return (
		<div className="py-16 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mx-4 md:mx-0">
				<div className="flex items-center justify-center mb-4">
					<img src={logo} alt="logo taskly" width={30} />
					<h1 className="text-gray-800 pl-2 font-bold text-2xl lg:text-3xl">
						Register
					</h1>
				</div>
				<form className="space-y-4">
					<div>
						<label htmlFor="name" className="text-form">
							Nama
						</label>
						<input type="text" id="name" name="name" className="form-input" />
					</div>
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
					<div>
						<label htmlFor="confirm-password" className="text-form">
							Confirm Password
						</label>
						<input
							type="password"
							id="confirm-password"
							name="confirm-password"
							className="form-input"
						/>
					</div>
					<button type="submit" className="btn-primary">
						Register
					</button>
					<p>
						Sudah punya akun?{" "}
						<a href="/login" className="underline">
							login disini
						</a>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Register;
