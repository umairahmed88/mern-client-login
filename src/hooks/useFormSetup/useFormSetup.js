import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	confirmPasswordValidator,
	passwordValidator,
} from "../PasswordValidators/PasswordValidators";

// Define schemas for different forms
const schemas = {
	signup: yup.object().shape({
		username: yup.string().required("Username is required"),
		email: yup.string().email("Invalid email").required("Email is required"),
		password: passwordValidator.required(),
		confirmPassword: confirmPasswordValidator("password").required(),
	}),
	resetPassword: yup.object().shape({
		password: passwordValidator.required(),
		confirmPassword: confirmPasswordValidator("password").required(),
	}),
	profile: yup.object().shape({
		username: yup.string().optional(),
		email: yup.string().email("Invalid email").optional(),
		password: passwordValidator.optional(),
		confirmPassword: confirmPasswordValidator("password").optional(),
	}),
};

/**
 * A unified hook to set up forms with dynamic schemas.
 * @param {string} formType - The type of the form ("signup", "resetPassword", "profile").
 * @returns {object} - The useForm object from React Hook Form.
 */
export const useFormSetup = (formType) => {
	if (!schemas[formType]) {
		throw new Error(`Unsupported form type: ${formType}`);
	}

	return useForm({
		resolver: yupResolver(schemas[formType]),
	});
};
