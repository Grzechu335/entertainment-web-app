<template>
	<div>
		<LayoutMovies
			header="Movies"
			:isLoading="moviesStore.getSearchedMovies.isLoading"
			:searchedMovies="moviesStore.getSearchedMovies.data"
			:movies="moviesStore.getMovies.data"
			:totalPages="moviesStore.getSearchedMovies.totalPages"
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

const mainContainerRef = ref<HTMLElement | null>(null);

// Fetch movies when route is changed
onMounted(() => {
	mainContainerRef.value = document.getElementById("mainContainer");

	moviesStore.fetchMovies();
	fetchMoviesFromQuery();
});

useInfiniteScroll(
	mainContainerRef,
	() => {
		// Check if there are more pages available
		if (typeof moviesStore.getSearchedMovies.totalPages === "number")
			if (
				moviesStore.getSearchedMovies.totalPages >
				moviesStore.getSearchedMovies.currentPage
			) {
				moviesStore.addMovies(route.query.search as string);
			}
	},
	{
		distance: 200,
	}
);
</script>
