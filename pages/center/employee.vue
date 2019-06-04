<template>
	<view style="flex-direction: column;">
		<view class="employee-head">
			<view class="employee-head-help">
				<text></text>
			</view>
			<view class="employee-head-avatar-view">
				<image :src="avatar" class="employee-head-avatar-view-avatar"></image>
			</view>
			<view class="employee-head-alter">
				<text class="employee-head-alter-text">修改</text>
			</view>
		</view>
		<view class="employee-name">
			<text>{{employee.name}}</text>
		</view>
		<view class="employee-content">
			<list-item title="编号" :val="employee.ecode"></list-item>
		</view>
	</view>
</template>

<script>
	import centerApi from '../../api/center.js'
	
	import listItem from '../../components/list-item.vue'
	
	export default {
		components: {
			listItem
		},
		data () {
			return {
				employee: {
					ecode: '12312'
				}
			}
		},
		computed: {
			avatar () {
				return this.employee.avatar ? this.employee.avatar : '/static/img/qq.png'
			}
		},
		onLoad() {
			let v = this
			centerApi.employeeInfo(1).then(res => {
				console.log('remp:' + res)
				v.employee = res
			}).catch(err => {
				console.log(err)
			})
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}
	
	.employee-head {
		height: 250upx;
		width: 750upx;
		flex-direction: row;
	}
	
	.employee-head-help, .employee-head-avatar-view, .employee-head-alter {
		flex-direction: column-reverse;
	}
	
	.employee-head-help {
		width: 10%;
	}
	
	.employee-head-avatar-view {
		align-items: center;
		width: 80%;
	}
	
	
	
	.employee-head-avatar-view-avatar {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
		border: 1upx solid #0FAEFF;
	}
	
	.employee-head-alter {
		justify-content: space-between;
		width: 10%;
	}
	
	.employee-head-alter-text {
		font-size: 25upx;
		color: #999999;
		margin-right: 20upx;
	}
	
	.employee-name {
		font-size: 30upx;
		color: #007AFF;
		justify-content: center;
	}
	
	.employee-content {
		flex-direction: column;
		background-color: #FFFFFF;
	}
</style>
