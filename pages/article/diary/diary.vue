<template>
	<view class="diary-content">
		<view class="search-bar">
			<view><text>分类</text></view>
			<text style="color: #F8F8F8;">|</text>
			<view><text>搜索</text></view>
			<text style="color: #F8F8F8;">|</text>
			<view @tap="goToNewDiaryPage"><text>新建</text></view>
		</view>
		<view class="diary-content-list">
			<common-item :obj="l" v-for="(l, index) in page.list" v-bind:key="index" @customizeEvent="longPressEvent" style="width: 100%">
				<my-button @MyClick="readdiary(l)">查看</my-button>
				<my-button @MyClick="goToEditPage(l.id, l.title)">编辑</my-button>
				<my-button @MyClick="deleteDiaryEvent(l.id, l.title)">删除</my-button>
				
			</common-item>
		</view>
	</view>
</template>

<script>
	import diaryApi from '../../../api/article/diary.js'
	
	import {MyPage} from '../../../common/pageUtil.js'
	
	import commonButton from '../../../components/common-button.vue'
	
	import MyButton from '../../../components/button/MyButton'
	
	import commonItem from '../../../components/list/common-list-item'
	
	
	export default {
		components: {
			commonButton,
			commonItem,
			MyButton
		},
		data() {
			return {
				list: [{id: 1, title: '测试', content: '测试一下', date: "2019年12月20日"}],
				page: {}
			}
		},
		methods: {
			/**
			 * 跳转到新建日记的页面
			 */
			goToNewDiaryPage () {
				uni.navigateTo({
					url: './diaryEdit'
				})
			},
			deleteDiaryEvent (id, title) {
				let v = this
				uni.showModal({
					title: '删除提示',
					content: '确定删除 标题为 ' + title + ' 的日记吗？',
					success(res) {
						if (!res.confirm) {
							return
						}
						diaryApi.deleteOwnerDiary(id).then(res => {
							v.page.deleteLine('id', id)
							uni.showToast({
								title: '删除成功',
								duration: 2000
							})
						}).catch(err => {
							console.log(err)
						})
					},
					fail() {
						console.log('页面交互失败')
					}
				})
			},
			goToEditPage (id, title) {
				uni.navigateTo({
					url: 'diaryEdit?id=' + id + '&title=' + title
				})
			},
			/**
			 * 查看日记
			 */
			readdiary (diary) {
				console.log('查看日记')
			}
		},
		onLoad() {
			let v = this
			v.page = new MyPage({searchFunction: diaryApi.getDiaryList})
            console.log('page:', v.page)
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.diary-content {
		width: 100%;
		flex-direction: column;
	}
	
	.search-bar {
		width: 100%;
		height: 100upx;
		margin-bottom: 30upx;
		background-color: #2F85FC;
		line-height: 100upx;
	}
	
	.search-bar > view {
		width: 33%;
	}
	
	.search-bar > view > text {
		width: 100%;
		text-align: center;
		color: #F8F8F8;
	}
	
	.diary-content-list {
		flex-direction: column;
	}
</style>
