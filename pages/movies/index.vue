<template>
	<div>
		<LayoutSearchBar placeholder="Search for movies" v-model="input" />
		<LayoutMovies
			header="Movies"
			:notFound="moviesStore.getSearchedMovies.notFound"
			:isLoading="moviesStore.getSearchedMovies.isLoading"
			:inputLength="input.length"
			:movies="
				input === ''
					? moviesStore.getMovies.data
					: moviesStore.getSearchedMovies.data
			"
		/>
	</div>
</template>

<script setup lang="ts">
import { debounceTime } from "~/constants/constants";
import { useMovies } from "~/store/movies";

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
