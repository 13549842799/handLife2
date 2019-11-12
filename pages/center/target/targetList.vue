<template>
	<view class="view-padding-container">
		<view class="select-container">
			<view>
				<label-radio :items="typeItem" attr="type" @change="selectList"></label-radio>
			</view>
			<view>
				<label-radio :items="levelItem" attr="level" @change="selectList"></label-radio>
			</view>
			<view>
				<label-radio :items="stateItem" attr="state" @change="selectList"></label-radio>
			</view>
			<view>
				<label-radio :items="alertItem" attr="alert" @change="selectList"></label-radio>
			</view>
		</view>
		<view v-show="!hasList" class="target-null-show">
			<text>目标空空如也~~~</text>
		</view>
		<view class="target-list-content" v-show="hasList">
			<view class="target-list-item" v-for="(l, index) in page.list" :key="l.id" @longpress="selectTarget(l)">
				<view class="target-list-item-head">
					<uni-tag :text="l.levelName" size="small" :type="levelType[l.level]"></uni-tag>
					<uni-tag :text="l.typeName" size="small" type="success" :inverted="true" style="margin-left: 20rpx;"></uni-tag>
				</view>
				<view class="target-list-item-content">
					{{l.content}}
				</view>
				<view class="target-list-item-bottom">
					<text>剩余：{{l.leftOverTime}}天</text>
					<text>{{l.stateName}}</text>
				</view>
			</view>
		</view>
		<bottom-model :height="bottomModelHeight" ref="bottomM" v-on:close="closeBottom">
			<view class="target-bottom-model-view">
				<text @tap="readOrEdit" v-show="target.state === 0">编辑</text>
				<text @tap="goToInfo">目标详情</text>
				<text @tap="goToTargetPlans">计划管理</text>
				<text style="color: red;" @tap="giveUpTarget" v-show="target.state !== 3">放弃目标</text>
				<text class="cancel-model" @tap="closeBottom">取消</text>
			</view>
		</bottom-model>
	</view>
</template>

<script>
	
	import targetApi from '../../../api/target/target.js'
	
	import {MyPage} from '../../../common/pageUtil.js'

	import uniTag from "../../../components/uni-tag/uni-tag.vue"
	import labelRadio from "../../../components/form/labelRadio.vue"
	import bottomModel from '../../../components/model/buttomModel.vue'
	
	export default {
		components: {
			uniTag,
			labelRadio,
			bottomModel
		},
		data() {
			return {
				page: {},
				target: {}, //当前选择的目标
				levelType: {1: 'primary', 2: 'primary', 3: 'warning', 4: 'error'},
				typeItem: [{label: '全部类型', val: ''}, {label: '学习', val: 2}, {label: '工作', val: 3}, {label: '生活', val: 1}],
				levelItem: [{label: '所有程度', val: ''}, {label: '紧急', val: 4}, {label: '近期', val: 3}, {label: '中期', val: 2}, {label: '远期', val: 1}],
				stateItem: [{label: '所有状态', val: ''}, {label: '草稿', val: 0}, {label: '进行', val: 1}, {label: '完成', val: 2}, {label: '放弃', val: 3}],
				alertItem: [{label: '提醒状态不限', val: ''}, {label: '开启', val: 1}, {label: '关闭', val: 0}]
			}
		},
		onLoad() {
			let v = this
			v.page = new MyPage({searchFunction: targetApi.getTargetList})
		},
		onNavigationBarButtonTap (e) {
			uni.navigateTo({
				url: 'targetAdd'
			})
		},
		onReachBottom () { //上拉触底事件监听
			this.page.getNextLine({filter: {value: ['']}})
		},
		computed: {
			hasList() {
				return this.page.list !== null && this.page.list !== undefined && this.page.list.length > 0
			},
			bottomModelHeight() {
				let height = 474
				if (this.target.state !== 0) {
					height = height - 92
				}
				if (this.target.state === 3) {
					height = height - 92
				}
				return height
			}
		},
		methods: {
			selectList(val) {
				this.page.params[val.name] = val.val
				this.page.requestLine({type: false, filter: {value: ['']}})
			},
			readOrEdit() {
				uni.navigateTo({ url: 'targetAdd?id=' + this.target.id})
			},
			selectTarget(l) {
				this.target = l
				this.$refs.bottomM.open()
			},
			closeBottom(e) {
				this.novel = {}
				this.$refs.bottomM.close()
			},
			goToInfo() {
				this.$refs.bottomM.close()
				uni.navigateTo({ url: 'targetInfo?id=' + this.target.id })
			},
			goToTargetPlans() {
				this.$refs.bottomM.close()
				uni.navigateTo({ url: 'targetPlans?id=' + this.target.id })
			},
			giveUpTarget() {				
				this.$refs.bottomM.close()
				let v = this
				if (!v.target.id) {
					console.log('请选择目标')
					return
				}
				let mess = null
				let startDate = null
				if (v.target.leftOverTime < 30) {
					mess = '距离完成目标只剩下 ' + v.target.leftOverTime + ' 天了，成功近在咫尺，确认真的放弃吗?'
				} else if ((startDate = (new Date().getTime() - v.target.createTime)/1000/60/60/24) < 30) {
					mess = "目标才刚开始 "+ parseInt(startDate) +"天，确认要放弃吗？"
				}
				//#ifdef APP-PLUS
				plus.nativeUI.confirm(mess, function(e){
					targetApi.giveUpTarget(v.target.id).then(res => {
						uni.showToast({ title: '成功放弃' })
						v.target.state = 3
					}).catch(err => {console.log(err)})
				});
				//#endif
				//#ifdef H5
				uni.showModal({
				    title: '提示', content: mess,
				    success: function (res) {
				        if (res.confirm) {
				            targetApi.giveUpTarget(v.target.id).then(res => {
				            	uni.showToast({ title: '成功放弃' })
								v.target.state = 3
								v.target.stateName = '放弃'
				            }).catch(err => { console.log(err) })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				})
				//#endif
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.select-container {
		width: 100%;
		height: 350rpx;
		border-bottom: 1rpx solid #F5F5F5;
		flex-direction: column;
	}
	
	.select-container > view {
		flex-direction: row;
		height: 60rpx;
		margin-bottom: 20rpx;
	}
	
	.select-title {
		width: 150rpx;
	}
	
	.select-item text {
		font-size: 30rpx;
		margin-left: 55rpx;
		font-weight: 600;
	}
	
	.target-null-show {
		width: 100%;
		height: 350rpx;
		justify-content: center;
	}
	
	.target-null-show text {
		font-size: 45rpx;
		color: #E0E0E0;
		margin-top: 100rpx;
	}
	
	.target-list-content {
		width: 100%;
		flex-direction: column;
	}
	
	.target-list-item {
		width: 600rpx;
		height: 150rpx;
		border: 0.5px solid #F0F0F0;
		margin: 30rpx auto;
		box-shadow: 2px 2px 3px 1px #E0E0E0;
		padding: 15rpx 15rpx;
		flex-direction: column;
	}
	
	.target-list-item-head {
		width: 100%;
		height: 50rpx;
		flex-direction: row;
	}
	
	.target-list-item-content {
		width: 100%;
		height: 60rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		text-indent:30rpx;
		font-size: 30rpx;
		color: #CDCDCD;
		height: 60rpx;
		line-height: 60rpx;
	}
	
	.target-list-item-content text {
	}
	
	.target-list-item-bottom {
		flex-direction: row;
		justify-content: space-between;
		font-size: 25rpx;
	}
	
	.target-bottom-model-view {
		width: 750upx;
		height: 100%;
		
		flex-direction: column;
	}
	
	.target-bottom-model-view text {
		border-bottom: 1upx solid #EFEFF4;
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		font-size: 30rpx;
		letter-spacing: 8rpx;
	}
	
	.cancel-model {
		border-top: 10upx solid #DDDDDD;
		border-bottom: 0 !important;
	}
</style>
