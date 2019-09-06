<template>
	<view class="view-container read-page">
		<view class="status_bar">{{section.title}}</view>
		<textarea class="content-style" v-model="text" :disabled="true" :maxlength="-1" ></textarea>
	</view>
</template>

<script>
	import sectionApi from '../../../api/article/section.js'
	
	export default {
		data () {
			return {
				section: {
					title: '标题'
				},
				text: '',
				page: 1,
				content: [],
				fontSize: 37
			}
		},
		onLoad (option) {
			let a = 'abc'
			console.log(a.substring(0,3))
			let v = this
			sectionApi.getSection(option.id).then(res => {
				v.section = res
	            v.getPages()
				
			}).catch(err => { console.log(err) })
		},
		computed: {
			lineWordsNum () {
				return Math.trunc(710/this.fontSize)
			}
		},
		methods: {
			/**
			 * console.log(this.section.content.replace(/\n/g,"<br/>"))
			 * 因为字符串中隐含了换行符 \n，有多少个换行符就代表了有多少行
			 * @param {Object} contentStr 内容字符串
			 */
			getPages () {
				let v = this
				let arr = this.section.content.split(/\n/g), lineNum = 0, tempText = ''
				for (let i = 0; i < arr.length; i++) {
					let num =  Math.ceil(arr[i].length / v.lineWordsNum)
					num = num === 0 ? 1 : num
					if (lineNum + num <= 18) {
						lineNum += num
						tempText += arr[i] + '\n'
					} else {
						let disWords = (18 - lineNum) * v.lineWordsNum
						tempText += arr[i].substring(0, disWords)
						v.content.push(tempText)
						tempText = ''
						lineNum = 0
						arr[i] = arr[i].substring(disWords)
						i = i -1
					}
				}
				console.log(v.content)
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	.read-page {
		background-color: #FFFFFF;
	}
	.status_bar {
		height: var(--status-bar-height);  
		width: 100%;  
		position: fixed;  
		background-color: #F8F8F8;  
		top: 0;  
		z-index: 999;  
	}
	
	.content-style {
		margin-top: var(--status-bar-height);
		width: 710upx;
		height: 1150upx;
		padding: 20upx;
		font-size: 37upx;
		font-weight: 100;
		line-height: 60upx;
		font-family: STKaiti;
	}
</style>
