<template>
	<view class="view-container">
		<view class="account-add">
			<text @tap="addAccount">添加账号</text>
		</view>
		<view v-if="page.list.length === 0" style="font-size: 50upx;justify-content: center;color: #EFEFF4;">
			暂无信息
		</view>
		<template v-else>
			<list-item  v-for="(l, index) in page.list" :key="index" :title="l.source" :val="l.username" :sign="false" v-on:MyTap="openInfoMessage(l)"></list-item>
		</template>
		<buttom-model :height="460" ref="accountBottom" v-on:close="closeBottom">
			<view class="buttom-model">
				<text>来源&nbsp;&nbsp;&nbsp;{{current.source}}</text>
				<text>用户名&nbsp;&nbsp;&nbsp;{{current.username}}</text>
				<text>绑定邮箱&nbsp;&nbsp;&nbsp;{{current.bind_email}}</text>
				<text>绑定手机&nbsp;&nbsp;&nbsp;{{current.bind_phone}}</text>
				<text>备注&nbsp;&nbsp;&nbsp;{{current.remark}}</text>
			</view>
			<view class="buttom-button">
				<button size="mini" type="default" @tap="readPassword">密码</button>
				<button size="mini" type="primary" @tap="goToEdit">编辑</button>
				<button size="mini" type="warn" @tap="deleteAccount">删除</button>
			</view>
		</buttom-model>
		<input-dlog ref="pwdlog"></input-dlog>
	</view>
</template>

<script>
	import {MyPage} from '../../../common/pageUtil.js'
	
	import allAccountApi from '../../../api/allAccount/allAccount.js'
	
	import CryptoJS from '../../../crypto-js.js'
	
	import listItem from '../../../components/list-item.vue'
	
	import buttomModel from '../../../components/model/buttomModel.vue'
	
	export default {
		components: {
			listItem,
			buttomModel
		},
		data() {
			return {
			    page: {},
				current: {
					/* username: '',
					source: '',
					bind_email: '',
					bind_phone: '',
					remark: '' */
				},
				list: []
			}
		},
		onLoad() {
            let v = this
			v.page = new MyPage({'searchFunction': allAccountApi.getList, 'size': 13})
		},
		onPullDownRefresh () {
			console.log('下拉')
			uni.startPullDownRefresh({
				success: () => {
					this.page.requestLine({reflush: false, type: false, complete: () => { uni.stopPullDownRefresh() }})
				}
			}) 
		},
		onReachBottom () { //上拉触底事件监听
		console.log('上啦')
			this.page.getNextLine({})
		},
		methods: {
			addAccount () {
				uni.navigateTo({
					url: 'allAccountAdd'
				})
			},
			openInfoMessage (account) {
				let v = this
				v.current = account
				this.$refs.accountBottom.open()
			},
			closeBottom () {
				this.current = {}
				this.$refs.accountBottom.close()
			},
			deleteAccount () {
				let v = this
				//#ifdef APP-PLUS
				plus.nativeUI.confirm("确认删除 "+v.current.source+" 吗?", function(e){
					console.log('index:' + e.index)
					allAccountApi.deleteAccount(v.current.id).then(res => {
						v.page.deleteLine('id', v.current.id)
						uni.showToast({ title: '删除成功' })
					}).catch(err => {console.log(err)})
				});
				//#endif				
				v.closeBottom()
			},
			goToEdit() {
				uni.navigateTo({
					url: 'allAccountAdd?id=' + this.current.id
				})
				this.closeBottom()
			},
			readPassword () {
				let v = this
				v.$refs.pwdlog.show({
					title: '请输入密钥',
					submit: (key) => {
/* 						var encrypt = CryptoJS.DES.encrypt('abc12345', CryptoJS.enc.Base64.parse(key), {
						  mode: CryptoJS.mode.ECB,
						  padding: CryptoJS.pad.Pkcs7
						}).toString();
						console.log('加密后:' + encrypt); */
			            key += key += key
						let realP = CryptoJS.DES.decrypt(v.current.password, CryptoJS.enc.Utf8.parse(key), {
						  mode: CryptoJS.mode.ECB,
						  padding: CryptoJS.pad.Pkcs7
						}).toString(CryptoJS.enc.Utf8)
						//#ifdef APP-PLUS
						plus.nativeUI.alert(realP, () => {}, "密码", "OK");
						//#endif
					}
				})
			}
		}
	}
</script>

<style>
    view {
		display: flex;
	}
	
	.account-add {
		width: 100%;
		height: 150upx;
		justify-content: center;
	}
	
	.account-add text {
		margin-top: 20upx;
		width: 250upx;
		height: 65upx;
		line-height: 65upx;
		text-align: center;
		border: 1upx solid #EFEFF4;
		font-size: 40upx;
		color: #F8F8F8;
		background-color: #0FAEFF;
		border-radius: 50upx;
	}
	
	.buttom-model {
		width: 710upx;
		padding: 20upx 20upx;	
		flex-direction: column;
		border-bottom: 1upx solid #F5F5F5;
	}
	
	.buttom-model text {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		font-size: 30upx;
	}
	
	.buttom-button {
		width: 710upx;
		padding: 20upx 20upx;
		flex-direction: row;
		justify-content: center;
		margin-top: 10upx;
	}

</style>
