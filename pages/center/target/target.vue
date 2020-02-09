<template>
	<view class="view-container">
		<!-- 目标列表 -->
		<view class="targetContent">
			<view class="emptyView" v-show="nextAction === null">
				<text>放松啦，今天没有需要完成的目标了</text>
			</view>
			<view class="action" v-if="nextAction !== null">
				{{nextAction.result}}
				<view v-show="nextAction.action.result === 0">
					<text style="margin-right: 20px;">剩余</text>
					<uni-countdown :show-day="false" color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" :hour="countdown.hour" :minute="countdown.min" :second="countdown.sec" @timeup="timeUp"></uni-countdown>
				</view>
				<view v-show="nextAction.action.result !== 0">
					<button size="mini" style="height: 25px;line-height25px: 14px;" v-show="nextAction.action.result === 1" @tap="startAction">开始</button>
					<button size="mini" type="primary" style="height: 25px;line-height25px: 14px;" v-show="nextAction.action.result === 2" @tap="completeAction">完成</button>
					<button size="mini" type="warn" style="height: 25px;line-height25px: 14px;" @tap="giveUpAction">放弃</button>
				</view>
				<text>{{nextAction.planName}}</text>
				<text>执行时间：{{nextAction.executionTime}}{{culTime(nextAction.executionTime)}}</text>
				<text>结束时间：{{nextAction.endTime}}{{culTime(nextAction.endTime)}}</text>
			</view>
			<view v-if="willList.length > 0" v-for="(w, index) in willList" :key="w.id" class="plan-will-list">
			    <text>{{w.planName}}</text>
				<text>执行时间：{{w.executionTime}}{{culTime(w.executionTime)}}</text>
			</view>
		</view>
		<uni-drawer :visible="drawer" mode="right" @close="closeDrawer">
		    <view style="padding:30upx;" class="drawer-list">
				<navigator url="targetList">
					<view class="drawer-item">
						<text>列表</text>
					</view>
				</navigator>
				<navigator url="waitDealList">
					<view class="drawer-item">
						<text>待处理计划</text>
					</view>
				</navigator>
		    </view>
		</uni-drawer>
		<view class="target-menu">
			<view class="target-menu-add" @tap="goToAddTarget">
				<text>添加新目标</text>
			</view>
			<view class="target-menu-drawer" @tap="openDrawer" >
				<text>展开</text>
			</view>
		</view>
	</view>
</template>
<!--  当前页面内容  显示当日即将开始的目标任务（按照剩余时间由小到大排列），如果没有则显示请加入目标 ，菜单栏左边打开一页，右边抽屉 -->

<script>
	
	import targetApi from '../../../api/target/target.js'
	import planApi from  '../../../api/target/targetPlan.js'
	
	import util from '../../../common/objUtil.js'
	import dataUtil from '../../../common/dataUtil.js'
	
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniCountdown from '@/components/uni-countdown/uni-countdown.vue'
	
	var endTimeOutId = null
	var tapActionId = null
	
	export default {
		components: {
			uniDrawer,
			uniCountdown
		},
		data() {
			return {
				drawer: false,  //右边抽屉开关
				nextAction: null,
				countdown: {
					hour: 0,
					min: 0,
					sec: 0
				},
				willList: []
			}
		},
		onLoad() {
			this.loadWillActionList()
		},
		onShow () {
			console.log('show')
		},
		methods: {
			goToAddTarget() {
				uni.navigateTo({ url: 'targetAdd' })
			},
			openDrawer() {
				this.drawer = true
			},
			closeDrawer() {
				this.drawer = false;
			},
			loadWillActionList() {
				let v = this
				v.nextAction = null
				planApi.getWillTargetPlans().then(res => {
					if (!res || res.length === 0) {
						return
					}
					v.nextAction = res.shift()
					v.willList = res
					
					let now = new Date()
					
					if (v.nextAction.action.result === 2) {
						v.endTimeOutTip(v.nextAction, now)
					} else {
						var ex = dataUtil.timeToDate(now, v.nextAction.executionTime) //下一个需要执行的计划的执行时间
						let dis = (ex.getTime() - now.getTime())/1000
						if (dis > 0) {
							v.countdown.hour = parseInt(dis/3600);    // 小时 60*60 总小时数-过去的小时数=现在的小时数 
							v.countdown.min = parseInt(dis%3600/60); // 分钟 -(day*24) 以60秒为一整份 取余 剩下秒数 秒数/60 就是分钟数
							v.countdown.sec = parseInt(dis%60);  // 以60秒为一整份 取余 剩下秒数
						} else {
							v.timeUp()
						}
					}					
                    /* if (v.willList.length === 0) {
						return
					}
					let nextEx =  dataUtil.timeToDate(now, v.willList[0].executionTime) //下下一个需要执行的计划的执行时间
					let endTime =  dataUtil.timeToDate(now, v.nextAction.endTime) //下个执行计划的结束时间
					if (endTime > nextEx) {
						tapActionId = setTimeout(function (p) {
							p.loadWillActionList()
							clearTimeout(tapActionId)
						}, nextEx - now, v)
					} */
				}).catch(err => { console.log(err) })
			},
			culTime(timeStr) {
				return util.isStr(timeStr) ? (parseInt(timeStr.substring(0, timeStr.indexOf(':'))) <= 12 ? ' AM' : ' PM') : ''
			},
			/**
			 * 当倒计时结束后执行此方法
			 */
			timeUp () {
				let v = this
				let data = {
					'id': v.nextAction.action.id,
					'result': (v.nextAction.action.result = 1)
				}
				planApi.alterActionState(data).then(res => {}).catch(err => { console.log(err) })
			},
			startAction () {
				let v = this
				let now = new Date()
				let data = {
					'id': v.nextAction.action.id,
					'result': (v.nextAction.action.result = 2),
					'startTime': parseInt(now.getTime()/1000)
				}
				v.endTimeOutTip(v.nextAction, now)
				planApi.alterActionState(data).then(res => {}).catch(err => { console.log(err) })
			},
			endTimeOutTip (plan, now) {
				let endTime = plan.endTime.split(':')
				let end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endTime[0], endTime[1], endTime[2])
				//首先情况之前的定时器，避免重复创建定时器
				clearTimeout(endTimeOutId)
				endTimeOutId = setTimeout(function (id, planName) {
				}, end - now, plan.action.id, plan.planName)
			},
			completeAction() {
				let v = this
				let now = new Date()
				let endTime = parseInt(now.getTime()/1000)
				let exEnd = dataUtil.timeToDate(now, v.nextAction.endTime).getTime()/1000
				let data = {
					'id': v.nextAction.action.id,
					'result': (endTime - exEnd) > 5*60 ? 4 : 3,
					'endTime': endTime
				}
				if (data.result === 4) {
					//#ifdef APP-PLUS
					plus.nativeUI.prompt('来总结一下超时的原因吧', e => {
						data.reason = e.value === null || e.value === undefined ? '' : e.value
						planApi.alterActionState(data).then(res => {
							v.loadWillActionList()
						}).catch(err => { console.log(err) })
					}, '', '', ['确认']);
					//#endif
				} else {
					planApi.alterActionState(data).then(res => {
						v.loadWillActionList()
					}).catch(err => { console.log(err) })
				}
			},
			giveUpAction() {
				let v = this
				let data = {
					'id': v.nextAction.action.id,
					'result': (v.nextAction.action.result = 6),
					'endTime': parseInt(new Date().getTime()/1000)
				}
				planApi.alterActionState(data).then(res => {
					v.loadWillActionList()
				}).catch(err => { console.log(err) })
			}
		}
	}
</script>

<style>
	
view {
	display: flex;
}

.targetContent {
	width: 100%;
	flex-direction: column;
	justify-content: center;
}

.targetContent .emptyView {
	width: 100%;
	height: 120px;
	justify-content: center;
	margin-top: 100px;
}

.targetContent .emptyView text {
	
}

.targetContent .action, .plan-will-list {
	margin-left: auto;
	margin-right: auto;
	flex-direction: column;
}

.targetContent .action {
	width: 280px;
	height: 120px;
	margin-top: 20rpx;
	border-radius: 35rpx;
	border: 1rpx solid #0FAEFF;
	background: rgba(0, 0, 0, 0.1);
	padding: 10px 10px;
}

.targetContent .action > view {
	width: 280px;
	height: 50px;
}

.targetContent .action > text {
	font-size: 18px;
}

.plan-will-list {
	width: 175.4px;
	height: 60.82px;
	margin-top: 45rpx;
	border: 1px solid #DCDCDC;
	padding: 5px 5px;
}

.plan-will-list text {
	font-size: 15px;
	text-align: left;
	height: 30.41px;
	line-height: 30.41px;
}

.target-menu {
	position: absolute;
	bottom: 0;
	width: 710upx;
	height: 100upx;
	padding: 10upx 20upx;
	border-top: 1upx solid #E0E0E0;
	box-shadow: 0upx -10upx 10upx #DCDCDC;
}

.target-menu > .target-menu-add {
	position: absolute;
	left: 250rpx;
	top: -50rpx;
	width: 250rpx;
	height: 100rpx;
	background: #007AFF;
	border-radius: 80rpx;
	box-shadow: 0upx 10upx 10upx #DCDCDC;
	flex-direction: row;
	justify-content: center;
}

.target-menu-add text {
	font-size: 30upx;
	color: #FFFFFF;
	height: 100upx;
	line-height: 100upx;
}

.target-menu > .target-menu-drawer {
	position: absolute;
	right: 50rpx;
	top: 30rpx;
}

.target-menu-drawer text {
	font-size: 25rpx;
	color: #87CEFA;
	border-radius: 150rpx;
	border: 1rpx solid #0FAEFF;
	padding: 10rpx 10rpx;
}

.drawer-list {
	flex-direction: column;
	width: 100%;
}

.drawer-item {
	width: 100%;
	justify-content: center;
}

.drawer-item text {
	font-size: 30rpx;
}
</style>
