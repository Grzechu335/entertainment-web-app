import { defineStore } from "pinia";
import {
	Movie,
	CommonRes,
	MoviesRes,
	TVSeriesRes,
	TVShow,
} from "~/types/Movie";

export const useMovies = defineStore("movies", {
	state: () => ({
		trending: null as Array<Movie | TVShow> | null,
		recommended: null as Array<Movie | TVShow> | null,
		movies: null as Movie[] | null,
		tvSeries: null as TVShow[] | null,
	}),
	getters: {
		getTrending: (state) => state.trending,
		getRecommended: (state) => state.recommended,
		getMovies: (state) => state.movies,
		getTVSeries: (state) => state.tvSeries,
	},
	actions: {
		async fetchTrendingMovies() {
			const config = useRuntimeConfig();
			const trendingUrl = "https://api.themoviedb.org/3/trending/all/day?";
			const {
				data: { value: movies },
				error,
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
				transform: (res: CommonRes) => {
					const transformedMovies = res.results.map((movie) => {
						if (movie.media_type === "movie") {
							movie.release_date = new Date(movie.release_date)
								.getFullYear()
								.toString();
							return movie;
						} else {
							movie.first_air_date = new Date(movie.first_air_date)
								.getFullYear()
								.toString();
							return movie;
						}
					});
					return transformedMovies;
				},
			});
			if (error.value) {
				console.error(error.value);
				return;
			}
			if (movies) {
				this.trending = movies.slice(0, 5);
				this.recommended = movies.slice(0, 20);
			}
		},
		async fetchMovies() {
			const config = useRuntimeConfig();
			const trendingUrl = "https://api.themoviedb.org/3/trending/movie/day?";
			const {
				data: { value: movies },
				error,
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
				transform: (res: MoviesRes) => {
					const transformedMovies = res.results.map((movie) => {
						movie.release_date = new Date(movie.release_date)
							.getFullYear()
							.toString();
						return movie;
					});
					return transformedMovies;
				},
			});
			if (error.value) {
				console.error(error.value);
				return;
			}
			if (movies) {
				this.movies = movies;
			}
		},
		async fetchTVSeries() {
			const config = useRuntimeConfig();
			const trendingUrl = "https://api.themoviedb.org/3/trending/tv/day?";
			const {
				data: { value: tvSeries },
				error,
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
				transform: (res: TVSeriesRes) => {
					const transformedMovies = res.results.map((movie) => {
						movie.first_air_date = new Date(movie.first_air_date)
							.getFullYear()
							.toString();
						return movie;
					});
					return transformedMovies;
				},
			});
			if (error.value) {
				console.error(error.value);
				return;
			}
			if (tvSeries) {
				this.tvSeries = tvSeries;
			}
		},
	},
});
