<template>
	<view class="model-bg" :class="{'model-bg-show': !hide}" @tap.stop.self="empty">
		<view class="bottom-model" :class="{'bottom-model-show': !hide}">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {
				hide: true
			}
		},
		methods: {
			open () {
				this.hide = false
			},
			close (e) {
				this.hide = true
			},
			empty (e) {
				console.log('内部触发')
				this.$emit('close', e)
			}
		}
	}
	
</script>

<style>
	.model-bg {
		position: fixed !important;
		z-index: 999;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, .46);
		transition: all .1s;
		visibility: hidden;
		opacity: 0;
	}
	
	.model-bg-show {
		opacity: 1;
		visibility: visible;
	}
	.bottom-model {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #FFFFFF;
		overflow: hidden;
		display: block;
		height: 0upx;
		transition: height .1s;
	}
	
	.bottom-model-show {
		height: 500upx !important;
	}
</style>
