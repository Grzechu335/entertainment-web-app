<template>
	<div class="flex flex-col space-y-10" ref="containerRef">
		<div class="space-y-6">
			<h1 class="heading-lg">Trending</h1>
			<VueMarquee
				:gradient="true"
				gradient-length="20%"
				:gradient-color="[16, 20, 30]"
				pauseOnHover
				:duration="60"
			>
				<MovieTrending
					:key="movie.id"
					:movie="movie"
					v-for="movie in homePageStore.getTrendingMovies.data"
				/>
			</VueMarquee>
		</div>
		<LayoutMovies
			header="Recommended for you"
			:is-loading="homePageStore.getSearchedRecommendedMovies.isLoading"
			:movies="homePageStore.getRecommendedMovies.data"
			:searchedMovies="homePageStore.getSearchedRecommendedMovies.data"
		/>
	</div>
</template>

<script setup lang="ts">
import { useHomeMovies } from "~/store/homeMovies";
const route = useRoute();
const homePageStore = useHomeMovies();

const fetchHomeMoviesFromQuery = () => {
	const query = route.query.search as string | undefined;
	homePageStore.searchRecommendedMovies(query);
};

// Fetch new data when query is changed
watch(
	() => route.query.search,
	() => {
		fetchHomeMoviesFromQuery();
	}
);
const mainContainerRef = ref<HTMLElement | null>(null);

onMounted(() => {
	mainContainerRef.value = document.getElementById("mainContainer");
	// Fetch movies when route is changed
	homePageStore.fetchHomeMovies();
	// Fetch movies when search query is available
	fetchHomeMoviesFromQuery();
});

const containerRef = ref(null);

useInfiniteScroll(
	mainContainerRef,
	() => {
		// Check if there are more pages available
		if (
			typeof homePageStore.getSearchedRecommendedMovies.totalPages === "number"
		)
			if (
				homePageStore.getSearchedRecommendedMovies.totalPages >
				homePageStore.getSearchedRecommendedMovies.currentPage
			) {
				homePageStore.addSearchedMovies(route.query.search as string);
			}
	},
	{
		distance: 100,
	}
);
</script>
