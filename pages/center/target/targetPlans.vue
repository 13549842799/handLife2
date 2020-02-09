<template>
	<view class="view-padding-container">
		<view class="control-view">
			<text style="margin-right: 10px;">{{typeName}}</text><switch :checked="true" @change="changeType"></switch>
		</view>
		<view v-show="list.length > 0" class="plan-list" v-for="(l, index) in list" :key="l.id">
			<view style="justify-content:space-between;">
				<text @tap="goToActions(l.id)" class="paln-name">{{l.planName}}</text>
				<text style="font-size: 25rpx;color: #E0E0E0">周期：{{l.period}}{{l.unitName}}</text>
			</view>
			<view class="plan-time">
				<text>执行时间</text>
				<text>{{format(l.executionTime)}}-{{format(l.endTime)}}</text>
				<navigator :url="'targetPlanInfo?id='+l.id" hover-class="na-hover-class">详情</navigator>
				<navigator :url="'targetPlanAdd?id='+l.id" style="color: #007AFF;" hover-class="na-hover-class">编辑</navigator>
				<text style="color: red;" @tap="deletePlan(l.id, l.planName)">删除</text>
			</view>
		</view>
		<view class="empty-class" v-show="list.length === 0 && type === 1">
			<text>计划空空如也</text>
			<text>快去订立新的计划的</text>
		</view>
		<view class="empty-class" v-show="list.length === 0 && type === 0">
			<text>计划空空如也</text>
			<text>你还没有废弃过一个计划哦</text>
		</view>
		<navigator url="target" class="goBackBtn">回到目标页</navigator>
	</view>
</template>

<script>
	
	import targetPlanApi from '../../../api/target/targetPlan.js'
	
    import dataUtil from '../../../common/dataUtil.js'
	
	import uniList from '../../../components/uni-list/uni-list.vue'
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	
	export default {
		components: {
		},
		data() {
			return {
				/* list: [{id: 1, targetName: '计划1', perion: 10, unionName: '天', executeTime: 'AM 8:16', endTime: 'PM 12:12'},
				       {id:2, targetName: '计划2', perion: 1, unionName: '月', executeTime: 'AM 8:16', endTime: 'PM 12:12'}], */
			    list: [],
				type: 1, //当前列表的类型（0-已删除计划列表 1-运行计划列表)
				targetId: null
			}
		},
		onLoad(option) {
			let v = this
			v.targetId = option.id
			targetPlanApi.getTargetPlans({'targetId': v.targetId}).then(res => {
				v.list = res
			}).catch(err => {
				console.log(err)
			})
		},
		onNavigationBarButtonTap (e) {
			uni.navigateTo({ url: 'targetPlanAdd?targetId=' + this.targetId})
		},
		computed: {
			typeName() {
				return this.type == 0 ? '已删除' : '运行'
			}
		},
		methods: {
			format (str) {
				return dataUtil.getDateArea(str) + ' ' + str
			},
			changeType(e) {
				let v = this				
				v.type = e.detail.value ? 1 : 0
			},
			goToActions (id) {
				uni.navigateTo({ url: 'planActions?planId=' + id})
			},
			/**
			 * 删除计划
			 * @param {Object} id
			 */
			deletePlan(id, name) {
				//#ifdef APP-PLUS
				plus.nativeUI.prompt("确定删除计划: "+ name +"?", function(e){
					if (e.index === 0) {
						targetPlanApi.deletePlan(id, e.value).then(res => {
							plus.nativeUI.alert('删除成功');
						}).catch(err => { console.log(err) })
					}
				}, "删除", "删除理由", ["确定","取消"]);
				//#endif
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	.control-view {
		width: 100%;
		height: 50px;
	}
	
	.plan-list {
		width: 100%;
		flex-direction: column;
		margin-bottom: 30rpx;
		border-bottom: 1px solid #F2F2F2;
	}
	
	.plan-list > view {
		margin-bottom: 20rpx;
	}
	
	.plan-time text, navigator{
		font-size: 25rpx;
		margin-right: 15rpx;
	}
	.paln-name {
		font-size: 35rpx;
	}
	
	.na-hover-class {
		color: #DCDCDC;
	}
	
	.empty-class {
		width: 100%;
		flex-direction: column;
		margin-top: 200px;
	}
	
	.empty-class text {
		text-align: center;
		font-size: 20px;
	}
	
	.goBackBtn {
	    position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 18px;
		color: #CDCDCD;
		border-top: 1px solid #EFEFF4;
	}
</style>
