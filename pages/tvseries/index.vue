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
import { debounceTime } from "~/constants/constants";

let input = ref("");
const moviesStore = useMovies();
moviesStore.fetchTVSeries();

const searchTVSeriesByInput = useDebounce(() => {
	moviesStore.searchTVSeries(input.value);
}, debounceTime);

watch(input, () => {
	searchTVSeriesByInput();
});
</script>
