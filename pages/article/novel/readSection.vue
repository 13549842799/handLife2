<template>
	<view class="view-container read-page">
		<view class="status_bar">
			<text>{{section.title}}</text>
	    </view>
		<swiper class="section-page-style" :current="page" @change="pageChange">
			<swiper-item v-for="(p, index) in content" :key="index">
				<textarea :value="p" class="content-style"  :disabled="true" :maxlength="-1" ></textarea>
			</swiper-item>
		</swiper>
		<view class="read-bottom-menu">
			<view>
				<view>
					<text>{{page + 1}}/{{content.length}}</text>
				</view>
				<view></view>
			</view>
		</view>
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
				page: 0,
				content: [],
				fontSize: 37,
				lineSize: 19
			}
		},
		onLoad (option) {
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
					if (lineNum + num <= v.lineSize) {
						lineNum += num
						tempText += arr[i] + '\n'
						continue
					}
					let distanceWords = (v.lineSize - lineNum) * v.lineWordsNum
					tempText += arr[i].substring(0, distanceWords)
					v.content.push(tempText)
					tempText = ''
					lineNum = 0
					arr[i] = arr[i].substring(distanceWords)
					i = i -1
				}
			},
			pageChange (e) {
				let v = this
				v.page = e.detail.current
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
		background-color: #FFFFFF;  
		top: 0;  
		z-index: 999; 
	}
	
	.status_bar text{
		font-size: 30upx;
		color: #E0E0E0;
		padding: 10upx 20upx;
	}
	
	.section-page-style {
		width: 750upx;
		height: 1190upx;
		margin-top: 60upx;
		background-color: #FFFFFF;
	}
	
	.content-style {
		width: 710upx;
		height: 1150upx;
		padding: 20upx;
		font-size: 37upx;
		font-weight: 100;
		line-height: 60upx;
		font-family: PMingLiU;
	}
	
	.read-bottom-menu {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
	
	.read-bottom-menu view {
		width: 710upx;
		padding: 10upx 10upx;
		justify-content: space-between;
		flex-direction: row;
	}
	
	.read-bottom-menu view view {
		
	}
	
	.read-bottom-menu view view text {
		color: #DDDDDD;
		font-size: 25upx;
	}
</style>
