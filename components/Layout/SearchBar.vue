<template>
	<label class="flex items-center w-full py-4">
		<Icon
			name="simple-line-icons:magnifier"
			color="white"
			size="28px"
			class="mr-6"
		/>
		<input
			type="text"
			:placeholder="placeholder"
			class="bg-transparent rounded-none heading-md w-full active:text-white py-4 text-white/50 focus:outline-none caret-red focus:border-b-[1px] focus:border-b-grayish-blue"
			:value="modelValue"
			@input="
				$emit('update:modelValue', ($event.target as HTMLInputElement).value)
			"
		/>
	</label>
</template>

<script setup lang="ts">
defineProps<{
	modelValue: string;
	placeholder: string;
}>();
</script>
