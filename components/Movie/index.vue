<template>
	<div class="grid grid-cols-1 gap-2 group">
		<div class="relative w-full h-full overflow-hidden rounded-lg">
			<MovieVoteAverage :movie="movie" />
			<MovieFavoritesButton />
			<MovieImage :movie="movie" />
			<MovieHover />
		</div>
		<MovieDescription :movie="movie" />
	</div>
</template>

<script setup lang="ts">
import { Movie, SearchedMovie, SearchedTVShow, TVShow } from "~/types/Movie";

const props = defineProps<{
	movie: Movie | TVShow | SearchedMovie | SearchedTVShow;
}>();
</script>
