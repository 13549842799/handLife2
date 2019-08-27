import {
	portionUrl
} from './../../base_variable.js'

import {
	$get,
	$post,
	$getLoading,
	$deleteLoading,
	$postLoading,
	$upload
} from './../../http.js'

export default {
	
	/**
	 * 获取对应小说的分卷列表
	 * @param {Number} novel
	 */
	getPortionsList({novel, portion, expand}) {
		let data = {}
		if (portion) {
			data.portion = portion
		}
		if (expand) {
			data.expand = expand
		}
		let p = {
			url: portionUrl + '/s/' + novel + '/list.re',
			data
		}
		return $getLoading(p)
	},
	addPortion (portion) {
		let p = {
			url: portionUrl + '/add.do',
			data: portion
		}
		return $postLoading(p)
	}
}