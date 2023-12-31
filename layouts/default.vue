<template>
	<div>
		<LayoutNav />
		<main
			id="mainContainer"
			class="desktop:pl-[164px] desktop:pt-8 desktop:pr-6 pt-[128px] px-6 pb-6 desktop:pb-8 overflow-y-auto h-screen overflow-x-hidden"
		>
			<LayoutSearchBar v-model="input" :placeholder="dynamicPlaceholder" />
			<div>
				<slot />
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import { debounceTime } from "~/constants/constants";

const route = useRoute();
const router = useRouter();

const input = ref("");
const dynamicPlaceholder = ref("");

watch(
	() => route.path,
	(to, from) => {
		const scrolledMoviesContainer = document.getElementById("mainContainer");
		if (scrolledMoviesContainer) {
			scrolledMoviesContainer.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	}
);

// Function setting the placeholder value depending on the active route
const setPlaceholder = () => {
	if (route.path === "/tvSeries") {
		dynamicPlaceholder.value = "Search for TV Series";
	} else if (route.path === "/movies") {
		dynamicPlaceholder.value = "Search for movies";
	} else dynamicPlaceholder.value = "Search for movies or TV Series";
};

// Function that redirects to the router without a query when the input value is empty
const setPath = useDebounce(() => {
	if (input.value.trim() !== "")
		router.push({
			path: route.path,
			query: {
				search: input.value,
			},
		});
	else {
		router.push({
			path: route.path,
		});
	}
}, debounceTime);

onMounted(() => {
	setPlaceholder();
	const query = route.query.search as string;
	if ("search" in route.query) {
		input.value = query;
	}
});

watch(
	() => route.path,
	() => {
		setPath();
		setPlaceholder();
	}
);

watch(input, () => {
	setPath();
});
</script>
