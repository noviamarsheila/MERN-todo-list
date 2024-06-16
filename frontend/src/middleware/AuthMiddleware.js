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
			dispatch(reset());
			navigate("/login");
		}
	}, [isError, user, navigate, dispatch]);

	return !isError && user ? children : null;
};

export default AuthMiddleware;
