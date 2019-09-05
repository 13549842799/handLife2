<template>
	<view class="view-container account-container">
		<text style="color: red;">用户名*</text>
		<input v-model="account.username" placeholder-class="common-placeholder" />
		<text style="color: red;">密码*</text>
		<input v-model="account.password"  :password="true" placeholder-class="common-placeholder"/>
		<text style="color: red;">重复确认密码*</text>
		<input v-model="surePassword"  :password="true" placeholder-class="common-placeholder"/>
		<text style="color: red;">来源*</text>
		<input v-model="account.source"  placeholder-class="common-placeholder"/>
		<text>绑定邮箱</text>
		<input v-model="account.bind_email"  placeholder-class="common-placeholder"/>
		<text>绑定手机</text>
		<input v-model="account.bind_phone"  placeholder-class="common-placeholder"/>
		<text>备注</text>
		<input v-model="account.remark"  placeholder-class="common-placeholder"/>
		<view style="width: 100%; height: 100upx;justify-content: center;margin-top: 20upx;">
			<button @tap="saveAccount" size="mini" type="primary" style="height: 50upx; line-height: 50upx;">保存</button>
			<button v-if="account.id" @tap="deleteAccount" size="mini" type="primary" style="height: 50upx; line-height: 50upx;">删除</button>
		</view>
	</view>
</template>

<script>
	import allAccountApi from '../../../api/allAccount/allAccount.js'
	
	export default {
		data () {
			return {
				account: {
					username: '',
					password: '',
					source: '',
					bind_email: '',
					bind_phone: '',
					remark: ''
				},
				surePassword: ''
			}
		},
		onLoad(option) {
			let v = this
			let id = option.id
			if (id == null) {
				return
			}
			v.account.id = id
			allAccountApi.getAccount(id).then(res => {
				v.account = res
				v.surePassword = res.password
			}).catch(err => { console.log(err) })
		},
		methods: {
			saveAccount () {
				let v = this						
				if (v.account.password !== v.surePassword) {
					uni.showToast({
						title: '两次密码不一致',
						icon: "none"
					})
					return
				}
				v.save()
			},
			save () {
				let v = this
				allAccountApi.saveAccount(v.account).then(res => {
					uni.showToast({
						title: '保存成功'
					})
					if (!v.account.id) {
						v.account = res
					}
				}).catch(err => {console.log(err)})
			},
			deleteAccount () {
				//#ifdef APP-PLUS
				plus.nativeUI.confirm("确认删除吗?", function(e){
					deleteA(id)
				});
				//#endif
				//#ifdef H5
				this.deleteA(this.account.id)
				//#endif
			},
			deleteA (id) {
				allAccountApi.deleteAccount(id).then(res => {
					uni.navigateBack()
				}).catch(err => { console.log(err) })
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.account-container {
		width: 710upx;
		padding: 0 20upx;
	}
	
	.account-container text {
		font-size: 30upx;
		font-weight: 700;
		color: #DCDCDC;
		margin: 10upx 0;
	}
	
	.account-container input {
		border-bottom: 1upx solid #F2F2F2;
	}
</style>
