import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "https://ua-mern-api.vercel.app",
				changeOrigin: true,
				secure: true, // Use true if your backend uses HTTPS
			},
		},
	},
	plugins: [react()],
});
