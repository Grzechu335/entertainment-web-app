<template>
	<ClientOnly>
		<div class="relative space-y-6">
			<Transition>
				<h1 class="relative heading-lg">
					&#8205;
					<Transition name="movieLayout">
						<span
							class="absolute"
							v-if="typeof route.query.search === 'undefined'"
							>{{ header }}</span
						>
						<span class="absolute" v-else>Searched</span>
					</Transition>
				</h1>
			</Transition>
			<div v-if="typeof route.query.search === 'undefined'">
				<div
					class="grid grid-flow-row grid-cols-1 gap-4 tablet:gap-7 desktop:gap-10 tablet:grid-cols-3 desktop:grid-cols-4"
				>
					<Movie :movie="movie" v-for="movie in movies" />
				</div>
			</div>
			<Transition name="movieLayout">
				<div v-if="notFound">
					<p
						class="absolute text-2xl font-bold text-center text-white tablet:text-4xl"
					>
						Not found
					</p>
				</div>
				<div
					v-else
					class="grid grid-flow-row grid-cols-1 gap-4 tablet:gap-7 desktop:gap-10 tablet:grid-cols-3 desktop:grid-cols-4"
				>
					<Movie :movie="movie" v-for="movie in searchedMovies" />
					<div
						v-if="isLoading"
						class="grid mt-6 col-span-full place-content-center"
					>
						<Spinner />
					</div>
				</div>
			</Transition>
		</div>
	</ClientOnly>
</template>

<script setup lang="ts">
import type {
	Movie,
	SearchedMovie,
	SearchedTVShow,
	TVShow,
} from "~/types/Movie";

defineProps<{
	movies: Array<Movie | TVShow> | undefined;
	searchedMovies: Array<SearchedMovie | SearchedTVShow> | undefined;
	header: string;
	isLoading: boolean;
	notFound: boolean;
}>();

const route = useRoute();
</script>

<style scoped>
.movieLayout-enter-active,
.movieLayout-leave-active {
	transition: opacity 0.2s ease-in-out;
}

.movieLayout-enter-from,
.movieLayout-leave-to {
	opacity: 0;
}
</style>
