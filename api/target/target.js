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
	},
	/**
	 * 
	 * @param {Object} params
	 * @param {Object} config
	 */
	getTargetList(params, config) {
		let p = {
			url: targetUrl + '/list.re',
			data: params,
			config: config
		}
		return $get(p)
	}
}