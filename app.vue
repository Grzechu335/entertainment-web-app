<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
	overflow-x: hidden;
}
.page-enter-from {
	overflow: hidden;
	transform: translateX(-100%);
	opacity: 0;
}
.page-leave-to {
	overflow: hidden;
	transform: translateX(100%);
	opacity: 0;
}
</style>
