<template>
	<view class="article-content" :style="{'background-image': bg}">
		<view class="article-content-menu" >
			<view class="article-content-menu-column">
				<view class="article-content-menu-column-left"  hover-class="articleTapStyle" @tap="goToPage('finalReport/finalReport')">
					<text>总结</text>
				</view>
				<view class="article-content-menu-column-right" hover-class="articleTapStyle" @tap="goToPage('')">
					<text>灵感</text>
				</view>
			</view>
			<view class="article-content-menu-column">
				<view class="article-content-menu-column-left" hover-class="articleTapStyle" @tap="goToPage('diary/diary')">
					<text>日记</text>
				</view>
				<view class="article-content-menu-column-right" hover-class="articleTapStyle" @tap="goToPage('novel/novel')">
					<text>小说</text>
				</view>
			</view>
			<view class="article-content-menu-column">
				<view class="article-content-menu-column-left" hover-class="articleTapStyle" @tap="goToPage('classify/classify')">
					<text>分类</text>
				</view>
				<view class="article-content-menu-column-right" hover-class="articleTapStyle" @tap="goToPage('label/label')">
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
		height: 150upx;
		width: 100%;
		margin-bottom: 50upx;
	}
	
	.article-content-menu-column-left, .article-content-menu-column-right{
		width: 231.75upx;
		height: 140upx;
		border: 1upx solid #F8F8F8;
		border-radius: 10px;
		background-color: #FFFFFF;
		background:rgba(255,255,255,0.6);
		margin-left: 143.25;
	}
	
	.article-content-menu-column-left {
		margin-right: 47.75upx;
		margin-left: 95.5upx;
	}
	
	.article-content-menu-column-right {
		margin-left: 47.75upx;
		margin-right: 95.5upx;
	}
	/**  空白：3 width：750upx 实体：2 */
	.article-content-menu-column-left > text, .article-content-menu-column-right > text{
		width: 100%;
		height: 100%;
		line-height: 140upx;
		font-size: 30upx;
		text-align: center;
	}

	
	.articleTapStyle {
		background:rgba(0,0,0,0.6) !important;
		box-shadow: 1upx -1upx 1upx 1upx #EFEFF4 inset;
	}
</style>
