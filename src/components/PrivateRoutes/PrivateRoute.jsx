import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { signout } from "../../redux/auth/authSlices";

const PrivateRoute = () => {
	const { currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [isTokenValid, setIsTokenValid] = useState(true);

	useEffect(() => {
		if (currentUser && currentUser?.sanitizedUser?.token) {
			try {
				const decodedToken = jwtDecode(currentUser.sanitizedUser.token);

				if (decodedToken.exp * 1000 < Date.now()) {
					setIsTokenValid(false);
					dispatch(signout());
				}
			} catch (err) {
				setIsTokenValid(false);
				dispatch(signout());
			}
		}
	}, [currentUser, dispatch]);

	if (!currentUser || !isTokenValid) {
		return <Navigate to='/signin' />;
	}

	return <Outlet />;
};

export default PrivateRoute;
