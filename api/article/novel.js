import {
	novelUrl
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
	 * 查询小说列表
	 * @param {Object} params
	 */
	getNovelList(params) {
		let p = {
			url: novelUrl + '/list.re',
			data: params
		}
		return $getLoading(p)
	},
	getNovel(id, config) {
		return $getLoading({url: novelUrl + '/s/' + id + '/novel.re', config: config})
	},
	/**
	 * 删除小说
	 * @param {Object} id
	 */
	deleteNovel(id) {
		return $post({url: novelUrl + '/s/' + id + '/delete.do'})
	},
	saveNovel ({fileName, filePath, data}) {
		data.fileName = fileName
		return $upload({'url': novelUrl + '/save.do', fileName, filePath, data})
	}
}