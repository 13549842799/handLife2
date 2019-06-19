<template>
	<view class="screen-foot-menu-top-menu-item" :style="{width: width}" tabindex="0" @blur="visable=false">
		<view class="menu-item-menu">
			<view v-if="visable" class="menu-item-menu-view" >
				<view style="z-index: 901;">
					<slot></slot>
				</view>
				<view class="backgroud-view" @tap="cancel">
				</view>
			</view>
		</view>
		<view style="width: 100%" :style="{'font-size': size + 'px'}" @tap.stop="showMenu">
			<text  class="screen-foot-menu-top-menu-item-text">{{ptitle}}</text>
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
				default: uni.upx2px(240) + 'px'
			},
			size: {
				type: Number,
				default: 16
			},
			menuAble: {
				type: Boolean,
				default: true
			},
			tapEvent: {
				type: Boolean,
				default: false
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
					console.log('showMenu:click;')
					this.$emit('MyClick')
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
			},
			cancel () {
				this.visable = false
			}
		},
		computed: {
			ptitle () {
				return this.title
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.backgroud-view {
		position: fixed !important;
		z-index: 900;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: #CCCCCC;
		opacity: 0.1;
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
