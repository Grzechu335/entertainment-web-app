<template>
	<div>
		<LayoutSearchBar
			placeholder="Search for movies or TV Series"
			v-model="input"
		/>
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
						v-for="movie in moviesStore.getTrendingMovies.data"
					/>
				</VueMarquee>
			</div>
			<LayoutMovies
				header="Recommended for you"
				:is-loading="moviesStore.getSearchedRecommendedMovies.isLoading"
				:movies="moviesStore.getRecommendedMovies.data"
				:searchedMovies="moviesStore.getSearchedRecommendedMovies.data"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { debounceTime } from "~/constants/constants";
import { useHomeMovies } from "~/store/homeMovies";
const moviesStore = useHomeMovies();
moviesStore.fetchHomeMovies();

let input = ref("");

const searchRecommendedByInput: () => Promise<any> = useDebounce(() => {
	moviesStore.searchRecommendedMovies(input.value);
}, debounceTime);

watch(input, () => {
	searchRecommendedByInput();
});
</script>
