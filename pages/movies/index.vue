<template>
	<LayoutSearchBar placeholder="Search for movies" v-model="input" />
	<LayoutMovies
		header="Movies"
		:movies="
			input === '' ? moviesStore.getMovies : moviesStore.getSearchedMovies
		"
	/>
</template>

<script setup lang="ts">
import { useMovies } from "~/store/movies";
import { debounceTime } from "~/constants/constants";

const input = ref("");
const moviesStore = useMovies();
moviesStore.fetchMovies();

const searchMoviesByInput = useDebounce(() => {
	moviesStore.searchMovies(input.value);
}, debounceTime);

watch(input, () => {
	searchMoviesByInput();
});
</script>
