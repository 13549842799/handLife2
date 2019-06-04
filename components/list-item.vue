<template>
	<view class="list-item-ul" hover-class="tap-style" :hover-stay-time="remainTime">
		<text>{{title}}</text>
		<view class="list-item-ul-right">			
			<text v-if="sign" class="item-text">&#xe65e;</text>
			<text class="left-text">{{val}}</text>
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
			val: {
				type: [String, Number, Object],
				required: false
			},
			sign: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				remainTime: 100
			}
		},
		methods: {
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.list-item-ul {
		font-family: "思源黑体简体";
		font-size: 30upx;
		height: 120upx;
		line-height: 120upx;
		border-bottom:1upx solid #F8F8F8;
		padding-left: 20upx;
		flex-direction: row;
		box-sizing: border-box;
	}
	
	.list-item-ul-right {
		flex-direction: row-reverse;
		flex: 1;
		align-items:center;
	}
	
	.item-text {
		font-family: texticons;
	}
	
	.left-text {
		color: #C8C7CC;
	}
	
	.item-text, .left-text {
		margin-right: 20upx;
	}
	
	.tap-style {
		background-color: #EFEFF4;
		box-shadow: 1upx -1upx 1upx 1upx #DDDDDD inset;
		
	}
</style>
