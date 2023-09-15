<template>
	<div>
		<aside class="fixed top-0 left-0 h-full p-8">
			<div class="rounded-[20px] w-24 bg-semi-dark-blue h-full">
				<div class="flex flex-col items-center justify-between py-9">
					<div>
						<NuxtIcon id="logoIcon" name="logoIcon" filled />
						<NuxtIcon id="trendingIcon" name="trendingIcon" filled />
						<NuxtIcon id="movieIcon" name="movieIcon" filled />
						<NuxtIcon id="TVIcon" name="TVIcon" filled />
						<NuxtIcon id="bookmarkIcon" name="bookmarkIcon" filled />
					</div>
				</div>
			</div>
		</aside>
		<!-- <LayoutSearchBar v-model="input" />
		<div class="flex space-x-10 overflow-x-scroll scrollbar-none">
			<MovieTrending
				:movie="movie"
				v-for="movie in moviesStore.getTrendingMovies"
			/>
		</div>
		<div class="grid grid-cols-4 gap-10">
			<Movie v-for="movie in moviesStore.getTestMovies" :movie="movie" />
		</div> -->
	</div>
</template>

<script setup lang="ts">
import { useMovies } from "./store/trendingMovies";

let input = ref("");

const moviesStore = useMovies();

onMounted(() => {
	moviesStore.fetchTrendingMovies();
});
</script>

<style scoped>
#logoIcon svg {
	width: 32px;
	height: 32px;
}
.nuxt-icon svg {
	width: 20px;
	height: 20px;
}
</style>
