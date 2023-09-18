<template>
	<div class="h-[220px] tablet:h-[140px] desktop:h-[230px] w-full">
		<NuxtImg
			v-if="movie.backdrop_path"
			class="object-cover w-full h-full rounded-lg -z-10"
			:src="`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`"
		/>
		<div v-else class="grid w-full h-full place-content-center">
			<NuxtImg
				class="w-full h-full mx-auto my-auto rounded-lg -z-10"
				src="/noImage.png"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Movie, SearchedMovie, SearchedTVShow, TVShow } from "~/types/Movie";

const props = defineProps<{
	movie: Movie | TVShow | SearchedMovie | SearchedTVShow;
}>();
</script>
