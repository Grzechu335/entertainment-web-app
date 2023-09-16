<template>
	<LayoutSearchBar placeholder="Search for TV Series" v-model="input" />
	<LayoutMovies
		header="TV Series"
		:movies="
			input === '' ? moviesStore.getTVSeries : moviesStore.getSearchedTVSeries
		"
	/>
</template>

<script setup lang="ts">
import { useMovies } from "~/store/movies";
let input = ref("");
const moviesStore = useMovies();
moviesStore.fetchTVSeries();

const searchTVSeriesByInput = useDebounce(() => {
	moviesStore.searchTVSeries(input.value);
}, 500);

watch(input, () => {
	searchTVSeriesByInput();
});
</script>
