<template>
	<view class="view-padding-container">
		<view class="plan-base-message">
			<view class="message-title">计划名称</view>
			<view>{{plan.targetName}}</view>
			<view class="message-title">计划内容</view>
			<view>{{plan.content}}</view>
			<view class="message-title">初次执行日期</view>
			<view>{{plan.startDate}}</view>
			<view class="message-title">执行开始时间</view>
			<view></view>
			<view class="message-title">执行结束时间</view>
			<view>{{plan.endTime}}</view>
			<view class="message-title">周期</view>
			<view></view>
		</view>
		
		<view class="alter-record-list">
			<text @tap="hideOrShowRecords">历史修改记录展开</text>
		</view>
	</view>
</template>

<script>
	
	import planApi from '../../../api/target/targetPlan.js'
	
	export default {
		data() {
			return {
				plan: {
					targetName: '测试计划'
				},
				state: 0
			}
		},
		onLoad(option) {
			let v = this
			let id = option.id
			
			/* planApi.getPlan(id).then(res => {
				v.plan = res
			}).catch(err => { console.log(err) }) */
		},
		methods: {
			hideOrShowRecords() {
				
			}
		}
	}
</script>


<style>
	view {
		display: flex;
	}
	
	.plan-base-message {
		width: 100%;
		flex-direction: column;
	}
	
	.plan-base-message > view {
		width: 100%;
		margin-bottom: 20rpx;
	}
	
	.message-title {
		font-size: 30rpx;
	}
	
	.alter-record-list {
		width: 100%;
	}
	
	.alter-record-list > text {
		width: 100%;
		text-align: center;
		font-size: 30rpx;
	}
</style>
