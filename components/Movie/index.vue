<template>
	<div class="flex flex-col justify-end flex-shrink-0 space-y-2 group">
		<div class="relative w-full h-full overflow-hidden rounded-lg group">
			<div
				v-if="movie.vote_average"
				class="absolute top-0 left-0 p-2 !font-bold text-white rounded-br-lg bg-[#E50914] heading-xs"
			>
				<span>{{ movie.vote_average.toFixed(1) }}</span>
			</div>
			<SvgoFavoritesIcon
				:fontControlled="false"
				class="absolute w-[32px] h-[32px] top-4 right-6 cursor-pointer hover:fill-white z-10"
				filled
			/>
			<NuxtImg
				v-if="movie.backdrop_path"
				class="object-cover w-full h-full rounded-lg -z-10"
				:src="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`"
			/>
			<div v-else class="grid w-full h-full place-content-center">
				<NuxtImg class="mx-auto my-auto rounded-lg -z-10" src="/noImage.png" />
			</div>
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
				<span>{{ movieDate }}</span>
				<Icon name="bi:dot" color="#ffffff75" size="20" />
				<SvgoMovieIcon
					class="w-[12px] h-[12px]"
					v-if="'title' in movie"
					:fontControlled="false"
				/>
				<SvgoTVIcon class="w-[12px] h-[12px]" v-else :fontControlled="false" />
				<span v-if="'title' in movie">Movie</span>
				<span v-else>TV <span class="hidden desktop:inline">Series</span></span>
				<Icon name="bi:dot" color="#ffffff75" size="20" />
				<span>{{ movie.adult ? "18+" : "PG" }}</span>
			</p>
			<p class="truncate heading-xs">
				{{ "title" in movie ? movie.title : movie.name }}
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Movie, SearchedMovie, SearchedTVShow, TVShow } from "~/types/Movie";

const movieDate = computed(() => {
	let movieDate = "title" in props.movie && props.movie.release_date;
	let tvShowDate = "name" in props.movie && props.movie.first_air_date;
	if (isNaN(Number(movieDate)) || isNaN(Number(tvShowDate))) return "Unknown";
	if (movieDate) return movieDate;
	else return tvShowDate;
});
const props = defineProps<{
	movie: Movie | TVShow | SearchedMovie | SearchedTVShow;
}>();
</script>
