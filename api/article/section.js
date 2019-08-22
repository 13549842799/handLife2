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
	getSection(id) {
		return $getLoading({url: sectionUrl + '/s/' + id + '/read.re'})
	},
	/**
	 * @param {Object} id
	 */
	deleteSection(id) {
		return $deleteLoading({url: sectionUrl + '/s/' + id + '/delete.do'})
	}
}