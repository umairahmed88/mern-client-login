// validators.js

import * as yup from "yup";

export const passwordRequirementsMessage =
	"Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.";

// Password validator made optional
export const passwordValidator = yup
	.string()
	.optional()
	.min(8, passwordRequirementsMessage)
	.matches(/[A-Z]/, passwordRequirementsMessage)
	.matches(/[a-z]/, passwordRequirementsMessage)
	.matches(/[0-9]/, passwordRequirementsMessage)
	.matches(/[!@#$%^&*(),.?":{}|<>]/, passwordRequirementsMessage);

// Confirm password validator made optional
export const confirmPasswordValidator = (passwordRef) =>
	yup
		.string()
		.optional()
		.oneOf([yup.ref(passwordRef), null], "Passwords must match");

// import * as yup from "yup";

// export const passwordRequirementsMessage =
// 	"Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character.";

// export const passwordValidator = yup
// 	.string()
// 	.required(passwordRequirementsMessage)
// 	.min(8, passwordRequirementsMessage)
// 	.matches(/[A-Z]/, passwordRequirementsMessage)
// 	.matches(/[a-z]/, passwordRequirementsMessage)
// 	.matches(/[0-9]/, passwordRequirementsMessage)
// 	.matches(/[!@#$%^&*(),.?":{}|<>]/, passwordRequirementsMessage);

// export const confirmPasswordValidator = (passwordRef) =>
// 	yup
// 		.string()
// 		.oneOf([yup.ref(passwordRef), null], "Passwords must match")
// 		.required("Confirm password is required");
