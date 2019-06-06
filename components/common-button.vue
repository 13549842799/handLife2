<template>
	<button class="text-btn" :plain="true" size="mini" @tap="touchEvent"><slot></slot></button>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			touchEvent () {
				this.$emit('MyClick')
			}
		}
	}
</script>

<style>
	.text-btn {
		border: 0upx;
		margin: 0upx 10upx;
		padding: 0upx;
	}
</style>
