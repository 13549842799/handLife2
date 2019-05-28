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
            reject(res)
            break
          case 400:
            reject(res)
			uni.reLaunch({
			    url: '/pages/index/login/login.vue'
			});
        }
      }
    })
	console.log(JSON.stringify(obj))
    uni.request(obj)
  })
}


