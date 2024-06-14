/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			padding: "15px",
			center: true,
		},
		extend: {
			colors: {
				primary: "#431645",
				secondary: "#B43BB9",
				bglight: "#E1A9E4",
			},
		},
	},
	plugins: [],
};
