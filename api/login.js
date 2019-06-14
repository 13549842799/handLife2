import {
	adminUrl
} from './../base_variable.js'
	
import {
	$get,
	$post,
	loginKey,
	baseUrl,
	initHeaders
} from './../http.js'

export default {
	/**
	 * @param {Object} params <accountName,password,code>
	 */
	userLogin (params) {
		/**
		 * 下面简单模拟下服务端的处理
		 * 检测用户账号密码是否在已注册的用户列表中
		 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
		 */
		let requestParams = {
			url: adminUrl + '/loginAsyn.do',
			data: params
		}
		return $post(requestParams)
	},
	/**
	 * 刷新token
	 * @param {Object} data <accountName, token>
	 */
	reflushToken (data) {
		let params = {
			url: adminUrl + '/reflush.do',
			data
		}
		let v = this
		$get(params).then(res => {
			console.log('保存:', res)
			v.saveLoginMessage(res)
		}).catch(err => {
			console.log('重定向登录:' + err)
			uni.reLaunch({
				url: 'pages/index/login/login'
			});
		})
	},
	/**
	 * 缓存信息保存函数
	 * @param {Object} sessionInfo 缓存信息
	 * @param {Object} succ 成功的回调函数
	 */
	saveLoginMessage (sessionInfo, succ) {
		uni.setStorageSync(loginKey, sessionInfo)
		initHeaders()
		console.log('成功:[name]' + sessionInfo.name  + ',[token]' + sessionInfo.token + ',[失效时间]' + new Date( sessionInfo.availableDate) + ',nikename:' + sessionInfo.nikename)
		if (succ) {
			succ()
		}
	},
	
	/**
	 * 获取缓存的登录信息
	 */
	getLoginMessage () {
		return uni.getStorageSync(loginKey)
	}
}