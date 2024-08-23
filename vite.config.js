import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: "dist",
		rollupOptions: {
			input: "/src/index.html",
		},
	},
	base: "./",
	server: {
		proxy: {
			"/api": {
				target: "https://ua-mern-api-login.vercel.app",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
