<template>
	<LayoutSearchBar placeholder="Search for movies" v-model="input" />
	<LayoutMovies header="Movies" :movies="moviesStore.getMovies" />
</template>

<script setup lang="ts">
import { useMovies } from "~/store/movies";
const input = ref("");
const moviesStore = useMovies();
moviesStore.fetchMovies();
</script>
