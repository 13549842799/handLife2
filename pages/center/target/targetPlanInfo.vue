<template>
	<view class="view-padding-container"></view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'read'
			}
		},
		onLoad(option) {
			let v = this
			v.type = option.type
		}
	}
</script>

<style>
</style>
