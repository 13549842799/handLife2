<template>
	<view class="diary-content">
		<view class="diary-content-head" :style="{'background-image': img.bg1}">
			<view class="diary-content-head-titleSearch">
				<view style="margin: auto 0;width: 100upx;"></view>
				<view class="diary-content-head-titleSearch-view">
                     <view class="diary-content-head-titleSearch-view-icon">
						 <!--  #ifdef  APP-PLUS -->
						     <icon type="search" size="18" color="#FFFFFF" style="margin: auto auto;"/>
						 <!--  #endif -->
					 </view>
					<view class="diary-content-head-titleSearch-view-input">
						<input type="text" placeholder="请输入标题搜索日记" 
							class="diary-content-head-titleSearch-input"
							v-model="titleText"
							ref="titleSearch"
							placeholder-class="diary-content-head-titleSearch-placeholder" @input="searchTitle" @focus="visible = true"/>
					</view>
					<view style="width: 40upx;" @tap="clearSearchText">
						<!--  #ifdef  APP-PLUS -->
						    <icon type="clear" size="18" color="#FFFFFF" style="margin: auto auto;"/>
						<!--  #endif -->
					</view>
					<view class="input-search-dlog" v-show="visible">
						<list-item v-for="o in searchTitles" :title="o.title" :key="o.id" @MyTap="searchDiary(o.id)" :sign="false"></list-item>
					</view>
				</view>
				<view style="width: 120upx;margin: auto 0;hight: 100%;">
					<text style="font-size: 30upx;height:50upx;line-height: 50upx;">搜索</text>
				</view>
			</view>
		</view>
		<view class="diary-content-list">
			<common-item :obj="l" v-for="(l, index) in page.list" v-bind:key="index" @customizeEvent="longPressEvent" style="width: 100%">
				<my-button @MyClick="readdiary(l)">查看</my-button>
				<my-button v-if="l.source === 2" @MyClick="goToEditPage(l.id, l.title)">编辑</my-button>
				<my-button @MyClick="deleteDiaryEvent(l.id, l.title)">删除</my-button>			
			</common-item>
		</view>
		<image v-show="footVisable" @tap="goToNewDiaryPage" class="diary_add_icon" src="../../../static/icon/article/add.png"></image>
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
	
	import listItem from '../../../components/list-item'
	
	import {bgArray} from '../../../common/imageJs/backgroundImg.js'
	
	
	var count = 0 //标题查询框触发的次数
	var tempVal = '' //临时参数
	
	export default {
		components: {
			commonButton,
			commonItem,
			MyButton,
			listItem
		},
		data() {
			return {
				page: {},
				titleText: '',
				searchTitles: [],
				visible: false,
				footVisable: true,
				img: {
					bg1: 'url(' + bgArray[0] +')'
				}
			}
		},
		computed: {
			...mapState({
				status: state => state.diary.status
			})
		},
		methods: {
			...mapMutations({
				'alterListStatus': 'diary/alterStatus'
			}),
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
				uni.navigateTo({ url: 'diaryEdit?id=' + id + '&title=' + title })
			},
			/**
			 * 查看日记
			 */
			readdiary (diary) {
				uni.navigateTo({url: 'read?id=' + diary.id})
			},
			/**
			 * 查询标题
			 * @param {Object} e
			 */
			searchTitle (e) {	
				let v = this
				let val = e.target.value
				if (!val) {
					v.searchTitles = []
					return
				}
				diaryApi.searchTitle(val).then(res => {
					v.searchTitles = res
				})
			},
			/**
			 * 通过点击标题列表悬浮框的对应标题，查询日记，隐藏悬浮框
			 * @param {Object} id
			 */
			searchDiary(id) {
				let v = this
				v.page.requestLine({type: false, params: {id: id}})
				v.visible = false
			},
			clearSearchText () {
				this.titleText = ''
				this.searchTitles = []
				this.visible = false
			}
 		},
		onLoad() {
			let v = this
			v.page = new MyPage({searchFunction: diaryApi.getDiaryList})
            console.log('onload')
		},
		/**
		 * 屏幕尺寸监听事件
		 * @param {Object} e
		 */
		onResize (e) {
			this.footVisable = !(e.size.windowWidth === this.$screen.windowWidth && e.size.windowHeight < this.$screen.windowHeight/2)
		},
		onShow (e) {
			console.log('onshow_diary')
			if (this.status === 1) {
				this.page.requestLine({type: false})
				this.alterListStatus(0)
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
		height: 280upx;
		margin-bottom: 50upx;
		flex-direction: column;
		/* background: url(../../../static/background/sabe2.png); */
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	
	.diary-content-head-titleSearch {
		width: 100%;
		height: 90upx;
		padding-top: 20upx;
		padding-bottom: 10upx;
		flex-direction: row;
	}
	
	.diary-content-head-titleSearch-view {
		width: 450upx;
		height: 50upx;
		margin: auto 50upx;
		padding: 10upx 10upx;
		background: rgba(0,0,0,0.3);
		border-radius: 50upx;
		flex-direction: row;
		position: relative;
	}
	
	.diary-content-head-titleSearch-view-icon {
		width: 50upx;
	}
	
	.diary-content-head-titleSearch-view-input {
		width: 330upx;
	}
	
	.diary-content-head-titleSearch-placeholder {
		color: #F8F8F8;
		text-align: center;
		font-size: 30upx;
	}
	
	.diary-content-head-titleSearch-input {
		color: #FFFFFF;
		font-size: 30upx;
	}
	
	.input-search-dlog {
		position: absolute;
		width: 650upx;
		height: 300upx;
		overflow-y: auto;
		left: -90upx;
		top: 75upx;
		border: 1px solid #CCCCCC;
		border-radius: 10px;
		background: rgba(255,255,255,0.7);
		flex-direction: column;
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
