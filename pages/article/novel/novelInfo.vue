<template>
	<view class="view-container" style="background-color: #F1F1F1">
		<view class="novel-message">
			<view class="background-image" v-if="novel.id">
				<image :src="cover"></image>
			</view>			
			<view class="novel-info">
				<view class="app-status-bar"></view>
				<view class="novel-info-bar">
					<image @tap="goBack" src="../../../static/icon/goBack.png"></image>
				</view>
				<view class="novel-info-content">
					<image :src="cover"></image>
					<view>
						<text style="font-size: 50upx;font-weight: 900;color: #FFFFFF;margin-bottom: 10upx;margin-top: 0;">{{novel.title}}</text>
						<text>{{novel.createNikeName}}&nbsp;&nbsp;&nbsp;著</text>
						<text>{{novel.wordsNumStr}}&nbsp;/&nbsp;{{state}}</text>
						<text>#&nbsp;{{novel.classifyName}}&nbsp;#</text>
					</view>
				</view>
			</view>
		</view>
		<view class="novel-info-ins">
			<!-- <textarea :class="{'hideOver': !autoHeight}" style="width: 700upx;" :maxlength="-1" :auto-height="autoHeight" :value="novel.content" placeholder-class="common-placeholder" placeholder="暂无简介"></textarea> -->
			<view class="common-placeholder" :class="{'hideOver': !autoHeight}" style="width: 700upx;white-space: pre-wrap;">{{content}}</view>
			<view @tap="autoHeight = !autoHeight" style="width: 700upx;height: 50upx;position: relative;">
				<image v-show="autoHeight" style="width: 30upx;height: 30upx;position: absolute;right: 0;top: 20upx;" src="./../../../static/icon/up-icon.png"></image>
				<image v-show="!autoHeight" style="width: 30upx;height: 30upx;position: absolute;right: 0;top: 20upx;" src="./../../../static/icon/down-icon.png"></image>
			</view>
		</view>
		<view class="novel-info-menu" @tap="goToMenu">
			<text style="font-size: 40upx;height: 50upx;line-height: 50upx;font-weight: 500;">目录</text>
			<text class="common-input-size" style="color: #DCDCDC;height: 50upx;line-height: 50upx;">{{novel.lastetSection.createTimeStr}}&nbsp;/&nbsp;{{novel.lastetSection.title}}</text>
			<text class="item-text" style="color: #DCDCDC">&#xe65e;</text>
		</view>
		<view class="novel-info-labels">
			<text style="height: 50upx;line-height: 50upx;font-size: 35upx;text-align: left;width: 100%;">作品标签</text>
			<view style="width: 100%;padding-top: 10upx;display: block;">
				<label-img v-for="(l, index) in novel.labelList" :key="index" :name="l.name"></label-img>
			</view>
		</view>
		<view class="common-bottom-item novel-info-bottom">
			<text @tap="goToRead">
				立即阅读
			</text>
		</view>
	</view>
</template>

<script>
	import novelApi from '../../../api/article/novel.js'
	
	import {fileUrl} from '../../../base_variable.js'
	
	import labelImg from '../../../components/label-img.vue'
	
	const stateName = ['未开始', '连载中', '没有更新', '完结']
	
	export default {
		components: {
			labelImg
		},
		data () {
			return {
				novel: {
					lastetSection: {}
				},
				autoHeight: false
			}
		},
		onLoad(option) {
			let id = option.id, v = this
			novelApi.getNovel(id).then(res => {
				v.novel = res
			})
		},
		computed: {
			cover () {
				return this.novel.cover ? fileUrl + this.novel.cover : '../../../static/nullpic.jpg'
			},
			state () {
				return stateName[this.novel.novelState]
			},
			content () {
				return !this.novel.content || this.novel.content.trim() === '' ? '暂无简介' : this.novel.content
			}
		},
		methods: {
			goBack () {
				uni.navigateBack({delta:1})
			},
			goToMenu () {
				uni.navigateTo({ 'url': 'onlyReadMenu?id='+this.novel.id +'&title='+ this.novel.title })
			},
			goToRead () {
				uni.navigateTo({ 'url': 'readSection?id=-1&novelTitle='+ this.novel.title + '&novelId=' + this.novel.id })
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
	
	.novel-message {
		width: 750upx;
		height: 500upx;
		position: relative;
	}
	
	.background-image {
		width: 100%;
		height: 100%;
		overflow: hidden;
		opacity: 0.8;
		z-index: 1;
	}
	
	.background-image image {
		width: 1500upx;
		height: 1000upx;
	}
	
	.novel-info {
		position: absolute;
		left: 0;
		top: 0;
		width: 750upx;
		height: 500upx;
		background-color: rgba(0,0,0, 0.6);
		z-index: 2;
		flex-direction: column;
	}
	
	.novel-info-bar {
		width: 100%;
		height: 50upx;
	}
	
	.novel-info-bar image {
		width: 35upx;
		height: 35upx;
		margin-left: 20upx;
		margin-top: 10upx;
	}
	
	.novel-info-content {
		width: 670upx;
		padding: 40upx 20upx;
	}
	
	.novel-info-content image {
		width: 197.8upx;
		height: 320upx;
		border: 2upx solid #FFFFFF;
	}
	
	.novel-info-content view {
		flex-direction: column;
		margin-left: 30upx;
	}
	
	.novel-info-content text {
		color: #F1F1F1;
		font-size: 30upx;
		height: 35upx;
		line-height: 35upx;
		margin-top: 20upx;
	}
	
	.hideOver {
		height: 140upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.novel-info-ins, .novel-info-menu,.novel-info-labels {
		width: 710upx;
		padding: 25upx 20upx;
		background-color: #FFFFFF;
		border-bottom: 1upx solid #E0E0E0;
	}
	
	.novel-info-ins {
		box-shadow: 0 1upx 2upx #DCDCDC;
		flex-direction: column;
	}
	
	.novel-info-menu, .novel-info-labels {
		margin-top: 35upx;
	}
	
	.novel-info-menu {
		height: 50upx;
		justify-content: space-between;
	}
	
	.novel-info-labels {
		flex-direction: column;
	}
	
	.novel-info-bottom {
		height: 120upx;
		background-color: #FFFFFF;
		border-top: 1upx solid #E0E0E0;
		justify-content: center;
	}
	.novel-info-bottom text {
		padding: 0 30upx;
		height: 120upx;
		line-height: 120upx;
		font-size: 35upx;
		font-weight: 800;
		background-color: #FFD700;
	}
</style>
