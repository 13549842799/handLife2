<template>
	<view class="center">
		<view class="logo" :hover-class="!hasLogin ? 'logo-hover' : ''">
			<image class="logo-img" :src="avatar"></image>
			<view class="logo-title">
				<text class="uer-name" @tap="goLogin">Hi，{{hasLogin ? nikename : '您未登录'}}</text>
				<text class="go-login navigat-arrow" v-if="!hasLogin">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<navigator url="./accountManager" hover-class="center_navitgator">
				<view class="center-list-item border-bottom">	
					<text class="list-icon">&#xe60f;</text>
					<text class="list-text">账号管理</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</navigator>
			<navigator url="./allAccount/allAccount" hover-class="center_navitgator">
				<view class="center-list-item border-bottom">	
					<text class="list-icon">&#xe60f;</text>
					<text class="list-text">私人管物</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</navigator>
			<navigator url="./target/target" hover-class="center_navitgator">
				<view class="center-list-item border-bottom">	
					<text class="list-icon">&#xe60b;</text>
					<text class="list-text">当前目标</text>
					<text class="navigat-arrow">&#xe65e;</text>
				</view>
			</navigator>
			<view class="center-list-item">
				<text class="list-icon">&#xe639;</text>
				<text class="list-text">新消息通知</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe60b;</text>
				<text class="list-text">帮助与反馈</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
			<view class="center-list-item">
				<text class="list-icon">&#xe65f;</text>
				<text class="list-text">服务条款及隐私</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item">
				<text class="list-icon">&#xe614;</text>
				<text class="list-text">关于应用</text>
				<text class="navigat-arrow">&#xe65e;</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
	    mapState
	} from 'vuex'
	
	import centerApi from '../../api/center.js'
	import loginApi from '../../api/login.js'
	
	export default {
		computed: mapState(['hasLogin', 'nikename', 'avatar']),
		data() {
			return {
				uerInfo: {}
			}
		},
		methods: {
			goLogin() {
				console.log('点击重新登录')
				if (!this.hasLogin) {
					uni.reLaunch({url: '/pages/index/login/login'})
				}
			}
		}
	}
</script>

<style>
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}
	
	page,
	view {
		display: flex;
	}
	
	page {
		background-color: #f8f8f8;
	}
	
	.center {
		flex-direction: column;
	}
	
	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #2F85FC;
		flex-direction: row;
		align-items: center;
	}
	
	.logo-hover {
		opacity: 0.8;
	}
	
	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}
	
	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}
	
	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
	}
	
	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}
	
	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}
	
	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}
	
	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}
	
	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}
	
	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #2F85FC;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}
	
	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}
	
	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
	
	.center_navitgator {
		-webkit-box-shadow: 3upx 3upx 3upx;  
        -moz-box-shadow: 3upx 3upx 3upx;  
        box-shadow: 3upx 3upx 3upx;
	}
</style>
