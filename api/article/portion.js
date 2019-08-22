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
	getPortionsList({novel, portion}) {
		let p = {
			url: portionUrl + '/s/' + novel + '/list.re',
			data: portion ? {portion} : null
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