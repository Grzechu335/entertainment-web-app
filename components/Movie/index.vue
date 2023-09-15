<template>
	<div class="relative flex flex-col flex-shrink-0 space-y-2 group">
		<div class="group relative w-[280px] h-[174px] rounded-lg overflow-hidden">
			<NuxtIcon id="bookmarkIcon" name="favoritesIcon" filled />
			<NuxtImg
				class="object-cover w-full rounded-lg -z-10"
				:src="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`"
			/>
			<div
				class="absolute top-0 left-0 grid w-full h-full transition-opacity duration-200 opacity-0 place-content-center group-hover:opacity-100 bg-dark-blue/60"
			>
				<button
					class="flex items-center justify-between h-12 p-2 pr-6 rounded-full bg-white/25 heading-xs"
				>
					<Icon name="carbon:play-filled" color="#fff" size="30" class="mr-5" />
					<span>Play</span>
				</button>
			</div>
		</div>
		<div>
			<p class="inline-flex items-center space-x-1 body-sm text-white/75">
				<span>{{
					movie.release_date !== "NaN" ? movie.release_date : "Unknown"
				}}</span>
				<Icon name="bi:dot" color="#ffffff75" size="20" />
				<NuxtIcon v-if="movie.media_type === 'movie'" name="movieIcon" />
				<NuxtIcon v-else name="TVIcon" />
				<span>{{ movie.media_type === "movie" ? "Movie" : "TV Series" }}</span>
				<Icon name="bi:dot" color="#ffffff75" size="20" />
				<span>{{ movie.adult ? "18+" : "PG" }}</span>
			</p>
			<p class="heading-xs">{{ movie.title }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Movie } from "~/types/Movie";

defineProps<{
	movie: Movie;
}>();
</script>

<style scoped>
#bookmarkIcon svg {
	z-index: 10;
	cursor: pointer;
	width: 32px;
	height: 32px;
	position: absolute;
	top: 16px;
	right: 24px;
	transition: all 0.5s;
	-webkit-transition: all 0.5s;
	-moz-transition: all 0.5s;
	-o-transition: all 0.5s;
	&:hover {
		fill: white;
		fill-opacity: 20%;
	}
}
</style>
