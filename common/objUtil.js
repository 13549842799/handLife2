
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
	}
}
