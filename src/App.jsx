import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Header from "./components/Header";
import VerifyEmail from "./components/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/auth/Profile";
import { useClearState } from "./hooks/useClearState";
import GlobalLoadingBar from "./hooks/GlobalLoadingBar/GlobalLoadingBar";
import { AdminRoute, UserRoute } from "./components/PrivateRoutes/PrivateRoute";

const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "/signin", element: <Signin /> },
	{ path: "/verify-email", element: <VerifyEmail /> },
	{ path: "/profile", element: <Profile /> },
	// { path: "", element: "" },
];

const App = () => {
	useClearState();

	return (
		<Router>
			<GlobalLoadingBar />
			<Header />
			<Routes>
				{routes.map(({ path, element, user, admin }) =>
					admin ? (
						<Route element={<AdminRoute />} key={path}>
							<Route path={path} element={element} />
						</Route>
					) : user ? (
						<Route element={<UserRoute />} key={path}>
							<Route path={path} element={element} />
						</Route>
					) : (
						<Route path={path} element={element} key={path} />
					)
				)}
			</Routes>
			<ToastContainer />
		</Router>
	);
};

export default App;
