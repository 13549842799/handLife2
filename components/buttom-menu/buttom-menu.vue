<template>
	<view class="screen-foot-menu" :style="{height: height + 'upx'}">
		<view class="screen-foot-menu-top" :style="{height: topHeight + 'upx'}">
			<slot name="top"></slot>
		</view>
		<view class="screen-foot-menu-top-menu" :style="{height: menuHeight + 'upx', 'line-height': menuHeight + 'upx'}">
			<slot></slot>
		</view>
	</view>
</template>

<script>

	export default {
        props: {
			height: {
				type: Number,
				default: 150
			},
			topHeight: {
				type: Number,
				default: 70
			},
			menuHeight: {
				type: Number,
				default: 80
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
