export default {
	/**
	 * 获取图片的大小(单位:字节)和长宽(单位:px)
	 * 返回值格式： [{width: xx, height: xx}, size]
	 * @param {Object} path 图片文件的路径
	 */
	imageInfo (path) {
		let p1 = new Promise((resolve, reject) => {
			uni.getImageInfo({
				src: path,
				success: function (res) { resolve({width: res.width, height: res.height}) },
				fail: function (err) { reject(err) }
		    })
		})
		/* let p2 = new Promise((resolve, reject) => {
			uni.getFileInfo({
			    filePath: path, 
			    success: function (res) { resolve(res.size) },
				faul: function (err) { reject(err) }
			})
		}) */
		//return Promise.all([p1, p2])
		return p1
	}
}