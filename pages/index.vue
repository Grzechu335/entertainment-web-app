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
					v-for="movie in homePageStore.getTrendingMovies.data"
				/>
			</Vue3Marquee>
		</div>
		<LayoutMovies
			header="Recommended for you"
			:is-loading="homePageStore.getSearchedRecommendedMovies.isLoading"
			:movies="homePageStore.getRecommendedMovies.data"
			:searchedMovies="homePageStore.getSearchedRecommendedMovies.data"
			:total-pages="homePageStore.getSearchedRecommendedMovies.totalPages"
		/>
	</div>
</template>

<script setup lang="ts">
import { Vue3Marquee } from "vue3-marquee";
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

useInfiniteScroll(
	mainContainerRef,
	() => {
		// Check if there are more pages available
		if (
			homePageStore.getSearchedRecommendedMovies.totalPages >
			homePageStore.getSearchedRecommendedMovies.currentPage
		) {
			homePageStore.addSearchedMovies(route.query.search as string);
		}
	},
	{
		distance: 200,
	}
);
</script>
