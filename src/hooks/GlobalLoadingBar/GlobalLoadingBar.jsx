import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import TopLoadingBar from "react-top-loading-bar";

const GlobalLoadingBar = () => {
	const [progress, setProgress] = useState(0);
	const location = useLocation();

	const productLoading = useSelector(
		(state) => state.product?.loading || false
	);
	const cartLoading = useSelector((state) => state.cartItem?.loading || false);
	const authLoading = useSelector((state) => state.auth?.loading || false);
	const orderLoading = useSelector((state) => state.order?.loading || false);

	useEffect(() => {
		if (productLoading || cartLoading || authLoading || orderLoading) {
			setProgress(30);
			const timer = setTimeout(() => {
				setProgress(100);
			}, 800);

			return () => clearTimeout(timer);
		}
	}, [productLoading, cartLoading, authLoading, orderLoading]);

	useEffect(() => {
		setProgress(0);
	}, [location]);

	return (
		<TopLoadingBar
			color='#1A237E'
			height={4}
			progress={progress}
			onLoaderFinished={() => setProgress(0)}
		/>
	);
};

export default GlobalLoadingBar;
