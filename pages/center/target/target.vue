<template>
	<view class="view-container">
		<!-- 目标列表 -->
		<view class="targetContent">
			<view class="action">
				
			</view>
		</view>
		<view class="target-menu">
			<view class="target-menu-add">
				<text class="iconfont icon-jiahao"></text>
				<text>添加新目标</text>
			</view>
		</view>
	</view>
</template>
<!--  当前页面内容  显示当日即将开始的目标任务（按照剩余时间由小到大排列），如果没有则显示请加入目标 ，菜单栏左边打开一页，右边抽屉 -->

<script>
	
	import '../../../api/target/target.js'
	
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
	left: 250upx;
	top: -50upx;
	width: 250upx;
	height: 100upx;
	background: #007AFF;
	border-radius: 80upx;
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

.icon {
	font-family: texticons;
}

</style>
