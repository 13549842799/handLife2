import {
	sectionUrl
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
	 * @param {Object} id
	 */
	getSection(id, novelId) {
		
		return $getLoading({url: sectionUrl + '/s/' + id + '/read.re', data: novelId ? {'novelId': novelId} : {}})
	},
	getSectionList(params) {
		return $getLoading({url: sectionUrl + '/list.re', data: params})
	},
	/**
	 * @param {Object} id
	 */
	deleteSection(id) {
		return $deleteLoading({url: sectionUrl + '/s/' + id + '/delete.do'})
	},
	saveSection(section) {
		return $postLoading({
			url: sectionUrl + '/addOrUpdate.do',
			data: section
		})
	}
}