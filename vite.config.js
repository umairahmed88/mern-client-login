import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "https://ua-mern-api-login.vercel.app",
				changeOrigin: true,
				secure: false,
			},
		},
	},
	plugins: [react()],
});
