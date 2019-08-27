<template>
	<view>
		<text>欢迎进入</text>
	</view>
</template>

<script>
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	
	import loginApi from '../../api/login.js'
	
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		computed: mapState(['forcedLogin', 'hasLogin', 'nikeName']),
		onLoad() {
			//#ifdef APP-PLUS
			console.log('当前版本',plus.runtime.version)
			//#endif
			const res = uni.getSystemInfoSync()
			let lk = loginApi.getLoginMessage() //同步获取缓存返回值是字符串
			if (lk) {
				this.login(lk);
				console.log('存在缓存记录')
				let time = lk.availableDate
				console.log('超时时间：', time)
				if ((new Date()).getTime() < time) {
					return
				}
				console.log('刷新超时时间')
				loginApi.reflushToken({accountName: lk.name, token: lk.token})
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
						let url = 'login/login'
						/**
						 * 如果需要强制登录，使用reLaunch方式
						 */
						if (this.forcedLogin) {
							uni.reLaunch({ url });
						} else {
							uni.navigateTo({ url });
						}
					}
				}
			});
		},
		methods: {
            ...mapMutations(['login']), //...es6新特性 拓展运算符  把对象的可遍历属性拷贝到另一个对象中
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
