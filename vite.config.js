import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	base: "/",
	server: {
		proxy: {
			"/api": {
				target: "https://ua-mern-api.vercel.app",
				changeOrigin: true,
				secure: true,
			},
		},
	},
	plugins: [react()],
});
