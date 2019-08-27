<template>
	<view class="long-list-body">
		<view class="novel-menu">
			<view class="novel-menu-portion" v-if="list.length > 0" v-for="l in list" :key="l.id">
			    <view class="novel-menu-portion-title">
					<text>{{l.title}}</text>
					<text>{{l.sectionNum}}</text>
				</view>
				<view class="novel-menu-section">
					<view v-for="s in l.sections" :key="s.id">
						<text>{{s.title}}</text>
						<text>{{s.wordsNum}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import novelApi from '../../../api/article/novel.js'
	
	import portionApi from '../../../api/article/portion.js'
	
	export default {
		data () {
			return {
				list: []
			}
		},
		onLoad (option) {
			let id = option.id
			let v = this
			portionApi.getPortionsList({'novel': id, 'expand': 1}).then(res => {
				v.list = res
			}).catch(err => { console.log(err) })
			
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	text {
		font-size: 30upx;
	}
	
	.long-list-body {
		width: 750upx;
		flex-direction: column;
		background-color: #FFFFFF;
	}
	
	.novel-menu {
		width: 100%;
		flex-direction: column;
		background-color: #EFEFF4;
	}
	
	.novel-menu-portion {
		flex-direction: column;
		width: 750upx;
	}
	
	.novel-menu-portion-title {
		width: 100%;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.novel-menu-section {
		transition: all .1s;
	}
	
	.novel-menu-section-height {
		
	}
</style>
