// routes.js
import {
	Route,
	Routes,
	Home,
	Signin,
	Signup,
	VerifyEmail,
	Profile,
	PrivateRoute,
} from "../imports/imports";

const AppRoutes = () => (
	<Routes>
		<Route path='/' element={<Home />} />
		<Route path='/signup' element={<Signup />} />
		<Route path='/signin' element={<Signin />} />
		<Route path='/verify-email' element={<VerifyEmail />} />
		<Route element={<PrivateRoute />}>
			<Route path='/profile' element={<Profile />} />
		</Route>
	</Routes>
);

export default AppRoutes;
