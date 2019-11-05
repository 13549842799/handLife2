import {
	targetUrl
} from './../../base_variable.js'
	
import {
	$get,
	$post,
	$delete,
	$getLoading,
	$postLoading
} from './../../http.js'

export default {
	/**
	 * 保存目标
	 * @param {Object} params
	 */
	saveTarget(params) {
		return $postLoading({url: targetUrl + '/save.do', data: params})
	}
}