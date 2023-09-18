<template>
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
</template>

<script setup lang="ts">
import { Movie, SearchedMovie, SearchedTVShow, TVShow } from "~/types/Movie";

const movieDate = computed(() => {
	let movieDate = "title" in props.movie && props.movie.release_date;
	let tvShowDate = "name" in props.movie && props.movie.first_air_date;
	if (movieDate) return new Date(movieDate).getFullYear();
	if (tvShowDate) return new Date(tvShowDate).getFullYear();
});
const props = defineProps<{
	movie: Movie | TVShow | SearchedMovie | SearchedTVShow;
}>();
</script>
