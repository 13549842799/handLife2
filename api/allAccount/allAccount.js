import {
	allAccountUrl
} from './../../base_variable.js'
	
import {
	$get,
	$post,
	$delete,
	$getLoading,
	$postLoading
} from './../../http.js'

export default {
	getList(params) {
		let p = {
			'url': allAccountUrl + '/list.re',
			'data': params
		}
		return $getLoading(p)
	},
	getAccount(id) {
		return $getLoading({'url': allAccountUrl + '/s/' + id + '/read.re'})
	},
	saveAccount(params) {
		return $postLoading({'url': allAccountUrl + '/add.do', data: params})
	},
	deleteAccount (id) {
		return $delete({url: allAccountUrl + '/s/' + id + '/delete.do'})
	},
	checkKey() {
		return $get({url: allAccountUrl + '/checkKey.re'})
	}
}