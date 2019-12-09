import {
	targetPlanUrl,
	
} from './../../base_variable.js'
	
import {
	$get,
	$post,
	$delete,
	$getLoading,
	$postLoading,
	$deleteLoading
} from './../../http.js'

/**
 * 
 * 表单字段: planName;content; executionTime;Time endTime;Integer period; Byte unit;Date startDate;Integer targetId;String deleteReason;
 */

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
	 * 获取计划倒计时列表
	 * @param {Object} params
	 * @param {Object} config
	 */
	getWillTargetPlans(params, config) {
		return $get({url: targetPlanUrl + '/wlist.re', data: params, config})
	},
	/**
	 * 计划执行当日未完成列表
	 * @param {Object} params
	 * @param {Object} config
	 */
	getUnComplete(params, config) {
		return $get({url: targetPlanUrl + '/un-complete.re', data: params, config})
	},
	/**
	 * 保存计划
	 * @param {Object} params
	 */
	savePlan(params) {
		return $postLoading({url: targetPlanUrl + '/save.do', data: params})
	},
	/**
	 * 修改计划
	 * @param {Object} params
	 */
	updatePlan(params) {
		return $postLoading({url: targetPlanUrl + '/update.do', data: params})
	},
	/**
	 * 校验计划提交的参数
	 * @param {Object} param 表单参数
	 */
	validPlan(param) {
		return $get({url: targetPlanUrl + '/valid.do', data: params, config})
	},
	/**
	 * 删除计划
	 * @param {Object} id
	 * @param {Object} params
	 */
	deletePlan(id, params) {
		return $getLoading({url: targetPlanUrl + '/s/' + id + '/del.do', data: {'reason': params.reason}})
	},
	alterActionState() {
		
	}
}