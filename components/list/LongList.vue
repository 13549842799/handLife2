<template>
	<view class="long-list-container">
		<view class="long-list-portion" @tap="controlShow">
			<text>{{son.title}}</text>
			<text>{{son.wordsNum}}</text>
		</view>
		<view class="long-list-content" :class="{'long-list-content-hide': !visible}">
			<text v-for="s in son.sections" :key="s.id">{{s.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			son: {
				type: Object,
				default: () => {
					return {}
				}
			},
			show: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
				visible: true
			}
		},
		methods: {
			controlShow () {
				this.visible = !this.visible
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.long-list-container {
		width: 100%;
		flex-direction: column;
		background:#F8F8F8;
	}
	
	.long-list-portion, .long-list-content {
		background: #FFFFFF;
	}
	
	.long-list-portion {
		width: 710upx;
		flex-direction: row;
		justify-content: space-between;
		padding: 20upx;
		margin-top: 20upx;
	}
	
	.long-list-portion text {
		font-size: 35upx;
		font-weight: 800upx;
		color: #0FAEFF;
	}
	
	.long-list-content {
		flex-direction: column;
		height: auto;
		transition: height .1s;
		overflow: hidden;
	}
	
	.long-list-content text {
		border-top: 1upx solid #EFEFF4;
		padding: 20upx;
		width: 710upx;
		font-size: 28upx;
	}
	
	.long-list-content-hide {
		height: 0;
	}
</style>
