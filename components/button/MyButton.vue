<template>
	<view class="base-button" :class="modelClass" @tap="onClick">
		<text><slot></slot></text>
	</view>
</template>

<script>
	export default {
		props: {
			size: {
				type: String,
				default: "mini",
				validator: (val) => {
					return ['large', 'mini', 'small'].indexOf(val) !== -1
				}
			}
		},
		methods: {
			onClick () {
				this.$emit('MyClick')
			}
		},
		computed: {
			modelClass () {
				return this.size === 'large' ? 'my-large-btn' : ( this.size === 'mini' ? 'my-mini-btn' : 'my-small-btn')
			}
		}
	}
</script>

<style>
	.base-button {
		margin: 0px 10upx;
		display: inline-block;
	}
	
	.my-small-btn {
		font-size: 20upx;
	}
	
	.my-mini-btn {
		font-size: 30upx;
	}
	
	.my-large-btn {
		font-size: 50upx;
	}
</style>
