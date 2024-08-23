import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	root: "src",
	base: "./",
	build: {
		outDir: "dist",
	},
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
