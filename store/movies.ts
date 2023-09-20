import { defineStore } from "pinia";
import { Movie, MoviesRes, SearchedMovie } from "~/types/Movie";

export const useMovies = defineStore("movies", {
	state: () => ({
		movies: {
			data: null as Movie[] | null,
			isLoading: false,
		},
		searchedMovies: {
			data: null as SearchedMovie[] | null,
			isLoading: false,
		},
	}),
	getters: {
		getMovies: (state) => state.movies,
		getSearchedMovies: (state) => state.searchedMovies,
	},
	actions: {
		async fetchMovies() {
			const config = useRuntimeConfig();
			const movieUrl = "https://api.themoviedb.org/3/trending/movie/day?";
			try {
				this.movies.isLoading = true;
				const res = await $fetch<MoviesRes>(movieUrl, {
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
				});
				this.movies.data = res.results;
			} catch (error) {
				console.error("Error while fetching initial movies: " + error);
			} finally {
				this.movies.isLoading = false;
			}
		},
		async searchMovies(query: string) {
			if (query.trim() === "") {
				this.searchedMovies.data = null;
				return;
			}
			const config = useRuntimeConfig();
			const searchMoviesUrl = "https://api.themoviedb.org/3/search/movie";
			try {
				this.searchedMovies.isLoading = true;
				const res = await $fetch<MoviesRes>(searchMoviesUrl, {
					method: "GET",
					headers: {
						accept: "application/json",
					},
					params: {
						include_adult: true,
						api_key: config.public.movieDbKey,
						language: "en-US",
						page: 1,
						query,
					},
				});
				if (res.total_results === 0) {
					this.searchedMovies.data = [];
				} else {
					this.searchedMovies.data = res.results;
				}
			} catch (error) {
				console.error("Error while fetching searched movies: " + error);
			} finally {
				this.searchedMovies.isLoading = false;
			}
		},
	},
});
