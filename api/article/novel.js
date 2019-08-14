import {
	novelUrl
} from './../../base_variable.js'

import {
	$get,
	$post,
	$getLoading,
	$deleteLoading,
	$postLoading
} from './../../http.js'

export default {
	/**
	 * 查询小说列表
	 * @param {Object} params
	 */
	getNovelList(params) {
		let p = {
			url: novelUrl + '/list.re',
			data: params
		}
		return $getLoading(p)
	}
}