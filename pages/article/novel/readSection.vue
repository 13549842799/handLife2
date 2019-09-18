<template>
	<view class="view-container read-page">
		<view v-show="!barShow" class="status_bar">
			<text>{{section.title}}</text>
	    </view>
		<view v-show="barShow" class="status_bar-show">
			<view class="status_bar-show-bar"></view>
			<view class="status_bar-show-content">
				<image src="../../../static/icon/goBack.png" @tap="goBack"></image>
				<text @tap="goToMenu">目录</text>
			</view>
		</view>
		<swiper class="section-page-style" :current="page" @change="pageChange" @animationfinish="tapEnd" @tap="clickTap">
			<swiper-item v-for="(p, index) in content" :key="index">
				<text v-show="index === 0" class="article-section-title">{{section.title}}</text>
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
	
	var pageChanging = false
	
	export default {
		components: {
			uniBar
		},
		data () {
			return {
				novelTitle: '',
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
			//#ifdef APP-PLUS
			plus.navigator.setFullscreen(true);
			//#endif
			
			let v = this
			v.novelTitle = option.novelTitle
			v.requirePage(option.id, option.page, option.novelId)
		},
		computed: {
			lineWordsNum () {
				return Math.trunc(710/this.fontSize)
			},
			ls () {
				return this.content.length === 0 ? this.lineSize - 2 : this.lineSize
			}
		},
		methods: {
			init () {
				this.page = 0
				this.text = ''
				this.content = []
			},
			requirePage (id, page, novelId) {
				let v = this
				if (pageChanging) {
					return
				}
				pageChanging = true
				v.init()
				sectionApi.getSection(id, novelId).then(res => {					
					v.section = res ? res : {}
				    v.getPages()
					console.log(v.content)
					page = page !== null && page !== undefined && page <= v.content.length ? parseInt(page.toString()) : 0
					v.page = page === -1 ? v.content.length - 1 : page
					console.log(page)
					v.cacheRate()
					pageChanging = false
				}).catch(err => { 
					pageChanging = false
					console.log(err)
				})
			},
			/**
			 * console.log(this.section.content.replace(/\n/g,"<br/>"))
			 * 因为字符串中隐含了换行符 \n，有多少个换行符就代表了有多少行
			 * @param {Object} contentStr 内容字符串
			 */
			getPages () {
				let v = this
				let arr = v.section.content.split(/\n/g), lineNum = 0, tempText = ''
				for (let i = 0; i < arr.length; i++) {
					let num =  Math.ceil(arr[i].length / v.lineWordsNum) //当前字符串可以划分多少行
					num = num === 0 ? 1 : num
					if (lineNum + num <= v.ls) { //如果已有行数 + 新增行数 <= 最大行数
						lineNum += num
						tempText += arr[i] + '\n'
						if (i === arr.length - 1) {
							v.content.push(tempText)
						}
						//console.log(lineNum)
						continue
					}
					let distanceWords = (v.ls - lineNum) * v.lineWordsNum
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
						v.requirePage(v.section.nextSection)
						//uni.redirectTo({ url: 'readSection?id=' + v.section.nextSection })
					}
					return
				}
				if (v.page !== 0) {
					return
				}
				if ( v.section.lastSection === null || v.section.lastSection === undefined) {
					console.log('已经是第一页了')
					//#ifdef APP-PLUS
					plus.nativeUI.toast("已经是第一页了");
					//#endif
					//#ifdef H5
					uni.showToast({title: '已经是第一页了', icon: "none"})
					//#endif
				} else {
					console.log('翻页：前')
					v.requirePage(v.section.lastSection, -1)
				}
			},
			goBack () {
				uni.navigateBack({delta: 1})
			},
			goToMenu () {
				uni.navigateTo({ 'url': 'onlyReadMenu?id='+this.section.novelId +'&title='+ this.novelTitle })
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	.read-page {
		background-color: #D1BA74;
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
	
	.status_bar-show-bar {
		height: 50upx;
		width: 100%;
	}
	
	.status_bar-show-content {
		width: 100%;
		height: 50upx;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.status_bar-show-content image {
		margin-top: 7.5upx;
		width: 35upx;
		height: 35upx;
		margin-left: 20upx;
	}
	
	.status_bar-show-content text {
		height: 50upx;
		line-height: 50upx;
		color: #F0AD4E;
		margin-right: 20upx;
		font-size: 35upx;
	}
	
	.section-page-style {
		width: 750upx;
		height: 1190upx;
		margin-top: 60upx;
		background-color: #D1BA74;
	}
	
	.content-style {
		width: 710upx;
		height: 1100upx;
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
	
	.article-section-title {
		font-size: 50upx;
		font-weight: 500;
		padding-left: 10upx;
	}
</style>
