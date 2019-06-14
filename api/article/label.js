import {
	labelUrl
} from './../../base_variable.js'
	
import {
	$get,
	$post,
	$delete,
	$postLoading
} from './../../http.js'

export default {
	/**
	 * 获取用户自身的标签列表
	 * @param {Object} params
	 */
	getLabelsList (params) {
		let p = {
			url: labelUrl + '/list.re',
			data: params
		}
		return $get(p)
	},
	/**
	 * 添加标签
	 * @param {Object} params
	 */
	addLabel (params) {
		let p = {
			url: labelUrl + '/add.do',
			data: params
		}
		return $postLoading(p)
	}
}