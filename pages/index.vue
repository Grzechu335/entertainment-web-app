<template>
	<div>
		<div class="flex flex-col space-y-10">
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
watch(() => route.query.search, fetchHomeMoviesFromQuery);

// Fetch movies when route is changed
onMounted(() => {
	homePageStore.fetchHomeMovies();
	fetchHomeMoviesFromQuery();
});
</script>
