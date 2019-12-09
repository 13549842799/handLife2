import {
	targetPlanUrl
} from './../../base_variable.js'
	
import {
	$get,
	$post,
	$delete,
	$getLoading,
	$postLoading,
	$deleteLoading
} from './../../http.js'

export default {
	/**
	 * 获取指定的计划
	 * @param {Object} id
	 */
	getPlan(id) {
		return $getLoading({url: targetPlanUrl + '/s/' + id + '/read.re'})
	},
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
	},
	deletePlan(id, reason) {
		return $postLoading({url: targetPlanUrl + '/s/' + id + '/delete.do', data: {'deleteReason': reason}})
	}
}