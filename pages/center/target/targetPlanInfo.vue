<template>
	<view class="view-padding-container"></view>
</template>

<script>
	export default {
		data() {
			return {
				plan: {}
			}
		},
		onLoad(option) {
			let v = this
			let id = option.id
			console.log(v.type)
		}
	}
</script>

<style>
</style>
