<template>
	<div>
		<LayoutSearchBar
			placeholder="Search for movies or TV Series"
			v-model="input"
		/>
		<div class="flex flex-col space-y-10">
			<div class="-mr-6 space-y-6">
				<h1 class="heading-lg">Trending</h1>
				<div class="flex pr-6 space-x-6 overflow-x-scroll scrollbar-none">
					<MovieTrending
						:movie="movie"
						v-for="movie in moviesStore.getTrending"
					/>
				</div>
			</div>
			<LayoutMovies
				header="Recommended for you"
				:movies="
					input === '' ? moviesStore.getRecommended : moviesStore.getSearchedAll
				"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useMovies } from "~/store/movies";
import { debounceTime } from "~/constants/constants";
const moviesStore = useMovies();
moviesStore.fetchTrendingMovies();

let input = ref("");

const searchAllByInput = useDebounce(() => {
	moviesStore.searchAll(input.value);
}, debounceTime);

watch(input, () => {
	searchAllByInput();
});
</script>
