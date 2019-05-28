<template>
	<view>
		<text>欢迎进入</text>
	</view>
</template>

<script>
	import {
	    mapState
	} from 'vuex'
	
	import {
		loginKey,
		$get
	} from '../../http.js'
	
	import {
		adminUrl
	} from '../../base_variable.js'
	
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onLoad() {
			if (this.hasLogin) {
				return
			}
			console.log('进入')
			let lk = uni.getStorageSync(loginKey)
			console.log('lk:' + lk)
			if (lk !== null) {
				let time = lk.availableTime
				if ((new Date()).getTime() < lk.availableTime) {
					return
				}
				let params = {
					url: adminUrl + '/reflush.do',
					data: {
						accountName: lk.name,
						token: lk.token
					}
				}
				$get(params).then(res => {
					uni.setStorage({
						key: loginKey,
						data: {
							name: res.name,
							token: res.token,
							availableTime: res.availableDate
						},
						success: () => {
							console.log('刷新:[name]' + res.name  + ',[token]' + res.token + ',[失效时间]' + new Date( res.availableDate))
						}
					})
				})
				return
			}
			uni.showModal({
				title: '未登录',
				content: '您未登录，需要登录后才能继续',
				/**
				 * 如果需要强制登录，不显示取消按钮
				 */
				showCancel: !this.forcedLogin,
				success: (res) => {
					if (res.confirm) {
						/**
						 * 如果需要强制登录，使用reLaunch方式
						 */
						if (this.forcedLogin) {
							uni.reLaunch({
								url: 'login/login'
							});
						} else {
							uni.navigateTo({
								url: 'login/login'
							});
						}
					}
				}
			});
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
