import {
	labelUrl
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
	 * 获取用户自身的标签列表
	 * @param {Object} params
	 */
	getLabelsList (params, notLoad) {
		let p = {
			url: labelUrl + '/list.re',
			data: params
		}
		if (notLoad) {
			return $get(p)
		}
		return $getLoading(p)
	},
	/**
	 * 添加标签
	 * @param {Object} params
	 */
	addLabel (params) {
		let p = {
			url: labelUrl + '/add.do',
			data: params
		}
		return $postLoading(p)
	},
	editLabel (id, name) {
		let p = {
			url: labelUrl + '/update_app.do',
			data: {
				id: id,
				name: name
			}
		}
		return $postLoading(p)
	},
	delteLabel (id) {
		return $deleteLoading({url: labelUrl + '/s/' + id + '/delete.do'})
	}
}