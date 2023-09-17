<template>
	<div
		class="flex flex-row items-center space-y-0 space-x-5 tablet:space-x-7 desktop:space-x-0 desktop:space-y-10 desktop:flex-col desktop:mt-[75px]"
	>
		<NuxtLink to="/"
			><SvgoTrendingIcon
				class="relative top-1 desktop:static w-[28px] h-[28px]"
				:class="$route.path === '/' ? 'text-white' : 'text-grayish-blue'"
				:fontControlled="false"
		/></NuxtLink>
		<NuxtLink to="/movies"
			><SvgoMovieIcon
				class="w-[20px] h-[20px]"
				:class="$route.path === '/movies' ? 'text-white' : 'text-grayish-blue'"
				:fontControlled="false"
		/></NuxtLink>
		<NuxtLink to="/tvseries"
			><SvgoTVIcon
				class="relative bottom-[1px] desktop:static w-[22px] h-[22px]"
				:class="
					$route.path === '/tvseries' ? 'text-white' : 'text-grayish-blue'
				"
				:fontControlled="false"
		/></NuxtLink>
		<NuxtLink to="bookmarked">
			<SvgoBookmarkIcon
				class="relative top-1 desktop:static w-[30px] h-[30px]"
				:class="
					$route.path === '/bookmarked' ? '!text-white' : 'text-grayish-blue'
				"
				:fontControlled="false"
			/>
		</NuxtLink>
	</div>
</template>
