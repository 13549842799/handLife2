<template>
	<view class="diary-content">
		<!-- <view class="search-bar">
			<view><text>分类</text></view>
			<text style="color: #F8F8F8;">|</text>
			<view><text>搜索</text></view>
			<text style="color: #F8F8F8;">|</text>
			<view @tap="goToNewDiaryPage"><text>新建</text></view>
		</view> -->
		<view class="diary-content-head">
			<view class="diary-content-head-titleSearch">
				<view class="diary-content-head-titleSearch-view">
                     <view class="diary-content-head-titleSearch-view-icon">
						 
					 </view>
					<view class="diary-content-head-titleSearch-view-input">
						<input type="text" v-model="page.params.title" placeholder="请输入标题搜索日记" 
							class="diary-content-head-titleSearch-input"
							placeholder-class="diary-content-head-titleSearch-placeholder" @input="searchTitle"/>
					</view>
					<view class="input-search-dlog"></view>
				</view>
			</view>
		</view>
		<view class="diary-content-list">
			<common-item :obj="l" v-for="(l, index) in page.list" v-bind:key="index" @customizeEvent="longPressEvent" style="width: 100%">
				<my-button @MyClick="readdiary(l)">查看</my-button>
				<my-button @MyClick="goToEditPage(l.id, l.title)">编辑</my-button>
				<my-button @MyClick="deleteDiaryEvent(l.id, l.title)">删除</my-button>			
			</common-item>
		</view>
		<image @tap="goToNewDiaryPage" class="diary_add_icon" src="../../../static/icon/article/add.png"></image>
	</view>
</template>

<script>
	
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	
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
				page: {},
				searchTitles: []
			}
		},
		computed: {
			...mapState({
				status: state => state.diary.status
			})
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
							uni.showToast({title: '删除成功', icon: "none", duration: 2000})
						}).catch(err => {
							console.log(err)
						})
					},
					fail() { console.log('页面交互失败') }
				})
			},
			goToEditPage (id, title) {
				this.status = 1
				uni.navigateTo({ url: 'diaryEdit?id=' + id + '&title=' + title })
			},
			/**
			 * 查看日记
			 */
			readdiary (diary) {
				console.log('查看日记')
			},
			searchTitle () {
				let v = this
				if (!v.page.params.title) {
					v.searchTitles = []
					return
				}
				diaryApi.searchTitle(v.page.params.title).then(res => {
					
				})
				//this.page.requestLine({type: false})
			}
 		},
		onLoad() {
			let v = this
			v.page = new MyPage({searchFunction: diaryApi.getDiaryList})
            console.log('onload')
		},
		onShow (e) {
			console.log('onshow_diary')
			if (this.status === 1) {
				this.page.requestLine({type: false})
			}
		},
		/* onPullDownRefresh (e) { //下拉刷新
			console.log(JSON.stringify(e))
		}, */
		onReachBottom () { //上拉触底事件监听
			this.page.getNextLine({})
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
	
	.diary-content-head {
		width: 100%;
		height: 120upx;
		margin-bottom: 50upx;
		flex-direction: column;
	}
	
	.diary-content-head-titleSearch {
		width: 100%;
		height: 60upx;
		padding-top: 20upx;
		padding-bottom: 10upx;
	}
	
	.diary-content-head-titleSearch-view {
		width: 450upx;
		height: 50upx;
		margin: auto auto;
		padding: 10upx 20upx;
		background: rgba(255,255,0,1);
		border-radius: 50upx;
		flex-direction: row;
		position: relative;
	}
	
	.diary-content-head-titleSearch-view-icon {
		width: 100upx;
	}
	
	.diary-content-head-titleSearch-view-input {
		width: 300upx;
	}
	
	.diary-content-head-titleSearch-placeholder {
		color: #F2F2F2;
		text-align: center;
		font-size: 20upx;
	}
	
	.diary-content-head-titleSearch-input {
		color: #757575;
		font-size: 20upx;
	}
	
	.input-search-dlog {
		position: absolute;
		width: 450upx;
		height: 50upx;
		top: 75upx;
		background: #0FAEFF;
	}
	
	.diary-content-list {
		flex-direction: column;
	}
	
	.diary_add_icon {
		width: 100upx;
		height: 100upx;
		position: fixed;
		left: 325upx;
		bottom: 50upx;
	}
</style>
