<template>
	<div>
		<LayoutMovies
			header="TV Series"
			:is-loading="fetchStatus === 'fetching'"
			:movies="tvSeries?.results"
			:searched-movies="searchedTVSeries"
			:not-found="
				allSearchedTVSeries?.pages.slice(-1).pop()?.total_results === 0
			"
		/>
	</div>
</template>

<script setup lang="ts">
import {
	useInfiniteQuery,
	useQuery,
	useQueryClient,
} from "@tanstack/vue-query";
import { SearchedTVShow, TVShow } from "~/types/Movie";

const route = useRoute();
const queryClient = useQueryClient();

onServerPrefetch(async () => {
	await suspense();
});

const {
	public: { movieDbKey },
} = useRuntimeConfig();

const { data: tvSeries, suspense } = useQuery({
	queryKey: ["tvSeries"],
	queryFn: async () => {
		const data = await fetchData<Array<TVShow>>({
			url: "https://api.themoviedb.org/3/trending/tv/day?",
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
	data: allSearchedTVSeries,
	fetchNextPage: fetchNextSearchedTVSeries,
	fetchStatus,
	hasNextPage,
} = useInfiniteQuery({
	initialPageParam: 1,
	queryKey: ["searchedTVSeries"],
	queryFn: async ({ pageParam }) => {
		if (!route.query.search) return;
		const data = await fetchData<Array<SearchedTVShow>>({
			url: "https://api.themoviedb.org/3/search/tv",
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

const searchedTVSeries = computed(() => {
	const transformedData = allSearchedTVSeries.value?.pages.reduce(
		(acc, cur) => {
			const tvSeries = cur?.results;
			tvSeries?.forEach((movie) => acc.push(movie));
			return acc;
		},
		[] as Array<SearchedTVShow>
	);
	return transformedData;
});

// Fetch new data when query is changed
watch(
	() => route.query.search,
	() => {
		queryClient.resetQueries({
			queryKey: ["searchedTVSeries"],
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
			fetchNextSearchedTVSeries();
		}
	},
	{
		distance: 200,
	}
);
</script>
