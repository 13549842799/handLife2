import {
	adminUrl,
	employeeUrl
} from './../base_variable.js'

import {
	$get,
	$post
} from './../http.js'

export default {
	
	/**
	 * 获取当前用户的账号信息
	 * @param {Object} accountName
	 */
	adminInfo (accountName) {
		let params = {
			url: adminUrl + '/admin_main.re',
			data: {
				accountname: accountName
			}
		}
		return $get(params)
	},
	/**
	 * 获取职员相关信息
	 * @param {int} type = 0 | 1
	 */
	employeeInfo (type) {
		let p = {url: employeeUrl + '/info.re'}
		if (type) {
			p.data = {type}
		}
		return $get(p)
	},
	/**
	 * 修改当前用户的昵称
	 * @param {Object} nikeName
	 */
	editNikeName (nikeName) {
		return $post({url: adminUrl + '/alterNikeName.do', data: {nikename: nikeName}})
	}
	
}