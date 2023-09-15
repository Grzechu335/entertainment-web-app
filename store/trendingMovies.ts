import { defineStore } from "pinia";
import { Movie, TopMovies } from "~/types/Movie";

export const useMovies = defineStore("movies", {
	state: () => ({
		trendingMovies: null as Movie[] | null,
		testMovies: null as Movie[] | null,
	}),
	getters: {
		getTrendingMovies: (state) => state.trendingMovies,
		getTestMovies: (state) => state.testMovies,
	},
	actions: {
		async fetchTrendingMovies() {
			const config = useRuntimeConfig();
			const trendingUrl = "https://api.themoviedb.org/3/trending/all/day?";
			const {
				data: { value: movies },
			} = await useFetch(trendingUrl, {
				method: "GET",
				headers: {
					accept: "application/json",
				},
				params: {
					adult: true,
					api_key: config.public.movieDbKey,
					language: "en-US",
					page: 1,
				},
				transform: (res: TopMovies) => {
					const transformedMovies = res.results.map((movie) => {
						movie.release_date = new Date(movie.release_date)
							.getFullYear()
							.toString();
						return movie;
					});
					return transformedMovies;
				},
			});
			if (movies) {
				this.trendingMovies = movies.slice(0, 5);
				this.testMovies = movies.slice(0, 20);
			}
		},
	},
});
