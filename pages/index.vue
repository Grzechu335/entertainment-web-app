<template>
	<div>
		<LayoutSearchBar
			placeholder="Search for movies or TV Series"
			v-model="input"
		/>
		<div class="flex flex-col space-y-10">
			<div class="-mr-6 space-y-6">
				<h1 class="heading-lg">Trending</h1>
				<div class="flex pr-6 space-x-6 overflow-x-scroll scrollbar-none">
					<MovieTrending
						:movie="movie"
						v-for="movie in moviesStore.getTrending"
					/>
				</div>
			</div>
			<LayoutMovies
				header="Recommended for you"
				:movies="moviesStore.getRecommended"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useMovies } from "~/store/movies";
let input = ref("");

const moviesStore = useMovies();
moviesStore.fetchTrendingMovies();
</script>
