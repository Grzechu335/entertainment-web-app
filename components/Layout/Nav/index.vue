<template>
	<aside
		class="absolute top-0 left-0 w-full px-2 py-6 desktop:fixed desktop:w-auto desktop:h-full desktop:p-8 z-[999]"
	>
		<div
			class="flex flex-row p-6 transition-all duration-200 desktop:h-full bg-semi-dark-blue rounded-xl desktop:flex-col desktop:p-8 tablet:border-none"
			:class="{ 'border-[1px] border-grayish-blue/30': showBorder }"
		>
			<div
				class="flex flex-row items-center justify-between w-full h-full desktop:justify-start desktop:flex-col"
			>
				<SvgoLogoIcon
					class="w-[32px] h-[26px] text-red"
					:fontControlled="false"
				/>
				<LayoutNavItems />
				<div
					class="w-[32px] h-[32px] desktop:w-[40px] desktop:h-[40px] rounded-full bg-grayish-blue desktop:mt-auto"
				></div>
			</div>
		</div>
	</aside>
</template>

<script setup lang="ts">
const mainContainerRef = ref<HTMLElement | null>(null);
const showBorder = ref(false);

const setBorderOnScroll = (e: Event) => {
	const scrollThreshold = 100;
	if (mainContainerRef && mainContainerRef.value) {
		mainContainerRef?.value?.scrollTop > scrollThreshold
			? (showBorder.value = true)
			: (showBorder.value = false);
	}
};

onMounted(() => {
	mainContainerRef.value = document.getElementById("mainContainer");
	mainContainerRef.value?.addEventListener("scroll", setBorderOnScroll);
});
onBeforeUnmount(() => {
	mainContainerRef.value?.removeEventListener("scroll", setBorderOnScroll);
});
</script>
