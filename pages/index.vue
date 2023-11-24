<template>
	<div class="flex flex-col space-y-10">
		<div class="space-y-6">
			<h1 class="heading-lg">Trending</h1>
			<Vue3Marquee
				:gradient="true"
				gradient-length="20%"
				:gradient-color="[16, 20, 30]"
				pauseOnHover
				:duration="60"
			>
				<MovieTrending
					:key="movie.id"
					:movie="movie"
					v-for="movie in recommendedMovies?.results.slice(0, 5)"
				/>
			</Vue3Marquee>
		</div>
		<LayoutMovies
			header="Recommended for you"
			:is-loading="fetchStatus === 'fetching'"
			:movies="recommendedMovies?.results"
			:searchedMovies="searchedMovies"
			:not-found="allSearchedMovies?.pages.slice(-1).pop()?.total_results === 0"
		/>
	</div>
</template>

<script setup lang="ts">
import { Vue3Marquee } from "vue3-marquee";
import {
	useInfiniteQuery,
	useQuery,
	useQueryClient,
} from "@tanstack/vue-query";
import { fetchData } from "~/utils/fetchData";
import { Movie, SearchedMovie, SearchedTVShow, TVShow } from "~/types/Movie";

const route = useRoute();
const queryClient = useQueryClient();

onServerPrefetch(async () => {
	await suspense();
});

const {
	public: { movieDbKey },
} = useRuntimeConfig();

const { data: recommendedMovies, suspense } = useQuery({
	queryKey: ["recommendedHomeMovies"],
	queryFn: async () => {
		const data = await fetchData<Array<Movie | TVShow>>({
			url: "https://api.themoviedb.org/3/trending/all/day?",
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
	fetchNextPage: fetchNextSearchedHomeMovies,
	fetchStatus,
	hasNextPage,
} = useInfiniteQuery({
	initialPageParam: 1,
	queryKey: ["searchedHomeMovies"],
	queryFn: async ({ pageParam }) => {
		if (!route.query.search) return;
		const data = await fetchData<Array<SearchedMovie | SearchedTVShow>>({
			url: "https://api.themoviedb.org/3/search/multi?",
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
	}, [] as Array<SearchedMovie | SearchedTVShow>);
	return transformedData;
});

// Fetch new data when query is changed
watch(
	() => route.query.search,
	() => {
		queryClient.resetQueries({
			queryKey: ["searchedHomeMovies"],
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
			fetchNextSearchedHomeMovies();
		}
	},
	{
		distance: 200,
	}
);
</script>
