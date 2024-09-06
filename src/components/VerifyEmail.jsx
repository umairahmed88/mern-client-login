import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

				if (response.data.message === "Email already verified") {
					toast.info("Your email is already verified. Please sign in.");
					navigate("/signin");
				} else {
					toast.success("Email verification successful.");
				}

				// navigate("/signin");
			} catch (error) {
				if (error.response) {
					toast.error(`Error verifying email: ${error.response.data.message}`);
				} else if (error.request) {
					toast.error(
						"No response received from server. Please try again later."
					);
				} else {
					toast.error(
						"An error occurred during verification. Please try again."
					);
				}
			}
		};

		verifyEmail();
	}, [navigate, token]);

	return <div>Verifying your email...</div>;
};

export default VerifyEmail;
