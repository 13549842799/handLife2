<template>
	<view class="novel-content">
		
	</view>
</template>

<script>
	
	import novelApi from '../../../api/article/novel.js'
	
	import {MyPage} from '../../../common/pageUtil.js'
	
	import {novelBg} from '../../../common/imageJs/backgroundImg.js'
	
	export default {
		data() {
			return {
				page: null,
				bg: url(' + novelBg +')'
			}
		},
		onLoad () {
			let v = this
			v.page = new MyPage({searchFunction: novelApi.getNovelList})
			console.log('onload')
		},
		methods: {
			
		}
	}
</script>

<style>
    view {
  	    display: flex;
    }
    .novel-content {
	    width: 100%;
	    flex-direction: column;
    }
</style>
