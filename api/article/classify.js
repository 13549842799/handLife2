import {
	classifyUrl
} from './../../base_variable.js'

import {
	$get,
	$post,
	$delete,
	$postLoading
} from './../../http.js'

export default {
	/**
	 * 获取对应类型的分类列表
	 * @param {Object} params
	 */
	getClassifies (params) {
		let p = {
			url: classifyUrl + '/list.re',
			data: params
		}
		return $get(p)
	},
	/**
	 * 添加分类
	 * @param {Object} params
	 */
	addClassify(params) {
		let p = {
			url: classifyUrl + '/add.do',
			data: params
		}
		//return $post(p)
		return $postLoading(p)
	}
}