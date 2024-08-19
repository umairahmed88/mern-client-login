import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: 3000,
		host: true,
		proxy: {
			"/api": {
				target: "https://mern-api-login-production.up.railway.app",
				changeOrigin: true,
			},
		},
	},
	plugins: [react()],
});
