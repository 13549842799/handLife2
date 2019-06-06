<template>
	<view class="article-content">
        <navigator hover-class="articleTapStyle" url="finalReport/finalReport">
			<view>
				<text>总结</text>
			</view>
		</navigator>
		<view hover-class="articleTapStyle">
			<text>灵感</text>
		</view>
		<navigator hover-class="articleTapStyle" url="diary/diary">
			<view hover-class="articleTapStyle">
				<text>日记</text>
			</view>
		</navigator>
		<view hover-class="articleTapStyle">
			<text>小说</text>
		</view>
	</view>
</template>

<script>
	export default {
		data () {
			return {}
		},
		methods: {
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
		justify-content: center;
		
	}
	
	.article-content view {
		width: 400upx;
		height: 120upx;
	    border: 1upx solid #DDDDDD;
		border-radius: 10upx;
		margin-bottom: 50upx;
		margin-left: auto;
		margin-right: auto;
		justify-content: center;
	}
	
	.article-content view > text {
		line-height: 120upx;
		font-size: 30upx;
	}
	
	.articleTapStyle {
		background-color: #EFEFF4;
		box-shadow: 1upx -1upx 1upx 1upx #EFEFF4 inset;
	}
</style>
