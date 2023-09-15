<template>
	<div
		class="relative group w-[470px] h-[230px] flex-shrink-0 rounded-lg overflow-hidden"
	>
		<NuxtImg
			class="absolute object-cover w-full h-full -z-10"
			:src="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`"
		/>
		<div
			class="flex flex-col justify-end w-full h-full p-6 bg-gradient-to-b from-dark-blue/20 to-dark-blue/70"
		>
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
			<NuxtIcon id="bookmarkIcon" name="favoritesIcon" filled />
			<p class="inline-flex items-center space-x-2 text-white/75">
				<span>{{ movie.release_date }}</span>
				<Icon name="bi:dot" color="#ffffff75" size="20" />
				<NuxtIcon v-if="movie.media_type === 'movie'" name="movieIcon" />
				<NuxtIcon v-else name="TVIcon" />
				<span>{{ movie.media_type === "movie" ? "Movie" : "TV Series" }}</span>
				<Icon name="bi:dot" color="#ffffff75" size="20" />
				<span>{{ movie.adult ? "18+" : "PG" }}</span>
			</p>
			<p class="heading-sm">{{ movie.title }}</p>
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
