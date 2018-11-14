/**
 * 校验自定义规则表达式的合法性
 * @param {string} condition 表达式内容，如 1|2||3
 * @param {array} idxs 可以含有的数字
 * @return {Boolean} 表达式是否合法
 */

//匹配形似 1或者(1)前有 (!符号的
const prevReg = /^[\!\(\s]*\d+$/
//匹配形似 1或者(1)后有 (!符号的
const nextReg = /^[\!\s]*\d+[\s\)]*$/

function validateExpression(condition='', idxs=[]) {
	//形如(1&2)|(3|4) 或(1&2|)3 或(1&2或  1&2） 
	let ret = true
	let formatter = /^[\!\(\)\|\s&0-9]+$/

	if (!formatter.test(condition)) {
		return false
	}

	// 空括号
	if(/\(\)/.test(condition)){
		return false;
	}
	
	// 错误情况，括号不配对
	let stack = []
	for (let i = 0; i < condition.length; i++) {
		let item = condition.charAt(i)

		if('(' === item) {
			stack.push('(')
		} else if(')' === item) {
			if (stack.length > 0) {
				stack.pop()
			} else {
				return false
			}
		}
	}
	
	if (stack.length) {
		return false
	}

	//先用|&符号分割
	let eles = condition.split(/\s*(&&|&|\|\||\|)\s*/)

	eles.map((i, index) => {
		let item = removeBrackets(i)

		if (/\d+/.test(item)) {
			if (!isValidateNumElement(item, idxs)) {
				ret = false
			}
		} else {
			let prevItem = removeBrackets(eles[index - 1])
			let nextItem = removeBrackets(eles[index + 1])
			if (!isValidateNumElement(prevItem, idxs) || !isValidateNumElement(nextItem, idxs)) {
				ret = false
			}
		}

		if (index === 0) {
			if (!prevReg.test(item)) {
				ret = false
			}
		}

		if (index === eles.length - 1) {
			if (!nextReg.test(item)) {
				ret = false
			}
		}
	})

	return ret
}

function isValidateNumElement(ele, idxs) {
	let ret = true

	if (prevReg.test(ele) || nextReg.test(ele)) {
		let num = ele.match(/\d+/)[0]
		let index = idxs.findIndex(r => r == num)
		if (idxs.length && index < 0) {
			ret = false
		}
	} else {
		ret = false
	}

	return ret
}

//去除对称的()
function removeBrackets(str='') {
	let eles = str.split('')
	let copyEles = [...eles]

	eles.map((item, index) => {
		if (item === '(') {
			let rightLastIndex = eles.lastIndexOf(')')

			if (rightLastIndex > -1) {
				copyEles[rightLastIndex] = ''
				copyEles[index] = ''
			}
		}

		if (item === ')') {
			let leftLastIndex = eles.lastIndexOf('(')

			if (leftLastIndex > -1) {
				copyEles[leftLastIndex] = ''
				copyEles[index] = ''
			}
		}
	})

	return copyEles.join('')
}

module.exports = {
	validateExpression
}