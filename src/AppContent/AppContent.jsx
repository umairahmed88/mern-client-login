import "react-toastify/dist/ReactToastify.css";
import {
	Header,
	ToastContainer,
	GlobalLoadingBar,
	useClearState,
} from "../imports/imports";
import AppRoutes from "../routes/routes";

const AppContent = () => {
	useClearState();

	return (
		<>
			<GlobalLoadingBar />
			<Header />
			<AppRoutes />
			<ToastContainer />
		</>
	);
};

export default AppContent;
