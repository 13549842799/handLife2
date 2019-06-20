import {
	classifyUrl
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
	 * 获取对应类型的分类列表
	 * @param {Object} params
	 */
	getClassifies (params) {
		let p = {
			url: classifyUrl + '/list.re',
			data: params
		}
		return $getLoading(p)
	},
	/**
	 * 添加分类
	 * @param {Object} params
	 */
	addClassify(params) {
		let p = {
			url: classifyUrl + '/add.do',
			data: params
		}
		//return $post(p)
		return $postLoading(p)
	},
	/**
	 * 编辑分类名
	 * @param {Object} id 
	 * @param {Object} childType
	 * @param {Object} name
	 */
	editClassify (id, childType, name) {
		let p = {
			url: classifyUrl + '/edit.do',
			data: {
				id: id,
				name: name,
				childType: childType,
				type: 2
			}
		}
		return $postLoading(p)
	},
	/**
	 * 根据id删除分类
	 * @param {Object} id
	 */
	deleteClassify(id) {
		return $deleteLoading({url: classifyUrl + '/s/' + id + '/delete.do'})
	}
}