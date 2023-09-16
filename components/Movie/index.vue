<template>
	<div class="relative flex flex-col flex-shrink-0 space-y-2 group">
		<div class="relative overflow-hidden rounded-lg group">
			<SvgoFavoritesIcon
				:fontControlled="false"
				class="absolute w-[32px] h-[32px] top-4 right-6 cursor-pointer hover:fill-white z-10"
				filled
			/>
			<NuxtImg
				class="object-cover w-full h-full rounded-lg -z-10"
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
			<p
				class="inline-flex items-center space-x-[1px] tablet:space-x-1 body-sm text-white/75"
			>
				<span>{{
					movie.media_type === "movie"
						? movie.release_date
						: movie.first_air_date
				}}</span>
				<Icon name="bi:dot" color="#ffffff75" size="20" />
				<SvgoMovieIcon
					class="w-[12px] h-[12px]"
					v-if="movie.media_type === 'movie'"
					:fontControlled="false"
				/>
				<SvgoTVIcon class="w-[12px] h-[12px]" v-else :fontControlled="false" />
				<span v-if="movie.media_type === 'movie'">Movie</span>
				<span v-else>TV <span class="hidden desktop:inline">Series</span></span>
				<Icon name="bi:dot" color="#ffffff75" size="20" />
				<span>{{ movie.adult ? "18+" : "PG" }}</span>
			</p>
			<p class="truncate heading-xs">
				{{ movie.media_type === "movie" ? movie.title : movie.name }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Movie, TVShow } from "~/types/Movie";

defineProps<{
	movie: Movie | TVShow;
}>();
</script>
