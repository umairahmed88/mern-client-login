import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Header from "./components/Header";
import VerifyEmail from "./components/VerifyEmail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "/signin", element: <Signin /> },
	{ path: "/verify-email", element: <VerifyEmail /> },
	// { path: "", element: "" },
];

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				{routes.map((route) => (
					<Route path={route.path} element={route.element} key={route.path} />
				))}
			</Routes>
			<ToastContainer />
		</Router>
	);
};

export default App;
