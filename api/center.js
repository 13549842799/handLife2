import {
	adminUrl,
	employeeUrl
} from './../base_variable.js'

import {
	$get,
	$post,
	$upload
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
	 * 修改头像
	 * @param {Object} fileName 文件的name属性
	 * @param {Object} filePath 文件的本地路基
	 * @param {Object} data  本次请求的额外参数
	 */
	avatarAlter (fileName, filePath, data) {
		return $upload({
			url: adminUrl + '/alterAvatar.do',
			fileName: fileName,
			filePath: filePath,
			data: data
		})
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