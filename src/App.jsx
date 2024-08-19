import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Header from "./components/Header";

const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "/signin", element: <Signin /> },
	// { path: "", element: "" },
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
		</Router>
	);
};

export default App;
