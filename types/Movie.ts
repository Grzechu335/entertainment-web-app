export type CommonRes = {
	page: number;
	results: Array<Movie | TVShow>;
	total_pages: number;
	total_results: number;
};

export type MoviesRes = {
	page: number;
	results: Array<Movie>;
	total_pages: number;
	total_results: number;
};

export type TVSeriesRes = {
	page: number;
	results: Array<TVShow>;
	total_pages: number;
	total_results: number;
};

export type CommonMovie = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type Movie = CommonMovie & {
	media_type: "movie";
	title: string;
	release_date: string;
};

export type TVShow = CommonMovie & {
	media_type: "tv";
	name: string;
	first_air_date: string;
};

export type SearchedMovie = CommonMovie & {
	title: string;
	release_date: string | typeof NaN;
};

export type SearchedTVShow = CommonMovie & {
	name: string;
	first_air_date: string | typeof NaN;
};
