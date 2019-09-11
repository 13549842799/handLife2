<template>
	<view class="view-container read-page">
		<view v-show="!barShow" class="status_bar">
			<text>{{section.title}}</text>
	    </view>
		<view v-show="barShow" class="status_bar-show">
			<view style="height: var(--status-bar-height);width: 100%;"></view>
			<view class="status_bar-show-content">
				<image src="../../../static/icon/goBack.png" @tap="goBack"></image>
			</view>
		</view>
		<swiper class="section-page-style" :current="page" @change="pageChange" @animationfinish="tapEnd" @tap="clickTap">
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
	import uniBar from '../../../components/uni-nav-bar/uni-nav-bar.vue'
	
	import sectionApi from '../../../api/article/section.js'
	
	import {$setStorage, $getStorage} from '../../../http.js'
	
	var showBar = false //判断是否执行点击
	
	export default {
		components: {
			uniBar
		},
		data () {
			return {
				section: {
					title: '标题'
				},
				text: '',
				page: 0,
				canTap: false,
				content: [],
				fontSize: 37,
				lineSize: 19,
		        barShow: false
			}
		},
		onLoad (option) {
			let v = this
			sectionApi.getSection(option.id).then(res => {
				v.section = res
	            v.getPages()
				let page = option.page
				v.page = page !== null && page !== undefined && page <= v.content.length ? (page === -1 ? v.content.length - 1 : page) : 0
				v.cacheRate()
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
						if (i === arr.length - 1) {
							v.content.push(tempText)
						}
						//console.log(lineNum)
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
				v.canTap = true
	            v.cacheRate()
			},
			cacheRate () {
				$setStorage('novel_' + this.section.novelId, {id: this.section.id, page: this.page}).then(() => { }).catch(err => {console.log(err)})
			},
			/**
			 * 因为 @animationfinish 事件哪怕是点击也会触发，
			 * 为了防止在第一页或者最后一页中点击页面弹出导航栏的时候同时触发页面切换判断，
			 * 增加showBar进行判断，因为click事件比animationfinish更早的触发，当触发了click就不触发tapEnd
			 */
			clickTap () {
				console.log('tap')
				showBar = true
				this.barShow = !this.barShow
			},
			tapEnd (e) {
					
				let v = this
				
				if (showBar) {
					showBar = false
					return
				}
				v.barShow = false
				console.log(e)
                if (v.canTap) {
					v.canTap = false
					return
				}
				if (v.page === v.content.length - 1) {
					if (v.section.nextSection === null || v.section.nextSection === undefined) {
						//#ifdef APP-PLUS
						plus.nativeUI.toast("已经是最后一章了");
						//#endif
						//#ifdef H5
						uni.showToast({title: '已经是最后一章了', icon: "none"})
						//#endif
					} else {
						uni.redirectTo({ url: 'readSection?id=' + v.section.nextSection })
					}
					return
				}
				if (v.section.lastSection === null || v.section.lastSection === undefined) {
					//#ifdef APP-PLUS
					plus.nativeUI.toast("已经是第一页了");
					//#endif
					//#ifdef H5
					uni.showToast({title: '已经是第一页了', icon: "none"})
					//#endif
				} else {
					uni.redirectTo({ url: 'readSection?id=' + v.section.lastSection + '&page=' + -1 })
				}
			},
			goBack () {
				uni.navigateBack({delta: 1})
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
	
	.status_bar, .status_bar-show {
		top: 0;
		z-index: 999;
		width: 100%;
		position: fixed;
	}
	
	.status_bar {
		height: var(--status-bar-height);    
		background-color: #FFFFFF;  
	}
	
	.status_bar text{
		font-size: 30upx;
		color: #E0E0E0;
		padding: 10upx 20upx;
	}
	
	.status_bar-show {
		background-color: #333333;
		height: 120upx;
		flex-direction: column;
	}
	
	.status_bar-show-content {
		width: 100%;
		height: 50upx;
		flex-direction: row;
	}
	
	.status_bar-show-content image {
		width: 30upx;
		height: 30upx;
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
