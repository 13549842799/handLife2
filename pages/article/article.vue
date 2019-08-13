<template>
	<view class="article-content" :style="{'background-image': bg}">
		<view class="article-content-menu" >
			<view class="article-content-menu-column">
				<view hover-class="articleTapStyle" @tap="goToPage('finalReport/finalReport')">
					<text>总结</text>
				</view>
				<view hover-class="articleTapStyle" @tap="goToPage('')">
					<text>灵感</text>
				</view>
			</view>
			<view class="article-content-menu-column">
				<view hover-class="articleTapStyle" @tap="goToPage('diary/diary')">
					<text>日记</text>
				</view>
				<view hover-class="articleTapStyle" @tap="goToPage('')">
					<text>小说</text>
				</view>
			</view>
			<view class="article-content-menu-column">
				<view hover-class="articleTapStyle" @tap="goToPage('classify/classify')">
					<text>分类</text>
				</view>
				<view hover-class="articleTapStyle" @tap="goToPage('label/label')">
					<text>标签</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import {articleBg} from '../../common/imageJs/backgroundImg.js'
	
	export default {
		data () {
			return {
				bg: 'url(' + articleBg +')'
			}
		},
		methods: {
			goToPage (url) {
				if (!url) {
					return
				}
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	view,
	page {
		display: flex;
	}
	.article-content {
		width: 750upx;
		flex-direction: column;
		background-color: #F5F5F5;
	}
	
	.article-content-menu {
		width: 750upx;
		flex-direction: column;
		margin-top: 50upx;
	}
	
	.article-content-menu-column {
		flex-direction: row;
		height: 150upx;
		width: 100%;
	}
	
	.article-content-menu-column > view {
		width: 50%;
		height: 150upx;
		border: 1upx solid #F8F8F8;
		background-color: #FFFFFF;
		background:rgba(255,255,255,0.6);
	}
	
	.article-content-menu-column > view > text {
		width: 100%;
		height: 100%;
		line-height: 150upx;
		font-size: 30upx;
		text-align: center;
	}
	
	/* .article-content view {
		width: 400upx;
		height: 120upx;
		border-radius: 10upx;
		margin-bottom: 50upx;
		margin-left: auto;
		margin-right: auto;
		justify-content: center;
	} */

	
	.articleTapStyle {
		background-color: #EFEFF4 !important;
		box-shadow: 1upx -1upx 1upx 1upx #EFEFF4 inset;
	}
</style>
