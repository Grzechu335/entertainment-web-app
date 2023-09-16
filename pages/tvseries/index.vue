<template>
	<LayoutSearchBar placeholder="Search for TV Series" v-model="input" />
	<LayoutMovies header="TV Series" :movies="moviesStore.getTVSeries" />
</template>

<script setup lang="ts">
import { useMovies } from "~/store/movies";
let input = ref("");
const moviesStore = useMovies();
moviesStore.fetchTVSeries();
</script>
