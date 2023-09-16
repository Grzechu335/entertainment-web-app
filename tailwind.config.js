/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./components/**/*.{js,vue,ts}",
		"./layouts/**/*.vue",
		"./pages/**/*.vue",
		"./plugins/**/*.{js,ts}",
		"./nuxt.config.{js,ts}",
	],
	theme: {
		screens: {
			tablet: "620px",
			desktop: "1000px",
		},
		colors: {
			red: "#FC4747",
			"dark-blue": "#10141E",
			"grayish-blue": "#5A698F",
			"semi-dark-blue": "#161D2F",
			white: "#fff",
		},
		extend: {
			fontFamily: {
				sans: ["Outfit"],
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
};
