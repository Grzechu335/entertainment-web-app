import { defineStore } from "pinia";
import useMovieFetch from "~/hooks/useMovieFetch";
import { Movie, TVShow } from "~/types/Movie";

export const useHomeMovies = defineStore("homeMovies", {
	state: () => ({
		trendingMovies: {
			data: null as Array<Movie | TVShow> | null,
			isLoading: false,
		},
		recommendedMovies: {
			data: null as Array<Movie | TVShow> | null,
			isLoading: false,
		},
		searchedRecommendedMovies: {
			data: [] as Array<Movie | TVShow>,
			isLoading: false,
			currentPage: 1,
			totalPages: 0,
		},
	}),
	getters: {
		getTrendingMovies: (state) => state.trendingMovies,
		getRecommendedMovies: (state) => state.recommendedMovies,
		getSearchedRecommendedMovies: (state) => state.searchedRecommendedMovies,
	},
	actions: {
		resetData() {
			this.searchedRecommendedMovies.data = [];
			this.searchedRecommendedMovies.currentPage = 1;
			this.searchedRecommendedMovies.totalPages = 0;
		},
		async fetchHomeMovies() {
			const { data, fetchData } = useMovieFetch<Array<Movie | TVShow>>(
				"https://api.themoviedb.org/3/trending/all/day?",
				{
					params: {
						language: "en-US",
						page: 1,
					},
				}
			);

			this.trendingMovies.isLoading = true;
			this.recommendedMovies.isLoading = true;
			this.trendingMovies.data = data.value.slice(0, 5);
			this.recommendedMovies.data = data.value;
			await fetchData();
		},
		async searchRecommendedMovies(query: string | undefined) {
			if (typeof query === "undefined") {
				return;
			}
			const { data, isLoading, totalPages, fetchData } = useMovieFetch<
				Array<Movie | TVShow>
			>("https://api.themoviedb.org/3/search/multi?", {
				params: {
					language: "en-US",
					page: 1,
					query,
				},
			});
			this.searchedRecommendedMovies.isLoading = isLoading.value;
			this.searchedRecommendedMovies.data = data.value;
			this.searchedRecommendedMovies.totalPages = totalPages.value;
			await fetchData();
		},
		async addSearchedMovies(query: string | undefined) {
			if (typeof query === "undefined") {
				return;
			}

			if (
				this.searchedRecommendedMovies.totalPages &&
				this.searchedRecommendedMovies.currentPage >=
					this.searchedRecommendedMovies.totalPages
			) {
				return;
			}

			const { data, isLoading, totalPages, fetchData } = useMovieFetch<
				Array<Movie | TVShow>
			>("https://api.themoviedb.org/3/search/multi?", {
				params: {
					language: "en-US",
					page: ++this.searchedRecommendedMovies.currentPage,
					query,
				},
			});

			this.searchedRecommendedMovies.isLoading = isLoading.value;
			this.searchedRecommendedMovies.totalPages = totalPages.value;
			await fetchData();
			this.searchedRecommendedMovies.data = [
				...this.searchedRecommendedMovies.data,
				...data.value,
			];
		},
	},
});
