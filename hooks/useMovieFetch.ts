type APIResponse<T> = {
	page: number;
	results: T;
	total_pages: number;
	total_results: number;
};

export default async function useMovieFetch<T>(
	url: string,
	options?: {
		params?: Record<string, unknown>;
	}
) {
	const {
		public: { movieDbKey },
	} = useRuntimeConfig();
	const dataObject = reactive({
		data: [] as Ref<T> | [],
		isLoading: false,
		currentPage: 1,
		totalPages: 0,
	});
	try {
		dataObject.isLoading = true;
		const res = await $fetch<APIResponse<T>>(url, {
			method: "GET",
			headers: {
				accept: "application/json",
			},
			params: {
				api_key: movieDbKey,
				...options?.params,
			},
		});
		if (res) {
			dataObject.data = res.results;
			dataObject.totalPages = res.total_pages;
		}
	} catch (error) {
		console.error("Error while fetching trending movies: " + error);
	} finally {
		dataObject.isLoading = false;
	}

	return { ...toRefs(dataObject) };
}
