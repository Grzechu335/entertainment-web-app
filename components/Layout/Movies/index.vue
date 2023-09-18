<template>
	<div class="space-y-6">
		<h1 class="heading-lg">{{ header }}</h1>
		<div v-if="!isLoading">
			<div v-if="notFound && inputLength !== 0">
				<p class="text-4xl font-bold text-white">Not found</p>
			</div>
			<div
				v-else
				class="grid grid-flow-row grid-cols-1 gap-4 tablet:gap-7 desktop:gap-10 tablet:grid-cols-3 desktop:grid-cols-4"
			>
				<Movie :movie="movie" v-for="movie in movies" />
			</div>
		</div>
		<Spinner v-else />
	</div>
</template>

<script setup lang="ts">
import type {
	Movie,
	SearchedMovie,
	SearchedTVShow,
	TVShow,
} from "~/types/Movie";

defineProps<{
	movies: Array<Movie | TVShow> | Array<SearchedMovie | SearchedTVShow> | null;
	header: string;
	isLoading: boolean;
	notFound: boolean;
	inputLength: number;
}>();
</script>
