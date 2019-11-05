
export default {
	/**
	 * 复制一个新的对象
	 * @param {Object} o
	 */
	newObj (o) {
		let v = {}
		for (let key in o) {
			v[key] = o[key]
		}
		return v
	},
	
	/**
	 * 把目标对象在过滤掉某些属性和值后复制出一个新的对象
	 * @param {Object} o
	 * @param {Object} keyArr
	 * @param {Object} valArr
	 */
	newfilterObject (o, keyArr, valArr) {
		let v = {}
		for (let key in o) {
			if (keyArr.indexOf(key) === -1 && valArr.indexOf(o[key]) === -1) {
				v[key] = o[key]
			}
		}
		return v
	},
	/**
	 * 复制对象的属性
	 * @param {Object} target
	 * @param {Object} origin
	 * @param {Array} filter 过滤规则，属性的key数组
	 */
	copyProperty(target, origin, filter) {
		if (!target || !origin) {
			return
		}
		console.log(filter)
		for (let key in origin) {
			if (filter.indexOf(key) === -1) {
				target[key] = origin[key]
			}
		}
	},
	/**
	 * 判断对象是否非空
	 * @param {Object} obj
	 */
	notNull(obj) {
		return obj !== null && obj !== undefined
	},
	defaultVal(obj, val) {
		return this.notNull(obj) ? obj : (val !== undefined ? val : null)
	},
	isDate(obj) {
		return obj instanceof Date
	},
	isStr(obj) {
		return typeof obj === 'string'
	},
	returnDate(str, date) {
		if (date && this.isDate(date)) {
			str = str.split('-')			
			date.setFullYear(parseInt(str[0]), parseInt(str[1]) -1, parseInt(str[2]))
			return date
		}
		return new Date(str)
	}
}
