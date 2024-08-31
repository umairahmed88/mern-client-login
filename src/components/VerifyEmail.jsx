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

				if (response) {
					console.log("Email verification successful.");
					// navigate("/signin");
				}
			} catch (error) {
				if (error.response) {
					console.error(
						"Server-side error verifying email:",
						error.response.data.message
					);
				} else if (error.request) {
					console.error("No response received:", error.request);
				} else {
					console.error("Error verifying email:", error.message);
				}
			}
		};

		verifyEmail();
	}, [navigate, token]);

	return <div>Verifying your email...</div>;
};

export default VerifyEmail;
