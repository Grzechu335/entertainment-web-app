<template>
	<div
		class="relative group w-[240px] tablet:w-[470px] h-[140px] tablet:h-[230px] flex-shrink-0 rounded-lg overflow-hidden"
	>
		<NuxtImg
			class="absolute object-cover w-full h-full -z-10"
			:src="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`"
		/>
		<div
			class="absolute top-0 left-0 p-2 !font-bold text-white rounded-br-lg bg-[#E50914] heading-xs"
		>
			<span>{{ movie.vote_average.toFixed(1) }}</span>
		</div>
		<div
			class="flex flex-col justify-end w-full h-full p-4 tablet:p-6 bg-gradient-to-b from-dark-blue/20 to-dark-blue/70"
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
			<SvgoFavoritesIcon
				:fontControlled="false"
				class="absolute w-[32px] h-[32px] top-4 right-6 cursor-pointer hover:fill-white"
				filled
			/>
			<p
				class="inline-flex items-center space-x-[1px] tablet:space-x-2 text-white/75 body-sm"
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
				<span>{{ movie.media_type === "movie" ? "Movie" : "TV Series" }}</span>
				<Icon name="bi:dot" color="#ffffff75" size="20" />
				<span>{{ movie.adult ? "18+" : "PG" }}</span>
			</p>
			<p class="heading-sm">
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
