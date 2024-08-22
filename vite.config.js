import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "https://ua-mern-api-login.vercel.app",
				changeOrigin: true,
				secure: false, // Optional: Set to true if your Vercel URL uses HTTPS
			},
		},
	},
	plugins: [react()],
});
