<template>
	<view class="list-item-ul" :hover-class="hoverClass"  :hover-stay-time="remainTime" @tap="tagNewEvent">
		<slot>
			<text>{{title}}</text>
			<view class="list-item-ul-right">			
				<text v-if="sign" class="item-text">&#xe65e;</text>
				<text class="left-text" v-if="showValue">{{val}}</text>
				<image class="avatar-style" :src="image" v-else></image>
			</view>
		</slot>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				required: false
			},
			val: {
				type: [String, Number, Object],
				required: false
			},
			sign: {
				type: Boolean,
				default: true
			},
			onTap: {
				type: Function,
				required: false
			},
			onTapStyle: {
				type: Boolean,
				default: true
			},
			type: {
				type: String,
				default: 'text',
				validator:  val => {
					return ['text', 'img'].indexOf(val) !== -1
				}
			},
			image: {
				type: String,
				required: false
			},
			obj: {
				type: Object,
				default: () => { return {} }
			}
		},
		data() {
			return {
				remainTime: 100
			}
		},
		methods: {
			tagNewEvent () {
				this.$emit('MyTap')
			}
		},
		computed: {
			onTapEvent () {
				return this.onTap !== null && this.onTap !== undefined
			},
			tapEvent () {
				return this.onTapEvent ? this.onTap : () => {console.log('默认方法')}
			},
			hoverClass () {
				return this.onTapEvent && this.onTapStyle ? "tap-style" : "none"
			},
			showValue () {
				return this.type === 'text' && this.val !== null && this.val !== undefined
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
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
	
	.left-text {
		color: #C8C7CC;
	}
	
	.item-text, .left-text, .avatar-style {
		margin-right: 20upx;
	}
	
	.tap-style {
		background-color: #EFEFF4;
		box-shadow: 1upx -1upx 1upx 1upx #DDDDDD inset;
		
	}
	
	.avatar-style {
		width: 80upx;
		height: 80upx;
		border-radius: 150upx;
	}
</style>
