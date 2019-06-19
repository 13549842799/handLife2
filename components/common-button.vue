<template>
	<button class="text-btn mini-btn" :plain="true" size="mini" @tap="touchEvent"><slot></slot></button>
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
		border: 2upx;
		margin: 0px 10upx;
		padding: 0px;
	}
</style>
