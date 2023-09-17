// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		pageTransition: { name: "page", mode: "out-in" },
	},
	css: ["@/assets/css/main.css"],
	devtools: { enabled: true },
	modules: [
		"@pinia/nuxt",
		"@nuxtjs/tailwindcss",
		"@nuxtjs/google-fonts",
		"nuxt-icon",
		"@nuxt/image",
		"nuxt-icons",
		"nuxt-svgo",
		"nuxt-lodash",
	],
	googleFonts: {
		families: {
			Outfit: true,
		},
	},
	runtimeConfig: {
		public: {
			movieDbKey: process.env.MOVIE_DB_KEY,
		},
	},
});
