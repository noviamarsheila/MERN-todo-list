/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../redux/authSlice";
import { reset } from "../redux/authSlice";

const AuthMiddleware = ({ children }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { isError, user } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getMe());
	}, [dispatch]);

	useEffect(() => {
		if (isError || !user) {
			dispatch(reset()); // Reset state redux jika terjadi kesalahan atau user tidak ada
			navigate("/login"); // Redirect ke halaman login jika terjadi kesalahan atau user tidak ada
		}
	}, [isError, user, navigate, dispatch]);

	return !isError && user ? children : null;
};

export default AuthMiddleware;
