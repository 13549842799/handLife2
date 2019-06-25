<template>
	<view class="accountManager-body">
		<view class="account-list">
			<!-- 个人信息 -->
			<view  class="account-list-item">
				<list-item title="头像"  type="img" :image="avatar" @MyTap="changeAvatar"></list-item>
				<list-item title="用户名" :val="accountName" :sign="false"></list-item>
				<list-item title="昵称" :val="nikename" @MyTap="showNikeNameEdit"></list-item>
			</view>
			<!-- 职员相关 -->
			<view class="account-list-item">
				<list-item title="真实姓名" :val="employee.name" :sign="false"></list-item>
				<list-item title="编号" :val="employee.ecode" :sign="false"></list-item>
				<list-item title="身份证号码" :val="encryptionIdCard" :sign="false"></list-item>
				<navigator url="employee">
					<list-item><text>详细</text></list-item>
				</navigator>
			</view>
			<!-- 安全设置 -->
			<view class="account-list-item">
				<list-item title="密码" ></list-item>
				<list-item title="手机绑定" :val="encryptionPhone"></list-item>
			</view>
		</view>
		<dialog-view ref="dialog"></dialog-view>
	</view>
</template>

<script>
	import {
	    mapState,
	    mapMutations,
		mapGetters
	} from 'vuex'
	
	import {fileUrl} from '../../base_variable.js'
	
	import {loginKey} from '../../http.js'
	import dataUtil from '../../common/dataUtil.js'
	import fileUtil from '../../common/fileUtil.js'
	
	import loginApi from '../../api/login.js'
	import centerApi from '../../api/center.js'

    import listItem from '../../components/list-item.vue'
    import dialogView from '../../components/inputDlog.vue'
	
	export default {
		components: {
			listItem,
			dialogView
		},
		data () {
			return {
				employee: {},
				remainTime: 100
			}
		},
		computed: {
			...mapState(['accountName', 'nikename', 'avatar']),
			...mapGetters(['encryptionPhone']),
			encryptionIdCard () {
				return dataUtil.encryption(this.employee.idCard, 3, 4)
			}
		},
		onLoad () {
			console.log('avatar:',this.avatar)
			let v = this
			centerApi.employeeInfo().then(res => {
				v.employee = res			
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			...mapMutations(['alterCache']),
			showNikeNameEdit () {
				console.log('编辑昵称')
				let v = this
				this.$refs.dialog.show({
					title: '请输入昵称',
					smallTitle: '起个好听的名字,让它更加容易被记住!',
					submit: (name) => {
						centerApi.editNikeName(name).then(res => {
							let map = new Map()
							map.set('nikename', name)
							v.alterCache(map)
							//修改缓存信息
						}).catch(err => {
							console.log(err)
							uni.showModal({
								title: '更改失败',
								content: err.data.message,
								showCancel: false
							})
						})
					}
				})
			},
			/**
			 * 修改头像
			 */
			changeAvatar () {
				let v = this
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					//sourceType: ['camera'], //从相册选择 
					success: function (res) {
						let tempFilePath = res.tempFilePaths[0]
						fileUtil.imageInfo(tempFilePath).then(image => {
							if (image.width > 120 || image.height > 120) {
								uni.showToast({ title: '图片大小超过规定 (120px*120px)', icon: "none" })
								return
							}
							return centerApi.avatarAlter('img', tempFilePath)
						}).then(res => {
							switch (res.status) {
								case 200:
								    let map = new Map()
									map.set('avatar', fileUrl + res.data)
									v.alterCache(map)
								    break
								default: 
								    console.log('other', typeof res)
								    uni.showToast({ title: res.message, icon: "none" })
							}
							console.log(res);
						}).catch(err => { console.log(err) })
					}
				});
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
</style>
