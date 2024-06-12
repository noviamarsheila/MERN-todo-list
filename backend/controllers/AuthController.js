import User from "../models/UserModel.js";
import argon2 from "argon2";

// Register User
export const register = async (req, res) => {
	const { name, email, password, confirmPassword } = req.body;

	if (password !== confirmPassword)
		return res.status(400).json({ message: "Password tidak sama!" });

	try {
		const userexist = await User.findOne({
			where: {
				email,
			},
		});

		if (userexist)
			return res.status(409).json({ message: "Email sudah terdaftar!" });

		const hashPassword = await argon2.hash(password);
		await User.create({
			name,
			email,
			password: hashPassword,
		});

		res.status(201).json({ message: "Register berhasil!" });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

// Login User
export const login = async (req, res) => {
	try {
		if (req.session.userId) {
			return res.status(400).json({ message: "Anda sudah login!" });
		}

		const user = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!user) {
			console.warn("User tidak ditemukan: ", req.body.email);
			return res.status(404).json({ message: "User tidak ditemukan!" });
		}

		const match = await argon2.verify(user.password, req.body.password);

		if (!match) {
			console.warn("Password salah untuk email: ", req.body.email);
			return res.status(400).json({ message: "Password salah!" });
		}

		req.session.userId = user.uuid;

		const uuid = user.uuid;
		const name = user.name;
		const email = user.email;

		console.log("Login berhasil untuk email:", req.body.email);
		res.status(200).json({ uuid, name, email });
	} catch (error) {
		console.error("Error pada login:", error.message);
		res.status(500).json({ message: "Terjadi kesalahan pada server." });
	}
};

// get data user login
export const getMe = async (req, res) => {
	if (!req.session.userId) {
		return res.status(401).json({ message: "Mohon login ke akun anda!" });
	}

	const user = await User.findOne({
		attributes: ["uuid", "name", "email"],
		where: {
			uuid: req.session.userId,
		},
	});

	if (!user) return res.status(404).json({ message: "User tidak ditemukan!" });

	res.status(200).json(user);
};

// logout user
export const logout = async (req, res) => {
	if (!req.session.userId) {
		return res.status(401).json({ message: "Anda belum login!" });
	}

	req.session.destroy((err) => {
		if (err)
			return res
				.status(400)
				.json({ message: "Terdapat kesalahan, Tidak dapat logout!" });

		res.status(200).json({ message: "Anda telah logout!" });
	});
};
