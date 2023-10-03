import { defineStore } from "pinia";
import {
	Movie,
	MoviesRes,
	SearchedMovie,
	SearchedMovieRes,
} from "~/types/Movie";

export const useMovies = defineStore("movies", {
	state: () => ({
		movies: {
			data: null as Movie[] | null,
			isLoading: false,
		},
		searchedMovies: {
			data: null as SearchedMovie[] | null,
			isLoading: false,
			currentPage: 1,
			totalPages: undefined as number | undefined,
		},
	}),
	getters: {
		getMovies: (state) => state.movies,
		getSearchedMovies: (state) => state.searchedMovies,
	},
	actions: {
		resetData() {
			this.searchedMovies.data = [];
			this.searchedMovies.currentPage = 1;
			this.searchedMovies.totalPages = undefined;
		},
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
		async searchMovies(query: string | undefined) {
			if (typeof query === "undefined") {
				return;
			}
			const config = useRuntimeConfig();
			const searchMoviesUrl = "https://api.themoviedb.org/3/search/movie";
			try {
				this.searchedMovies.isLoading = true;
				const res = await $fetch<SearchedMovieRes>(searchMoviesUrl, {
					method: "GET",
					headers: {
						accept: "application/json",
					},
					params: {
						api_key: config.public.movieDbKey,
						language: "en-US",
						page: 1,
						query,
					},
				});
				if (res.total_results === 0) {
					this.searchedMovies.data = [];
					this.searchedMovies.totalPages = 0;
				} else {
					this.searchedMovies.data = res.results;
					this.searchedMovies.totalPages = res.total_pages;
				}
			} catch (error) {
				console.error("Error while fetching searched movies: " + error);
			} finally {
				if (this.searchedMovies.totalPages === 1)
					this.searchedMovies.isLoading = false;
				else {
					setTimeout(() => {
						this.searchedMovies.isLoading = false;
					}, 1500);
				}
			}
		},
		async addMovies(query: string | undefined) {
			if (typeof query === "undefined") {
				return;
			}
			const config = useRuntimeConfig();
			const searchMoviesUrl = "https://api.themoviedb.org/3/search/movie";
			try {
				this.searchedMovies.isLoading = true;
				++this.searchedMovies.currentPage;
				const res = await $fetch<SearchedMovieRes>(searchMoviesUrl, {
					method: "GET",
					headers: {
						accept: "application/json",
					},
					params: {
						api_key: config.public.movieDbKey,
						language: "en-US",
						page: this.searchedMovies.currentPage,
						query,
					},
				});
				if (res.total_results === 0) {
					this.searchedMovies.data = [];
					this.searchedMovies.totalPages = 0;
				} else {
					this.searchedMovies.data = [
						...this.searchedMovies.data,
						...res.results,
					];
					this.searchedMovies.totalPages = res.total_pages;
				}
			} catch (error) {
				console.error("Error while fetching searched movies: " + error);
			} finally {
				if (this.searchedMovies.totalPages === this.searchedMovies.currentPage)
					this.searchedMovies.isLoading = false;
				else {
					setTimeout(() => {
						this.searchedMovies.isLoading = false;
					}, 1500);
				}
			}
		},
	},
});
