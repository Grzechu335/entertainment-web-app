// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ["@/assets/css/main.css"],
	devtools: { enabled: true },
	modules: [
		"@pinia/nuxt",
		"@nuxtjs/tailwindcss",
		"@nuxtjs/google-fonts",
		"nuxt-icon",
		"@nuxt/image",
		"nuxt-icons",
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
