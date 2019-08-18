<template>
	<view class="novel-content">
		<view class="novel-content-head" :style="{'background-image': bg}">
			
		</view>
		<view class="novel-content-list"  v-for="l in page.list" v-bind:key="l.id">
			<view class="novel-list-item" @longpress="selectNovel(l)">
				<view class="novel-list-item-img">
					<image :src="l.cover"></image>
				</view>
				<view class="novel-list-item-text">
					<text class="title">{{l.title}}</text>
					<text class="author">{{l.creatorName}}&nbsp;/&nbsp;{{l.wordsNum}}</text>
					<text>创建：{{l.createTime}} / 更新：{{l.modifierTime}}</text>
					<text>标签</text>
					<view style="flex-direction: row;">
						<label-img v-for="(label, index) in l.labelList" :key="index" :name="label.name" size="small"></label-img>
					</view>
				</view>
			</view>
		</view>
		<view class="novel-none" v-if="!hasNovel">
			<text>暂无小说...</text>
			<text>点击下方按钮开始你的第一篇小说吧</text>
		</view>
		<view class="novel-bottom">
			<image @tap="createNewNovel" src="../../../static/icon/novelEdit.png"></image>	
		</view>
		<bottom-model :height="460" ref="bottomM" v-on:close="closeBottom">
			<view class="novel-bottom-model-view">
				<text>置顶</text>
				<text>编辑</text>
				<text>书籍详情</text>
				<text style="color: red;" @tap="deleteNovel">删除本书</text>
				<text class="cancel-model" @tap="closeBottom">取消</text>
			</view>
		</bottom-model>
	</view>
</template>

<script>
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	
	import novelApi from '../../../api/article/novel.js'
	
	import {MyPage} from '../../../common/pageUtil.js'
	
	import {novelBg} from '../../../common/imageJs/backgroundImg.js'
	
	import bottomModel from '../../../components/model/buttomModel.vue'
	
	import labelImg from '../../../components/label-img'
	
	export default {
		components: {
			bottomModel,
			labelImg
		},
		data() {
			return {
				/* page: {
					list: [{id: 1, cover: '/static/zd.jpg', title: '测试小说', creatorName: 'cyz', createTime: '2019年8月20日', modifierTime: '2019年8月22日', wordsNum: '100万字'}]
				}, */
				page: null,
				bg: 'url(' + novelBg +')',
				novel: {} //当前长按选择的小说
			}
		},
		onLoad () {
			let v = this
			v.page = new MyPage({size: 5, searchFunction: novelApi.getNovelList})
			console.log('onload')
		},
		onShow (e) {
			if (this.status === 1) {
				this.page.requestLine({type: false})
				this.alterListStatus(0)
			}
		},
		methods: {
			...mapMutations({
				'alterListStatus': 'novel/alterStatus'
			}),
			createNewNovel () {
				uni.navigateTo({
					url: './novelEdit'
				})
			},
			selectNovel (n) {
				console.log(JSON.stringify(n))
				this.novel = n
				this.$refs.bottomM.open()
			},
			closeBottom (e) {
				this.$refs.bottomM.close()
			},
			/**
			 * 删除小说
			 */
			deleteNovel () {
				if (!this.novel.id) {
					console.log('请选择小说')
					return
				}
				novelApi.deleteNovel(this.novel.id).then(res => {
					uni.showToast({ title: '删除成功' })
				}).catch(err => { console.log(err) })
			}
		},
		computed: {
			...mapState({
				status: state => state.novel.status
			}),
			hasNovel () {
				return this.page && this.page.list && this.page.list.length > 0
			}
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
	
	.novel-content-head {
		width: 100%;
		height: 180upx;
		flex-direction: column;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	
	.novel-none {
		width: 100%;
		height: 400upx;
		flex-direction: column;
	}
	
	.novel-none text {
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		color: #C8C7CC;
		text-align: center;
	}
	
	.novel-content-list {
		flex-direction: column;
		width: 100%;
	}
	
	.novel-list-item {
		width: 100%;
		height: 300upx;
		border-bottom: 1upx solid #C0C0C0;
		flex-direction: row;
	}
	
	.novel-list-item > view {
		height: 230upx;
		padding: 35upx 0;
	}
	
	.novel-list-item-img {
		line-height: 230upx;
		width: 165.96upx;
		margin: 0 35upx;
	}
	
	.novel-list-item-img image {
		height: 100%;
		width: 100%;
		border: 2upx solid #A9A9A9;
		-moz-box-shadow: 2upx 2upx 2upx #333333;
		-webkit-box-shadow: 2upx 2upx 2upx #333333;
		box-shadow: 2upx 2upx 2upx #DCDCDC;
	}
	
	.novel-list-item-text {
		flex-direction: column;
		font-size: 25upx;
	}

	.novel-list-item-text text{
		margin-bottom: 10upx;
	}
	
	.novel-list-item-text .title {
		font-size: 35upx !important;
		font-weight: bold;
	}
	
	.novel-list-item-text .author {
		color: #C0C0C0;
	}
	
	.novel-bottom {
		position: fixed;
		left: 0upx;
		bottom: 0upx;
		width: 100%;
		height: 80upx;
		justify-content: center;
	}
	
	.novel-bottom image {
		width: 60upx;
		height: 60upx;
		border-radius: 150upx;
		border: 1upx solid #C7C7CD;
	}
	
	.novel-bottom-model-view {
		width: 750upx;
		height: 100%;
		flex-direction: column;
	}
	
	.novel-bottom-model-view text {
		border-bottom: 1upx solid #EFEFF4;
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		font-size: 30upx;
		letter-spacing: 8upx;
	}
	
	.cancel-model {
		border-top: 10upx solid #DDDDDD;
		border-bottom: 0 !important;
	}
</style>
