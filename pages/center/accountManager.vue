<template>
	<view class="accountManager-body">
		<view class="account-list">
			<!-- 个人信息 -->
			<view  class="account-list-item">
				<view class="account-list-item-ul">
					<text>头像</text>
					<view class="account-list-item-ul-right">					
						<text class="item-text">&#xe65e;</text>
						<image class="avatar-style" :src="avatar"></image>
					</view>	
				</view>
				<view class="account-list-item-ul">
					<text>用户名</text>
					<view class="account-list-item-ul-right">					
						<text class="left-text">{{accountName}}</text>
					</view>	
				</view>
				<view class="account-list-item-ul" hover-class="tap-style" :hover-stay-time="remainTime" @tap="showNikeNameEdit">
					<text>昵称</text>
					<view class="account-list-item-ul-right" >					
						<text class="item-text">&#xe65e;</text>
						<text class="left-text">{{nikename}}</text>
					</view>
				</view>
			</view>
			<!-- 职员相关 -->
			<view class="account-list-item">
				<view class="account-list-item-ul">
					<text>真实姓名</text>
					<view class="account-list-item-ul-right">					
						<text class="left-text">{{employee.name}}</text>
					</view>	
				</view>
				<view class="account-list-item-ul">
					<text>编号</text>
					<view class="account-list-item-ul-right">					
						<text class="left-text">{{employee.ecode}}</text>
					</view>	
				</view>
				<view class="account-list-item-ul">
					<text>身份证号码</text>
					<view class="account-list-item-ul-right">					
						<text class="left-text">{{encryptionIdCard}}</text>
					</view>	
				</view>
				<view class="account-list-item-ul">
					<text>详细</text>
				</view>
			</view>
			<!-- 安全设置 -->
			<view class="account-list-item">
				<view class="account-list-item-ul">
					<text class="">密码</text>
					<view class="account-list-item-ul-right">					
						<text class="item-text">&#xe65e;</text>
					</view>			
				</view>
				<view class="account-list-item-ul">
					<text class="">手机绑定</text>
					<view class="account-list-item-ul-right">					
						<text class="item-text">&#xe65e;</text>
						<text class="left-text">{{encryptionPhone}}</text>
					</view>			
				</view>
			</view>
		</view>
		<modal-view :hidden.sync='show' @confirm="submitNikeName">
			<view slot='title' style="title-view">
				<text>请输入昵称</text>
			</view>
			<view slot='text'>
				<view style='font-size: 14px;color: #f00;padding: 15px;'>
					<input type="text" v-model="newNikeName"/>
				</view>
			</view>
		</modal-view>
	</view>
</template>

<script>
	import {
	    mapState,
	    mapMutations,
		mapGetters
	} from 'vuex'
	
	import loginApi from '../../api/login.js'
	import centerApi from '../../api/center.js'
	import dataUtil from '../../common/dataUtil.js'
	
	import modalView from '../../components/x-modal/x-modal.vue'

	
	export default {
		components: {
			modalView
		},
		data () {
			return {
				employee: {},
				remainTime: 100,
				show: true,
				newNikeName: ''
			}
		},
		computed: {
			...mapState(['accountName', 'nikename', 'avatar', 'alterCache']),
			...mapGetters(['encryptionPhone']),
			encryptionIdCard () {
				return dataUtil.encryption(this.employee.idCard, 3, 4)
			}
		},
		onLoad () {
			console.log('进入accountmanager')
			let v = this
			centerApi.employeeInfo().then(res => {
				v.employee = res			
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			showNikeNameEdit () {
				console.log('编辑昵称')
				this.show = false
			},
			submitNikeName () {
				let v = this
				centerApi.editNikeName(this.newNikeName).then(res => {
					console.log('成功')
					let map = new Map()
					map.set('nikename', this.newNikeName)
					v.alterCache(this.newNikeName)
					//修改缓存信息
				}).catch(err => {
					console.log('失败：' + err)
				})
			}
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}
	.accountManager-body {
		background-color: #EFEFF4;
	}
	
	.account-list {
		flex-direction: column;
	}
	
	.account-list-item {
		background-color: #FFFFFF;
		border-top: 1upx solid #F8F8F8;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
		-webkit-box-shadow: 0.5upx 3upx -1upx;  
		-moz-box-shadow: 0.5upx 3upx -1upx;  
		box-shadow: 1upx -1upx 1upx 1upx #DDDDDD;
	}
	
	.account-list-item-ul {
		font-family: "思源黑体简体";
		font-size: 30upx;
		height: 120upx;
		line-height: 120upx;
		border-bottom:1upx solid #F8F8F8;
		padding-left: 20upx;
		flex-direction: row;
		box-sizing: border-box;
	}
	
	.account-list-item-ul-right {
		flex-direction: row-reverse;
		flex: 1;
		align-items:center;
	}
	
	.avatar-style {
		width: 80upx;
		height: 80upx;
		border-radius: 150upx;
	}
	
	.item-text {
		font-family: texticons;
	}
	
	.left-text {
		color: #C8C7CC;
	}
	
	.item-text, .avatar-style, .left-text {
		margin-right: 20upx;
	}
	
	.tap-style {
		background-color: #EFEFF4;
		box-shadow: 1upx -1upx 1upx 1upx #DDDDDD inset;
		
	}
	.title-view {
		text-align: center;
	}
</style>
