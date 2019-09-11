<template>
	<view class="view-container">
		<view class="novel-message">
			
		</view>
	</view>
</template>

<script>
	import novelApi from '../../../api/article/novel.js'
	
	export default {
		data () {
			return {
				novel: {}
			}
		},
		onLoad(option) {
			let id = option.id, v = this
			novelApi.getNovel(id).then(res => {
				v.novel = res
			})
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.novel-message {
		width: 750upx;
		height: 500upx;
	}
</style>
