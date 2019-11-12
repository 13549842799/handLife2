<template>
	<view></view>
</template>

<script>
	
	import targetPlanApi from '../../../api/target/targetPlan.js'
	
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad(option) {
			let targetId = option.id, v = this
			//targetPlanApi.getTargetList
		}
	}
</script>

<style>
</style>
