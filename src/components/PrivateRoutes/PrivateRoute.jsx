import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { signout } from "../../redux/auth/authSlices";

function PrivateRoute() {
	const { currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [isTokenValid, setIsTokenValid] = useState(true); // State to manage token validity

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
}

function UserRoute() {
	const { currentUser } = useSelector((state) => state.auth);

	if (currentUser?.sanitizedUser?.role !== "user") {
		return <Navigate to='/forbidden' />;
	}

	return <PrivateRoute />;
}

function AdminRoute() {
	const { currentUser } = useSelector((state) => state.auth);

	if (currentUser?.sanitizedUser?.role !== "admin") {
		return <Navigate to='/forbidden' />;
	}

	return <PrivateRoute />;
}

export { PrivateRoute, UserRoute, AdminRoute };
