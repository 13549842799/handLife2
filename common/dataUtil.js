export default {
	/**
	 * 把字符串的中间部分用*替换
	 * @param {Object} data
	 * @param {Object} prefix  前端保留原样的长度
	 * @param {Object} suffix  后端保留原样的长度
	 */
	encryption (data, prefix, suffix) {
		if (!data) {
			return ""
		}
		let len = data.length
		if (len < (prefix + suffix)) {
			return data
		}
		let result = data.substr(0,prefix)
		while (result.length < len - suffix) {
			result += "*"
		} 
		return result + data.substr(len-suffix, suffix) // 因为这里起始从0开始，所以是3
	}
}