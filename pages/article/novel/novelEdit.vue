<template>
	<view>
		
	</view>
</template>

<script>
	import novelApi from '../../../api/article/novel.js'
	
	export default {
		data () {
			return  {
				novel: {}
			}
		},
		onLoad (option) {
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
			// #endif
			let id = option.id
			let v = this
		
			//3.判断是编辑还是新建
			if (!id) {
				// 新建日记
				return
			}
			// 编辑日记
			//1.设置导航栏为日记标题
			uni.setNavigationBarTitle( { title: "编辑"} )
			uni.showLoading( { title: '加载中', mask: true } )
			//2.加载日记
			novelApi.getNovel(id).then(res => {
				v.novel = res			
			}).catch(err => { console.log(err) })
		}
	}
</script>

<style>
	
</style>
