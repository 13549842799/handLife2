<template>
	<view class="view-container">
		<!-- 目标列表 -->
		<view class="targetContent">
			<view class="action">
				
			</view>
		</view>
		<uni-drawer :visible="drawer" mode="right" @close="closeDrawer">
		    <view style="padding:30upx;" class="drawer-list">
				<navigator url="targetList">
					<view class="drawer-item">
						<text>列表</text>
					</view>
				</navigator>
		    </view>
		</uni-drawer>
		<view class="target-menu">
			<view class="target-menu-add" @tap="goToAddTarget">
				<text>添加新目标</text>
			</view>
			<view class="target-menu-drawer" @tap="drawer = true" >
				<text>展开</text>
			</view>
		</view>
	</view>
</template>
<!--  当前页面内容  显示当日即将开始的目标任务（按照剩余时间由小到大排列），如果没有则显示请加入目标 ，菜单栏左边打开一页，右边抽屉 -->

<script>
	
	import targetApi from '../../../api/target/target.js'
	import planApi from  '../../../api/target/targetPlan.js'
	
	import uniDrawer from "@/components/uni-drawer/uni-drawer.vue"
	
	export default {
		components: {
			uniDrawer
		},
		data() {
			return {
				drawer: false,  //右边抽屉开关
				nextAction: null,
				willList: []
			}
		},
		onLoad() {
			this.loadWillActionList()
		},
		methods: {
			goToAddTarget() {
				uni.navigateTo({ url: 'targetAdd' })
			},
			closeDrawer() {
				console.log('触发false')
				this.drawer = false;
			},
			loadWillActionList() {
				let v = this
				planApi.getWillTargetPlans(res => {
					if (!res || res.length === 0) {
						return
					}
					v.nextAction = res.shift()
					v.willList = res
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
	width: 710upx;
	flex-direction: column;
	justify-content: center;
}

.targetContent .action {
	width: 61.8%;
	height: 200upx;
	margin-left: auto;
	margin-right: auto;
	margin-top: 20upx;
	border-radius: 35upx;
	border: 1upx solid #0FAEFF;
	background: rgba(0, 0, 0, 0.1);
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
