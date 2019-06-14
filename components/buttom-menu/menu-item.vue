<template>
	<view class="screen-foot-menu-top-menu-item" :style="{width: width}" tabindex="0" @blur="visable=false">
		<view class="menu-item-menu">
			<view v-if="visable" class="menu-item-menu-view" ><slot></slot></view>
		</view>
		<view style="width: 100%" :style="{'font-size': size + 'upx'}" @tap.stop="showMenu">
			<text  class="screen-foot-menu-top-menu-item-text">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				required: true
			},
			width: {
				type: String,
				default: '33.2%'
			},
			size: {
				type: Number,
				default: 30
			},
			menuAble: {
				type: Boolean,
				default: true
			},
			tapEvent: {
				type: Function,
				required: false
			}
		},
		data () {
			return {
				visable: false
			}
		},
		methods: {
			showMenu () {
				if (this.tapEvent) {
					this.tapEvent()
				}
				if (this.menuAble) {
					console.log('点击')
					this.visable = !this.visable
				} else {
					this.visable = false
				}
			},
			closeMenu () {
				this.visable = false
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.screen-foot-menu-top-menu-item {
	    position: relative;
		outline:none;
	}
	
	.screen-foot-menu-top-menu-item-text {
		width: 100%;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis; /**超出文本的部分使用...来代替*/
	}
	
	.menu-item-menu {
		position: absolute;
		left: 0upx;
		top:0upx;
		height: 0upx;
	}
	
	.menu-item-menu-view {
		position: absolute;
		bottom: 0upx;
		left: 0upx;
	}

</style>
