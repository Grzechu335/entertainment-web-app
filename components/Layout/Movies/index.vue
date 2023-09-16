<template>
	<div class="space-y-6">
		<h1 class="heading-lg">{{ header }}</h1>
		<div
			class="grid grid-cols-2 gap-4 tablet:gap-7 desktop:gap-10 tablet:grid-cols-3 desktop:grid-cols-4"
		>
			<Movie v-if="movies" :movie="movie" v-for="movie in movies" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Movie, TVShow } from "~/types/Movie";

defineProps<{
	movies: Array<Movie | TVShow> | null;
	header: string;
}>();
</script>
