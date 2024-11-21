export const appData = {
	api: {
		authentication: "Token based authentication",
		signup: {
			description:
				"Signup requires a valid email ID. Password must have at least 8 characters, an uppercase letter, a lowercase letter, and a number. A verification email will be sent upon submission, containing a verification token. Verified data will be stored in MongoDB.",
		},
		login: {
			description:
				"Login requires email ID or username along with the password.",
		},
		updateProfile: {
			description:
				"Users can update profile details like avatar, email, name, and password. Updating email sends a verification link to the new email ID.",
		},
		googleSignupLogin: {
			description:
				"Users can sign up or log in using Google. A password is auto-created, and the Google profile image is used as the avatar.",
		},
		forgotPassword: {
			description:
				"Password recovery requires the user to enter their email ID. If found in the database, a link is sent to reset the password.",
		},
		signout: {
			description: "User can sign out of their account.",
		},
	},
	client: {
		"Redux Persist": {
			description:
				"Stores user data persistently across refreshes and redirects.",
		},
		"Signup Component": {
			link: "/signup",
			description:
				"An advanced signup page with fields for username, email ID, password, and confirm password (with visibility toggle). Includes Google signup, password recovery, and avatar upload (stored on Firebase).",
		},
		"Signin Component": {
			link: "/signin",
			description:
				"Signin page supporting email-password login, Google login, and password recovery.",
		},
		"Update Profile": {
			link: "/profile",
			description:
				"Allows users to update profile details. Email updates require verification. Profile images are stored in Firebase.",
		},
		"Protected Routes": {
			link: "/profile",
			description:
				"Access restrictions for admins and users. Users must sign in to access profiles. Admin and user roles have distinct permissions.",
		},
		"Responsive Header": {
			description:
				"A responsive header adapting to different screen sizes. Displays profile options for logged-in users and signin/signup options for guests.",
		},
	},
};
