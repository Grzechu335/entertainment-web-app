import { LayoutNavItems } from '#build/components';
<template>
	<aside
		class="fixed top-0 left-0 w-full p-6 desktop:w-auto desktop:h-full desktop:p-8"
	>
		<div
			class="flex flex-row p-6 desktop:h-full bg-semi-dark-blue rounded-xl desktop:flex-col desktop:p-8"
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
