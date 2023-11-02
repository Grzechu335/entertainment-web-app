import { defineStore } from "pinia";
import useMovieFetch from "~/hooks/useMovieFetch";
import { Movie, SearchedMovie } from "~/types/Movie";

export const useMovies = defineStore("movies", {
	state: () => ({
		movies: {
			data: null as Movie[] | null,
			isLoading: false,
		},
		searchedMovies: {
			data: [] as SearchedMovie[],
			isLoading: false,
			currentPage: 1,
			totalPages: 0,
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
			this.searchedMovies.totalPages = 0;
		},
		async fetchMovies() {
			const { data, isLoading } = await useMovieFetch<Array<Movie>>(
				"https://api.themoviedb.org/3/trending/movie/day?",
				{
					params: {
						language: "en-US",
						page: 1,
					},
				}
			);
			this.movies.isLoading = isLoading.value;
			this.movies.data = data.value;
		},
		async searchMovies(query: string | undefined) {
			if (typeof query === "undefined") {
				return;
			}

			const { data, isLoading, totalPages } = await useMovieFetch<
				SearchedMovie[]
			>("https://api.themoviedb.org/3/search/movie", {
				params: {
					language: "en-US",
					page: 1,
					query,
				},
			});
			this.searchedMovies.isLoading = isLoading.value;
			this.searchedMovies.data = data.value;
			this.searchedMovies.totalPages = totalPages.value;
		},
		async addMovies(query: string | undefined) {
			if (typeof query === "undefined") {
				return;
			}
			if (
				this.searchedMovies.totalPages &&
				this.searchedMovies.currentPage >= this.searchedMovies.totalPages
			) {
				return;
			}
			const { data, isLoading, totalPages } = await useMovieFetch<Array<Movie>>(
				"https://api.themoviedb.org/3/trending/movie/day?",
				{
					params: {
						language: "en-US",
						page: ++this.searchedMovies.currentPage,
						query,
					},
				}
			);
			this.searchedMovies.isLoading = isLoading.value;
			this.searchedMovies.totalPages = totalPages.value;
			this.searchedMovies.data.push(...data.value);
		},
	},
});
