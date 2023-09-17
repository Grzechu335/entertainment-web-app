import { defineStore } from "pinia";
import { CommonRes, Movie, TVShow } from "~/types/Movie";

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
			data: null as Array<Movie | TVShow> | null,
			isLoading: false,
			noMoviesFound: false,
		},
	}),
	getters: {
		getTrendingMovies: (state) => state.trendingMovies,
		getRecommendedMovies: (state) => state.recommendedMovies,
		getSearchedRecommendedMovies: (state) => state.searchedRecommendedMovies,
	},
	actions: {
		async fetchHomeMovies() {
			const config = useRuntimeConfig();
			const trendingUrl = "https://api.themoviedb.org/3/trending/all/day?";
			try {
				this.trendingMovies.isLoading = true;
				const res = await $fetch<CommonRes>(trendingUrl, {
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
				this.trendingMovies.data = res.results.slice(0, 5);
				this.recommendedMovies.data = res.results;
			} catch (error) {
				console.error("Error while fetching trending movies: " + error);
			} finally {
				this.trendingMovies.isLoading = false;
				this.recommendedMovies.isLoading = false;
			}
		},
		async searchRecommendedMovies(query: string) {
			if (query.trim() === "") return;
			const config = useRuntimeConfig();
			const searchRecommendedUrl = "https://api.themoviedb.org/3/search/multi";
			try {
				this.searchedRecommendedMovies.noMoviesFound = false;
				this.searchedRecommendedMovies.isLoading = true;
				const res = await $fetch<CommonRes>(searchRecommendedUrl, {
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
					this.searchedRecommendedMovies.noMoviesFound = true;
				} else {
					this.searchedRecommendedMovies.data = res.results;
				}
			} catch (error) {
				console.error(
					"Error while fetching searched home page movies: " + error
				);
			} finally {
				this.searchedRecommendedMovies.isLoading = false;
			}
		},
	},
});
