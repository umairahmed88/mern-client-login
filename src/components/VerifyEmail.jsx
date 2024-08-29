import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");

	useEffect(() => {
		const verifyEmail = async () => {
			try {
				const response = await axios.get(
					`https://ua-mern-api.vercel.app/api/v1/auth/verify-email?token=${token}`
				);
				if (response.data.message === "Email verified successfully") {
					navigate("/signin");
				} else {
					console.error("Verification failed:", response.data.message);
				}

				console.log("Token received:", token);
			} catch (error) {
				console.error("Error verifying email:", error.response.data);
			}
		};

		verifyEmail();
	}, [navigate, token]);

	return <div>Verifying your email...</div>;
};

export default VerifyEmail;
