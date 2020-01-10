<template>
	<view class="view-padding-container">
		<uni-collapse>
		    <uni-collapse-item title="目标原因">
		        <view class="target-info-area">
		            {{target.cause}}
		        </view>
		    </uni-collapse-item>
		    <uni-collapse-item title="内容">
		        <view class="target-info-area">
		            {{target.content}}
		        </view>
		    </uni-collapse-item>
		    <uni-collapse-item title="完成标志">
		        <view class="target-info-area">
		            {{target.finishSign}}
		        </view>
		    </uni-collapse-item>
			<uni-collapse-item title="完成时间">
			    <view class="target-info-area">
					<text>预期完成时间&nbsp;&nbsp;{{target.expectFinishTime}}</text>
					<text>实际完成时间&nbsp;&nbsp;{{realTime}}</text>
			    </view>
			</uni-collapse-item>
			<uni-collapse-item title="计划列表">
			    <view v-if="plans" class="target-info-area target-plan-info" v-for="(t, index) in plans" :key="index">
					<view style="display: flex;flex-direction: row;justify-content: space-between;">
						<text>{{index + 1}}.{{t.name}}</text>
						<text>详情</text>
					</view>
					<text class="target-plan-content">{{t.content}}</text>
			    </view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import targetApi from '../../../api/target/target.js'
	
	import uniCollapse from '../../../components/uni-collapse/uni-collapse'
	import uniCollapseItem from '../../../components/uni-collapse-item/uni-collapse-item'
	
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				target: {
				},
				plans: []
			}
		},
		onLoad(option) {
			let v = this, id = option.id
			
			targetApi.getTarget(id).then(res => {
				v.target = res
			}).catch(err => { console.log(err) })
			
		},
		computed: {
			realTime() {
				return this.target.state === 3 ? this.target.realFinishTime : '未完成'
			}
		}
	}
</script>

<style>
	
	
	
	.target-info-area {
		font-size: 35rpx;
		color: #8F8F94;
		padding: 30rpx;
		display: flex;
		flex-direction: column;
	}
	
	.target-plan-info {
		display: flex;
		flex-direction: column;
	}
	
	.target-plan-content {
		font-size: 30rpx;
		margin-top: 15rpx;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
