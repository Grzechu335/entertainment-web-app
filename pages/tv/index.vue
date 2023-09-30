<template>
	<div>
		<LayoutMovies
			header="TV Series"
			:is-loading="tvSeriesStore.searchedTVSeries.isLoading"
			:movies="tvSeriesStore.getTVSeries.data"
			:searched-movies="tvSeriesStore.getSearchedTVSeries.data"
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

// Fetch TV Series when route is changed
onMounted(() => {
	tvSeriesStore.fetchTVSeries();
	searchTVSeriesFromQuery();
});
</script>
