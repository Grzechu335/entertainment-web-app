import { defineStore } from "pinia";
import useMovieFetch from "~/hooks/useMovieFetch";
import { SearchedTVShow, TVShow } from "~/types/Movie";

export const useTVSeries = defineStore("tvSeries", {
	state: () => ({
		TVSeries: {
			data: null as TVShow[] | null,
			isLoading: false,
		},
		searchedTVSeries: {
			data: null as SearchedTVShow[] | null,
			isLoading: false,
			currentPage: 1,
			totalPages: 0,
		},
	}),
	getters: {
		getTVSeries: (state) => state.TVSeries,
		getSearchedTVSeries: (state) => state.searchedTVSeries,
	},
	actions: {
		resetData() {
			this.searchedTVSeries.data = [];
			this.searchedTVSeries.currentPage = 1;
			this.searchedTVSeries.totalPages = 0;
		},
		async fetchTVSeries() {
			const tvSeriesUrl = "https://api.themoviedb.org/3/trending/tv/day?";
			const { data, isLoading } = await useMovieFetch<Array<TVShow>>(
				tvSeriesUrl,
				{
					params: {
						language: "en-US",
						page: 1,
					},
				}
			);
			this.TVSeries.isLoading = isLoading.value;
			this.TVSeries.data = data.value;
		},
		async searchTVSeries(query: string | undefined) {
			if (typeof query === "undefined") {
				return;
			}

			const searchTVSeriesUrl = "https://api.themoviedb.org/3/search/tv";

			const { data, isLoading, totalPages } = await useMovieFetch<
				Array<TVShow>
			>(searchTVSeriesUrl, {
				params: {
					language: "en-US",
					page: 1,
					query,
				},
			});

			this.searchedTVSeries.isLoading = isLoading.value;
			this.searchedTVSeries.data = data.value;
			this.searchedTVSeries.totalPages = totalPages.value;
		},
		async addTVSeries(query: string | undefined) {
			if (typeof query === "undefined") {
				return;
			}
			if (
				this.searchedTVSeries.totalPages &&
				this.searchedTVSeries.currentPage >= this.searchedTVSeries.totalPages
			) {
				return;
			}
			const searchTVSeriesUrl = "https://api.themoviedb.org/3/search/tv";

			const { data, isLoading, totalPages } = await useMovieFetch<
				Array<TVShow>
			>(searchTVSeriesUrl, {
				params: {
					language: "en-US",
					page: ++this.searchedTVSeries.currentPage,
					query,
				},
			});
			this.searchedTVSeries.isLoading = isLoading.value;
			this.searchedTVSeries.totalPages = totalPages.value;
			this.searchedTVSeries.data?.push(...data.value);
		},
	},
});
