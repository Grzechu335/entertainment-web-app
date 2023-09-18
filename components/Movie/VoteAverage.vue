<template>
	<div
		v-if="movie.vote_average"
		class="absolute top-0 left-0 p-2 !font-bold text-white rounded-br-lg bg-[#E50914] heading-xs"
	>
		<span>{{ movie.vote_average.toFixed(1) }}</span>
	</div>
</template>

<script setup lang="ts">
import { Movie, SearchedMovie, SearchedTVShow, TVShow } from "~/types/Movie";

const props = defineProps<{
	movie: Movie | TVShow | SearchedMovie | SearchedTVShow;
}>();
</script>
