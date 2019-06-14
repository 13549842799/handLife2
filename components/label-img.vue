<template>
	<text class="text-label-style-baise" :class="fontSizeClass">{{name}}</text>
</template>

<script>
	export default {
		props: {
			name: {
				type: String,
				required: true
			},
			size: {
				type: String,
				default: "mini",
				validator: (val) => {
					return ['large', 'mini', 'small'].indexOf(val) !== -1
				}
			}
		},
		computed: {
			large () {
				return this.size === 'large'
			},
			Mini () {
				return this.size === 'mini'
			},
			Small () {
				return this.size === 'small'
			},
			fontSizeClass () {
				return {
					'text-label-style-large': this.large,
					'text-label-style-mini': this.Mini,
					'text-label-style-small': this.Small
				}
			}
		}
	}
</script>

<style>
	.text-label-style-baise {
		color: #FFFFFF;
		background-color: #0FAEFF;
		border-radius: 10upx;
		border: 1upx solid #F2F2F2;
		margin: 5upx 5upx;
	}
	
	.text-label-style-large {
		font-size: 40upx;
		line-height: 80upx;
		height: 80upx;
		padding: 0upx 30upx;
	}
	
	.text-label-style-mini {
		font-size: 30upx;
		line-height: 60upx;
		height: 60upx;
		padding: 0upx 20upx;
	}
	
	.text-label-style-small {
		font-size: 15upx;
		line-height: 40upx;
		height: 40upx;
		padding: 0 10upx;
	}
</style>
