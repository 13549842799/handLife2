import {
	targetPlanUrl
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
	 * 获取列表
	 * @param {Object} params
	 * @param {Object} config
	 */
	getTargetPlans(params, config) {
		return $get({url: targetPlanUrl + '/list.re', data: params, config})
	},
	/**
	 * 保存计划
	 * @param {Object} params
	 */
	savePlan(params) {
		return $postLoading({url: targetPlanUrl + '/save.do', data: params})
	}
}