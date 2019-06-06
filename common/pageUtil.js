import objUtil from './objUtil.js'

/**
 * 分页工具，包含了分页需要的一系列变量
 */
export class MyPage {
	constructor ({size, searchFunction}) {
		this.pages = 1 // 总页数
		this.pageNum = 1 //当前页
		if (size) {
		  this.pageSize = size  //页面容量
		} else {
		  this.pageSize = 15
		}
		this.total = 1 // 总条数
		this.list = []
		this.params = {}
		this.requestUrl = null
		this.filter = {
		  value: [null],
		  key: []
		}
		this.search = searchFunction
		this.requestLine({})
    }
	requestLine = requestLine
	deleteLine = deleteLine
}

/**
 * 发送请求
 */
function requestLine ({filter, params, pageNum = 1, config}) {
		let f = createFilter(this.filter, filter)
		this.pageNum = pageNum
		let newParams = this.params
		newParams.pageNum = this.pageNum
		newParams.pageSize = this.pageSize
		if (params) {
			newParams = params
		}
		newParams = objUtil.newfilterObject(newParams, f.key, f.value)
		this.search(newParams).then(res => {
			this.list = this.list.concat(res.list)
			this.total = res.total
			this.pages = res.pages
		}).catch(err => {
			console.log('page:' + err.message)
		})
}

/**
 * 把新的过滤规则和旧的过滤规则合并，返回最新的过滤规则对象
 * @param {Object} oldFilter
 * @param {Object} newFilter
 */
function createFilter (oldFilter, newFilter) {
	if (!newFilter) {
		return oldFilter
	}
	
	if (!oldFilter) {
		return newFilter
	}
	
	if (newFilter.key) {
	    newFilter.key = newFilter.key.concat(oldFilter.key)
	} else {
		newFilter.key = oldFilter.key
	}
	if (newFilter.value) {
	    newFilter.value = newFilter.value.concat(oldFilter.value)
	} else {
		newFilter.value = oldFilter.value
	}
	return newFilter
}

/**
 * 查找当前pages列表中对象的属性key的值为val的元素，然后移除它
 * @param {Object} key 对象的标记 key
 * @param {Object} val  对应的值
 */
function deleteLine (key, val) {
	let index = this.list.findIndex(obj => {
		return obj[key] === val
	})
	this.list.splice(index, 1)
}