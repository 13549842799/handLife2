export const loginKey = 'loginState'

/**
 * 头信息
 */
var headers = null  

export class HttpObj {
  constructor (p) {
    this.url = p.url
	if (p.data) {
	  this.data = p.data	
	}
    this.method = p.type
    this.dataType = p.dataType
	if (!headers) {
	  let obj = uni.getStorageSync(loginKey);
	  headers = {
		'X-user': obj.name,
        'X-token': obj.token
	  }
	}
	this.header = headers
    if (this.data !== null && (this.type === 'POST' || this.type === 'PATCH')) {
      console.log('contextType:', this.params)
      this.contentType = 'application/json;charse=UTF-8'
    }
    this.success = p.success
    if (p.fail) {
      this.fail = p.fail
    } else {
      this.fail = (res) => { console.log(res) }
    }
    if (p.complete) {
      this.complete = p.complete
    }
  }
}

export function initHeaders () {
	headers = null
}

export const userToken = () => {
	return {'user': headers.X-user, 'token': headers.X-token}
}

/**
 * 发送post请求
 * @param {Object} obj
 */
export const $get = function (obj) {
	return $AjaxPromise(obj.url, obj.data, 'GET', 'json', obj.config)
}

/**
 * 发送post请求
 * @param {String} url
 * @param {Object} params
 * @param {Object} config
 */
export const $post = function (obj) {
	return $AjaxPromise(obj.url, obj.data, 'POST', 'json', obj.config)
}

export const $delete = function (obj) {
	return $AjaxPromise(obj.url, obj.data, 'DELETE', 'json', obj.config)
}

/**
 * 带有加载图标的post请求
 * @param {Object} obj
 */
export const $postLoading = function (obj) {
	obj.type = 'POST'
	return $Loading(obj)
}

export const $getLoading = function (obj) {
	obj.type = 'GET'
	return $Loading(obj)
}

export const $deleteLoading = function (obj) {
	obj.type = 'DELETE'
	return $Loading(obj)
}

/**
 * 开启了加载图标的直接发送请求方法
 * 在发送请求前会在页面中出现加载中的图标，然后在请求结束后消失
 * @param {Object} obj
 */
export const $Loading = function (obj) {
	uni.showLoading({
    title: '加载中'
})
	if (!obj.config) {
		obj.config = {}
	}
	let c = obj.config.complete
	let t = () => {
		if (c) {
			c()
		}
		uni.hideLoading()
	}
	obj.config.complete = t
	return $AjaxPromise(obj.url, obj.data, obj.type, 'json', obj.config)
}

export const $AjaxPromise = function (url, params, type, dataType, config) {
  config = config !== null && config !== undefined ? config : {}
  return new Promise(function (resolve, reject) {
    let obj = new HttpObj({
      url: url,
      data: params,
      type: type,
      dataType: dataType,
      complete: config.complete ? config.complete : () => {},
      fail: config.fail,
      success: (res) => {
        switch (res.data.status) {
          case 200:
            resolve(res.data.data)
            break
          case 100:
          case 300:
            reject(res.data)
            break
          case 400:
            reject(res.data)
			uni.reLaunch({
			    url: '/pages/index/login/login'
			});
        }
      }
    })
    uni.request(obj)
  })
}

/**
 * @param {String} url 上传的请求地址
 * @param {String} fileName 上传的文件的name属性
 * @param {String} filePath 上传的文件在本地的临时路径
 * @param {Object} data 格外的参数  
 */
export const $upload = function ({url, fileName, filePath, data}) {
	if (!headers) {
	  let obj = uni.getStorageSync(loginKey)
	  headers = {
		'X-user': obj.name,
	    'X-token': obj.token
	  }
	}
	return new Promise(function (resolve, reject) {
		uni.uploadFile({
            url: url, 
            filePath: filePath,
            name: fileName,
            formData: data,
			header: headers,
            success: (uploadFileRes) => {
				console.log(uploadFileRes)
				let status = uploadFileRes.statusCode
				switch (status) {
					case 200:
					    let data = JSON.parse(uploadFileRes.data)
					    let code = parseInt(data.status)
						console.log(code)
					    switch (code) {
					      case 200:
					        resolve(data.data)
					        break
					      case 100:
					      case 300:
					        reject({
								status: 100,
								message: data.message
							})
					        break
					      case 400:
					        reject(data)
					    	uni.reLaunch({
					    	    url: '/pages/index/login/login'
					    	});
					    }
						break
					default:
					    reject({
							code: 200,
							message: uploadFileRes.errMsg
						})
				}
            }
        });
	})
}

export const $setStorage = function (key, data) {
	return new Promise(function (resolve, reject) {
		uni.setStorage({
		    'key': key,
		    'data': data,
		    success: function () {
		        resolve()
		    },
			fail: function (err) {
				reject(err)
			}
		});
	})
}

export const $getStorage = function (key) {
	return new Promise(function (resolve, reject) {
		uni.getStorage({key: key, 
			success: (res) => {
				resolve(res.data)
			},
			fail: (err) => {
				if (err.errMsg === 'getStorage:fail data not found') {
					resolve(null)
				} else {
					reject(err)
				}
			}
		});
	})
}
