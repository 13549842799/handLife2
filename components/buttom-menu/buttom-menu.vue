<template>
	<view class="screen-foot-menu" :style="{height: height + 'px'}">
		<view class="screen-foot-menu-top" :style="{height: topHeight + 'px'}">
			<slot name="top"></slot>
		</view>
		<view class="screen-foot-menu-top-menu" :style="{height: menuHeight + 'px', 'line-height': menuHeight + 'px'}">
			<slot></slot>
		</view>
	</view>
</template>

<script>

	export default {
        props: {
			height: {
				type: Number,
				default: 80
			},
			topHeight: {
				type: Number,
				default: 30
			},
			menuHeight: {
				type: Number,
				default: 50
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.screen-foot-menu {
		position: absolute;
		bottom: 0upx;
		width: 100%;
		flex-direction: column;
	}
	
	.screen-foot-menu-top {
		width: 100%;
	}
	
	.screen-foot-menu-top-menu {
		color: #C8C7CC;
		flex-direction: row;
		border-top: 1upx solid #C8C7CC;
		justify-content: space-between;
	}
</style>
