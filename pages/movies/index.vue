<template>
	<div>
		<LayoutMovies
			header="Movies"
			:isLoading="moviesStore.getSearchedMovies.isLoading"
			:searchedMovies="moviesStore.getSearchedMovies.data"
			:movies="moviesStore.getMovies.data"
		/>
	</div>
</template>

<script setup lang="ts">
import { useMovies } from "~/store/movies";
const route = useRoute();
const moviesStore = useMovies();

const fetchMoviesFromQuery = () => {
	const query = route.query.search as string | undefined;
	moviesStore.searchMovies(query);
};

// Fetch new data when query is changed
watch(() => route.query.search, fetchMoviesFromQuery);

// Fetch movies when route is changed
onMounted(() => {
	moviesStore.fetchMovies();
	fetchMoviesFromQuery();
});
</script>
