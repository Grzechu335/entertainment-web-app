<template>
	<div>
		<LayoutMovies
			header="Movies"
			:isLoading="fetchStatus === 'fetching'"
			:searchedMovies="searchedMovies"
			:movies="movies?.results"
			:notFound="allSearchedMovies?.pages.slice(-1).pop()?.total_results === 0"
		/>
	</div>
</template>

<script setup lang="ts">
import {
	useInfiniteQuery,
	useQuery,
	useQueryClient,
} from "@tanstack/vue-query";
import { Movie, SearchedMovie } from "~/types/Movie";

const route = useRoute();
const queryClient = useQueryClient();

onServerPrefetch(async () => {
	await suspense();
});

const {
	public: { movieDbKey },
} = useRuntimeConfig();

const { data: movies, suspense } = useQuery({
	queryKey: ["movies"],
	queryFn: async () => {
		const data = await fetchData<Array<Movie>>({
			url: "https://api.themoviedb.org/3/trending/movie/day?",
			options: {
				params: {
					api_key: movieDbKey,
					language: "en-US",
					page: 1,
				},
			},
		});
		return data;
	},
});
const {
	data: allSearchedMovies,
	fetchNextPage: fetchNextSearchedMovies,
	fetchStatus,
	hasNextPage,
} = useInfiniteQuery({
	initialPageParam: 1,
	queryKey: ["searchedMovies"],
	queryFn: async ({ pageParam }) => {
		if (!route.query.search) return;
		const data = await fetchData<Array<SearchedMovie>>({
			url: "https://api.themoviedb.org/3/search/movie",
			options: {
				params: {
					api_key: movieDbKey,
					language: "en-US",
					page: pageParam,
					query: route.query.search as string,
				},
			},
		});
		return data;
	},
	getNextPageParam: (lastPage) => {
		if (lastPage && lastPage.page < lastPage.total_pages) {
			return lastPage.page + 1;
		}
		return undefined;
	},
});

const searchedMovies = computed(() => {
	const transformedData = allSearchedMovies.value?.pages.reduce((acc, cur) => {
		const movies = cur?.results;
		movies?.forEach((movie) => acc.push(movie));
		return acc;
	}, [] as Array<SearchedMovie>);
	return transformedData;
});

// Fetch new data when query is changed
watch(
	() => route.query.search,
	() => {
		queryClient.resetQueries({
			queryKey: ["searchedMovies"],
			exact: true,
		});
	}
);
const mainContainerRef = ref<HTMLElement | null>(null);

onMounted(() => {
	mainContainerRef.value = document.getElementById("mainContainer");
});

useInfiniteScroll(
	mainContainerRef,
	() => {
		if (route.query.search && hasNextPage && fetchStatus.value !== "fetching") {
			fetchNextSearchedMovies();
		}
	},
	{
		distance: 200,
	}
);
</script>
