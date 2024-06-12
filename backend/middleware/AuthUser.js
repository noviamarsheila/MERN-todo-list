import User from "../models/UserModel.js";

const isAuthenticated = async (req, res, next) => {
	if (!req.session.userId)
		return res.status(401).json({ message: "Mohon login ke akun anda!" });

	const user = await User.findOne({
		where: {
			uuid: req.session.userId,
		},
	});

	if (!user) return res.status(404).json({ message: "User tidak ditemukan!" });
	req.userId = user.id;
	next();
};

export default isAuthenticated;
