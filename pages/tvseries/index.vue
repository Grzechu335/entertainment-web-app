<template>
	<div>
		<LayoutSearchBar placeholder="Search for TV Series" v-model="input" />
		<LayoutMovies
			:is-loading="tvSeriesStore.searchedTVSeries.isLoading"
			header="TV Series"
			:movies="tvSeriesStore.getTVSeries.data"
			:searched-movies="tvSeriesStore.getSearchedTVSeries.data"
		/>
	</div>
</template>

<script setup lang="ts">
import { debounceTime } from "~/constants/constants";
import { useTVSeries } from "~/store/tvSeries";

let input = ref("");
const tvSeriesStore = useTVSeries();
tvSeriesStore.fetchTVSeries();

const searchTVSeriesByInput = useDebounce(() => {
	tvSeriesStore.searchTVSeries(input.value);
}, debounceTime);

watch(input, () => {
	searchTVSeriesByInput();
});
</script>
