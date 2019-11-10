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
		</view>
		<view v-show="!hasList" class="target-null-show">
			<text>目标空空如也~~~</text>
		</view>
		<view class="target-list-content" v-show="hasList">
			<view class="target-list-item" v-for="(l, index) in page.list" :key="l.id" @tap="readOrEdit(l.id, l.state)">
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
	</view>
</template>

<script>
	
	import targetApi from '../../../api/target/target.js'
	
	import {MyPage} from '../../../common/pageUtil.js'

	import uniTag from "../../../components/uni-tag/uni-tag.vue"
	import labelRadio from "../../../components/form/labelRadio.vue"
	
	export default {
		components: {
			uniTag,
			labelRadio
		},
		data() {
			return {
				page: {},
				levelType: {1: 'primary', 2: 'primary', 3: 'warning', 4: 'error'},
				typeItem: [{label: '全部类型', val: ''}, {label: '学习', val: 2}, {label: '工作', val: 3}, {label: '生活', val: 1}],
				levelItem: [{label: '所有程度', val: ''}, {label: '紧急', val: 4}, {label: '近期', val: 3}, {label: '中期', val: 2}, {label: '远期', val: 1}],
				stateItem: [{label: '所有状态', val: ''}, {label: '草稿', val: 0}, {label: '进行', val: 1}, {label: '完成', val: 2}, {label: '放弃', val: 3}]
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
		computed: {
			hasList() {
				return this.page.list !== null && this.page.list !== undefined && this.page.list.length > 0
			}
		},
		methods: {
			selectList(val) {
				this.page.params[val.name] = val.val
				this.page.requestLine({type: false, filter: {value: ['']}})
			},
			readOrEdit(id, state) {
				if (state === 0) {
					uni.navigateTo({
						url: 'targetAdd?id=' + id
					})
				} else {
					
				}
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
		height: 250rpx;
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
</style>
