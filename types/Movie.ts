export interface TopMovies {
	page: number;
	results: Array<Movie>;
	total_pages: number;
	total_results: number;
}

export interface Movie {
	adult: boolean;
	backdrop_path: string;
	genre_ids: Array<number>;
	id: number;
	media_type: "movie" | "tv";
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}
