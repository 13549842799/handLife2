import {uploadUrl} from './../base_variable.js'

import {
	$upload
} from './../http.js'

export default {
	uploadFile ({data, name, path}) {
		let p = {
			'url': uploadUrl + '/upload.do',
			'fileName': name,
			'filePath': path,
			'data': data
		}
		return $upload(p)
	}
}