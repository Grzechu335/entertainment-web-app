import { defineStore } from "pinia";
import { SearchedTVShow, TVSeriesRes, TVShow } from "~/types/Movie";

export const useTVSeries = defineStore("tvSeries", {
	state: () => ({
		TVSeries: {
			data: null as TVShow[] | null,
			isLoading: false,
		},
		searchedTVSeries: {
			data: null as SearchedTVShow[] | null,
			isLoading: false,
		},
	}),
	getters: {
		getTVSeries: (state) => state.TVSeries,
		getSearchedTVSeries: (state) => state.searchedTVSeries,
	},
	actions: {
		async fetchTVSeries() {
			const config = useRuntimeConfig();
			const tvSeriesUrl = "https://api.themoviedb.org/3/trending/tv/day?";
			try {
				this.TVSeries.isLoading = true;
				const res = await $fetch<TVSeriesRes>(tvSeriesUrl, {
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
				this.TVSeries.data = res.results;
			} catch (error) {
				console.error("Error while fetching initial TV Series: " + error);
			} finally {
				this.TVSeries.isLoading = false;
			}
		},
		async searchTVSeries(query: string) {
			if (query.trim() === "") {
				this.searchedTVSeries.data = null;
				return;
			}
			const config = useRuntimeConfig();
			const searchTVSeriesUrl = "https://api.themoviedb.org/3/search/multi";
			try {
				this.searchedTVSeries.isLoading = true;
				const res = await $fetch<TVSeriesRes>(searchTVSeriesUrl, {
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
					this.searchedTVSeries.data = [];
				} else {
					this.searchedTVSeries.data = res.results;
				}
			} catch (error) {
				console.error("Error while fetching searched TV series: " + error);
			} finally {
				this.searchedTVSeries.isLoading = false;
			}
		},
	},
});
