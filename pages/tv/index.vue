<template>
	<div>
		<LayoutMovies
			header="TV Series"
			:is-loading="tvSeriesStore.searchedTVSeries.isLoading"
			:movies="tvSeriesStore.getTVSeries.data"
			:searched-movies="tvSeriesStore.getSearchedTVSeries.data"
			:total-pages="tvSeriesStore.getSearchedTVSeries.totalPages"
		/>
	</div>
</template>

<script setup lang="ts">
import { useTVSeries } from "~/store/tvSeries";
const route = useRoute();
const tvSeriesStore = useTVSeries();

const searchTVSeriesFromQuery = () => {
	const query = route.query.search as string | undefined;
	tvSeriesStore.searchTVSeries(query);
};

// Fetch new data when query is changed
watch(() => route.query.search, searchTVSeriesFromQuery);

const mainContainerRef = ref<HTMLElement | null>(null);

// Fetch TV Series when route is changed
onMounted(() => {
	mainContainerRef.value = document.getElementById("mainContainer");
	tvSeriesStore.fetchTVSeries();
	searchTVSeriesFromQuery();
});

useInfiniteScroll(
	mainContainerRef,
	() => {
		// Check if there are more pages available
		if (typeof tvSeriesStore.getSearchedTVSeries.totalPages === "number")
			if (
				tvSeriesStore.getSearchedTVSeries.totalPages >
				tvSeriesStore.getSearchedTVSeries.currentPage
			) {
				tvSeriesStore.addTVSeries(route.query.search as string);
			}
	},
	{
		distance: 200,
	}
);
</script>
