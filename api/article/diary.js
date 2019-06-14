import {
	diaryUrl
} from './../../base_variable.js'
	
import {
	$get,
	$post,
	$delete,
	$postLoading
} from './../../http.js'

export default {
	/**
	 * 获取目标日记
	 * @param {Object} id
	 */
	getDiary (id, config) {
		return $get({url: diaryUrl + '/s/' + id + '/diary.re', config: config})
	},
	/**
	 * 获取分页的带查询的日记列表
	 * @param {Object} params
	 */
	getDiaryList (params) {
		let p = {
			url: diaryUrl + '/list.re',
			data: params
		}
		return $get(p)
	},
	/**
	 * 用户删除自身目标id值的日记
	 * @param {Object} id
	 */
	deleteOwnerDiary (id) {
		return $delete({url: diaryUrl + '/s/' + id + '/delete.do'})
	},
	/**
	 * 保存日记
	 * @param {Object} params
	 */
	saveDiary(params) {
		return $postLoading({url: diaryUrl + '/addOrUpdate.do', data: params})
	}
}