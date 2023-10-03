<template>
	<div
		class="flex flex-row items-center space-y-0 space-x-5 tablet:space-x-7 desktop:space-x-0 desktop:space-y-10 desktop:flex-col desktop:mt-[75px]"
	>
		<NuxtLink class="cursor-pointer" :to="homePageRoute"
			><SvgoTrendingIcon
				class="relative top-1 desktop:static w-[28px] h-[28px]"
				:class="$route.path === '/' ? 'text-white' : 'text-grayish-blue'"
				:fontControlled="false"
		/></NuxtLink>
		<NuxtLink class="cursor-pointer" :to="moviesRoute"
			><SvgoMovieIcon
				class="w-[20px] h-[20px]"
				:class="$route.path === '/movies' ? 'text-white' : 'text-grayish-blue'"
				:fontControlled="false"
		/></NuxtLink>
		<NuxtLink class="cursor-pointer" :to="tvSeriesRoute"
			><SvgoTVIcon
				class="relative bottom-[1px] desktop:static w-[22px] h-[22px]"
				:class="$route.path === '/tv' ? 'text-white' : 'text-grayish-blue'"
				:fontControlled="false"
		/></NuxtLink>
	</div>
</template>

<script lang="ts" setup>
import type { RouteLocationRaw } from "#vue-router";
const route = useRoute();

let homePageRoute = ref<Partial<RouteLocationRaw>>({
	path: "/",
});
let moviesRoute = ref<Partial<RouteLocationRaw>>({
	path: "/movies",
});
let tvSeriesRoute = ref<Partial<RouteLocationRaw | undefined>>({
	path: "/tv",
});

watch(
	() => route.query,
	() => {
		homePageRoute.value = {
			path: "/",
			query: route.query,
		};
		moviesRoute.value = {
			path: "/movies",

			query: route.query,
		};
		tvSeriesRoute.value = {
			path: "/tv",
			query: route.query,
		};
	}
);
</script>
