<template>
	<view class="action-body">
		<view class="action-list-body" v-show="pageType === 1">
			<view class="action-search-menu">
				<view style="margin-left: 10px;">
					<view style="position: relative;" :style="{color: childView === 1 ? 'blue' : ''}" @tap="crolChildView(1)">
						<text id="ddd">筛选</text>
						<m-icon style="position: absolute; left: 35px; top: 11px;" :type="childView === 1 ? 'arrowup' : 'arrowdown'" size="10"></m-icon>
					</view>
					<view style="position: relative; margin-left: 45px;" :style="{color: childView === 2 ? 'blue' : ''}" @tap="crolChildView(2)">
						<text>分类</text>
						<m-icon style="position: absolute; left: 35px; top: 11px;" :type="childView === 2 ? 'arrowup' : 'arrowdown'" size="10"></m-icon>
					</view>
				</view>
				<view style="margin-right: 10px;">
					<text style="color: #F8F8F8;">|</text>
					<text style="padding: 0 5px;">搜索</text>
				</view>
			</view>
			<view class="action-childview" :class="{'action-childview-show':  childView === 1}">
				<view style="width: 100%;height: 350px; background-color: #FFFFFF;flex-direction: column; position: relative;padding-top: 10px;">
					<view style="width: 100%; flex-direction: column;">
						<text style="font-size: 16px;margin-left: 15px;height: 25px;line-height: 25px;">结果筛选</text>
						<view style="width: 100%; height: 150px; display: block;">
							<text v-for="(r, index) in actionTypesText" :key="index" @tap="selectype(index)"
							    :style="{'background-color': searchParams.actionResultSel === index ? '#87CEFA' : '#EBEDF0'}"
							    style="width: 100px; height: 30px; margin-top: 15px; line-height: 30px;font-size: 14px; margin-left: 15px; display: inline-block;text-align: center;">{{r}}</text>
						</view>
						<text style="font-size: 16px;margin-left: 15px;height: 25px;line-height: 25px;">时间范围</text>
						<view style="height: 60px; padding: 15px; flex-direction: row;">
							<picker mode="date" :value="searchParams.startDate"  @change="bindDateChange" id="startDateParam">
								<view  :style="{'color': searchParams.startDate === '0' ? '#EBEDF0' : ''}"
								  style="width: 100px;height: 35px; line-height: 35px;font-size: 14px;border: 1px solid #F5F5F5;padding: 0 15px;">
								  {{searchParams.startDate === '0' ? '开始时间' : searchParams.startDate}}
								</view>
							</picker>
							<text style="color: #F5F5F5;margin: 0 10px;">——</text>
							<picker mode="date" :value="searchParams.endDate"  @change="bindDateChange" id="endDateParam">
								<view  :style="{'color': searchParams.endDate === '0' ? '#EBEDF0' : ''}"
								   style="width: 100px;height: 35px; line-height: 35px;font-size: 14px;border: 1px solid #F5F5F5;padding: 0 15px;">
								  {{searchParams.endDate === '0' ? '结束时间' : searchParams.endDate}}
								</view>
							</picker>
						</view>
					</view>
					<view style="width: 100%; position: absolute; left: 0; bottom: 0;">
						<text @tap="inintSearchParams" class="action-childview-button" style="background-color: #D5E4FD; color:  #007AFF;">重置</text>
						<text @tap="searchPageByParams" class="action-childview-button" style="background-color: #007AFF; color:  #FFFFFF;">确定</text>
					</view>
				</view>
			</view>
			<view class="action-label-menu action-fix-top">
				<view style="background-color: #FFFFFF;border-radius: 120px;height: 25px;margin: auto 15px;">
					<text style="font-size: 15px;padding: 0 10px;height: 25px;line-height: 25px;" @tap="showPlanContent">{{plan.planName}}</text>
				</view>
			</view>
			<view class="action-content-list">
				<template v-for="(a, index) in page.list">
					<view class="action-label-menu" v-if="a.etype === 0" :key="index + '_index'">
						<view style="background-color: #FFFFFF;border-radius: 120px;height: 25px;margin: auto 15px;">
							<text style="font-size: 15px;padding: 0 10px;height: 25px;line-height: 25px;">{{a.dateStr}}</text>
						</view>
					</view>
					<!-- <view class="action-content-item" v-if="a.etype === 1" :key="index"> -->
					<view class="action-content-item" :key="a.id" @click="showReason(index)">
						<view class="action-content-item-label">						
							<m-icon :type="actionTypes[a.result]" :color="actionTypesColor[a.result]" style="margin-top: 8px;"></m-icon>
							<text :style="{'color': actionTypesColor[a.result]}">{{actionTypesText[a.result]}}</text>
						</view>
						<view style="height: 70px;flex-direction: column;">
							<text style="font-size: 14px; height: 25px; line-height: 25px;margin-top: 5px;">第{{a.num}}次</text>
							<view style="width: 100%;flex-direction: row;padding: 5px 0;" v-if="a.result !== 0 && a.result !== 1 && (a.startTime || a.endTime)">
								<text style="font-size: 14px;">{{a.startTimeStr}}-{{a.endTimeStr}}</text>
								<text style="font-size: 12px;margin-left: 10px;" v-if="a.consumeTime">累计&nbsp;{{a.consumeTime}}</text>
							</view>
							<text style="color: #E0E0E0; font-size: 12px;">{{a.actionDate}}</text>
						</view>
					</view>
				</template>
				<uni-load-more :status="loadSign"></uni-load-more>
			</view>
		</view>
		<view v-show="pageType === 2" class="action-static-body">
			<view class="action-static-title">
				<text style="height: 40px;line-height: 40px; font-size: 20px;font-weight: 700;color: #FFFFFF;font-style: italic ;">{{plan.planName}}</text>
				<text style="font-size: 14px;">计划内容为 &ensp;&ensp;{{plan.content}}</text>
			</view>
			<view class="action-static-content">
				<view class="action-static-content-1">
					<view class="action-static-content-1-tap action-static-content-1-common">
						<text :style="{'background-color': hasDoCap}" @tap="tapTable" id="hasDoTable">执行数据</text>
						<text :style="{'background-color': unDoCap}" @tap="tapTable" id="unDoTable">待执行数据</text>
					</view>
					<view style="width: 100%; flex-direction: column;" v-show="astatic.tap === 1">
						<view class="action-static-content-1-common action-static-content-1-content">
							<text style="color: #00DB00;">65</text>
							<text style="color: #FFDC35	;">2</text>
							<text style="color: red;">0</text>
							<text style="color: #A9A9A9;">365</text>
						</view>
						<view class="action-static-content-1-common action-static-content-1-content2">
							<text>已完成</text>
							<text>超时完成</text>
							<text>未完成</text>
							<text>已放弃</text>
						</view>
						<view style="padding: 0 20px;">
							<text>累计执行次数</text>
							<text style="padding: 0 10px; color: #2F85FC;">432</text>
							<text>次</text>
						</view>
					</view>
					<view style="width: 100%; flex-direction: column;" v-show="astatic.tap === 2">
						<view class="action-static-content-1-common action-static-content-1-content3">
							<text style="color: #00DB00;">65</text>
							<text style="color: #FFDC35	;">2</text>
							<text style="color: red;">0</text>
						</view>
						<view class="action-static-content-1-common action-static-content-1-content4">
							<text>剩余次数</text>
							<text>剩余天数</text>
							<text>剩余小时数</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="action-tap-menus">
			<view @tap="changePage(1)">
				<m-icon type="list" :color="pageType === 1 ? 'blue' : ''"></m-icon>
				<text :style="{color: pageType === 1 ? 'blue' : ''}">列表</text>
			</view>
			<view @tap="changePage(2)">
				<m-icon type="compose" :color="pageType === 2 ? 'blue' : ''"></m-icon>
				<text :style="{color: pageType === 2 ? 'blue' : ''}">统计</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	import actionApi from '../../../api/target/targetPlan.js' // plan和action的都合并写在了这个js中
	
	import {MyPage} from '../../../common/pageUtil.js'
	import util from '@/common/objUtil.js'
	
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import mIcon from '../../../components/m-icon/m-icon.vue'
	
	export default {
		components: {
			mIcon,
			uniLoadMore
		},
		data () {
			return {
				pageType: 1, // 页面当前显示的内容类型 1-执行结果列表 2-结果统计
				childView: 0, // 筛选栏中选中的对象 0-没有选择 1-筛选 2-分类
				actionTypes: ['locked', 'spinner-cycle', 'email-filled', 'checkbox-filled', 'location-filled', 'clear', 'help-filled'],
				actionTypesText: ['不可开始', '等待开始', '进行中', '已结束', '超时结束', '没有完成', '已放弃'],
				actionTypesColor: ['#C8C7CC', '#87CEFA', 'blue', 'green', '#F0AD4E', 'red', '#DD524D'],
				loadSign: 'more',
				page: {},
				plan: {},				
				searchParams: {
					actionResultSel: -1, // 筛选下拉框中结果筛选的选中值
					startDate: '0',
					endDate: '0'
				},
				astatic: {
					tap: 1
				}
			}
		},
		onLoad (option) {
			option = option.planId === undefined ? {'planId': 2} : option
			let v = this
			actionApi.getPlan(option.planId).then(res => {
				v.plan = res
				v.page = new MyPage({size: 10, searchFunction: actionApi.getActionsPage, params: {planId: option.planId}})
			}).catch(err => { console.log(err) })
			
			console.log(this.$screen)
		},
		onPullDownRefresh () {
			if (this.pageType === 1) {
				this.page.params = {planId: this.plan.id}
				this.page.requestLine({type: false, reflush: false, complete: () => {uni.stopPullDownRefresh()}})
			} else {
				
			}
		},
		/**
		 * 上拉触发获取下一页方法
		 */
		onReachBottom () {
			let v = this
			if (v.pageType === 2) {
				return
			}
			if (!v.page.hasNextPage()) {
				v.loadSign = 'noMore'
				return
			}
			v.loadSign = 'loading'
			v.page.getNextLineFree({complete: () => { v.loadSign = 'more' }})
		},
		computed: {
			hasDoCap () {
				return this.astatic.tap === 1 ? '#FFFFFF' : ''
			},
			unDoCap () {
				return this.astatic.tap === 2 ? '#FFFFFF' : ''
			}
		},
		methods: {
			changePage (type) {
				let v = this
				this.pageType = type
				uni.setNavigationBarTitle({ title: type === 1 ? '计划执行情况' : '计划执行统计' })
			},
			crolChildView (type) {
				this.childView = this.childView === type ? 0 : type
				if (type === 1) {
					this.inintSearchParams()
				}
			},
			/**
			 * 筛选下拉框中结果筛选的选择方法
			 * @param {Object} index
			 */
			selectype (index) {
				this.searchParams.actionResultSel = this.searchParams.actionResultSel === index ? -1 : index
			},
			bindDateChange (e) {
				let target = e.target
				if (target.id === 'startDateParam') {
					this.searchParams.startDate = target.value
				} else {
					this.searchParams.endDate = target.value
				}
			},
			/**
			 * 重置筛选框的选项
			 */
			inintSearchParams () {
				this.searchParams = {
					actionResultSel: -1, 
					startDate: '0',
					endDate: '0'
				}
			},
			/**
			 * 通过筛选框查询列表
			 */
			searchPageByParams () {
				let v = this
				let p = {}
				if (v.searchParams.actionResultSel !== -1) {
					p.result = v.searchParams.actionResultSel
				}
				if (v.searchParams.startDate !== '0') {
					p.startDate = v.searchParams.startDate
				}
				if (v.searchParams.endDate !== '0') {
					p.endDate = v.searchParams.endDate
				}
				console.log(v.plan)
				p.planId = v.plan.id
				v.page.params = p
				v.page.requestLine({type: false})
				v.inintSearchParams()
			},
			showPlanContent () {
				let v = this
				//#ifdef H5
				uni.showModal({
				    title: '计划详情',
				    content: v.plan.content,
					showCancel: false,
				    success: function (res) {}
				});
				//#endif
			},
			showReason (index) {
				let a = this.page.list[index]
				if (a.result === 4 || a.result === 6) {
					//#ifdef H5
					uni.showModal({
					    title: '原因',
					    content: util.strNotNull(a.resaon) ? a.reason : '没有填写理由喔',
						showCancel: false,
					    success: function (res) {}
					});
					//#endif
					//#ifdef APP-PLUS
					plus.nativeUI.alert(util.strNotNull(a.resaon) ? a.reason : '没有填写理由喔', function(){
					}, "原因", "OK");
					//#endif
				}
			},
			tapTable (e) {				
				this.astatic.tap = e.target.id === 'hasDoTable' ? 1 : 2
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.action-body {
		width: 100%;
		flex-direction: column;
	}
	
	.action-list-body{
		width: 100%;
		flex-direction: column;
		padding-bottom: 60px;
		box-sizing: border-box;
		position: relative;
	}
	
	.action-list-body {
		padding-top: 82px;
	}
	
	.action-static-body {
		width: 100%;
		flex-direction: column;
		padding-bottom: 60px;
		box-sizing: border-box;
		height: 100%;
		position: relative;
	}
	
	.action-static-body {
		padding-top: 100px;
		background: linear-gradient(top, #FFD700 , #FFFF6F, #FFFFFF 80%);
	}
	
	.action-search-menu {
		background-color: #FFFFFF;
		width: 100%;
		height: 30px;
		flex-direction: row;
		justify-content: space-between;
		font-size: 14px;
		border-top: 1px solid #EBEDF0;
		border-bottom: 1px solid #EBEDF0;
		position: fixed;
		top: 44px;
		left: 0;
	}
	
	.action-search-menu > view {
		flex-direction: row;
	}
	
	.action-search-menu text {
		height: 30px;
		line-height: 30px;
	}
	
	.action-fix-top {
		position: fixed;
		top: 76px;
		left: 0;
	}
	
	.action-label-menu {
		width: 100%;
		height: 50px;
		background-color: #EBEDF0;
		border-top: 0.5px solid #E0E0E0;
		border-bottom: 0.5px solid #E0E0E0;
	}
	
	.action-content-list {
		background-color: #FFFFFF;
		height: 100%;
		flex-direction: column;
	}
	
	.action-content-item {
		width: 100%;
		height: 80px;
		border-bottom: 0.5px solid #EFEFF4;
		flex-direction: row;
	}
	
	.action-content-item-label {
		width: 90px;
		height: 80px;
		flex-direction: column;
		text-align: center;
		font-size: 13px;
	}
	
	.action-tap-menus {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 40px;
		padding-top: 10px;
		padding-bottom: 10px;
		flex-direction: row;
		background-color: #EFEFF4;
	}
	
	.action-tap-menus > view {
		flex-direction: column;
		width: 50%;
		text-align: center;
	}
	
	.action-tap-menus > view > text {
		font-size: 10px;
	}
	
	.action-childview {
		position: fixed !important;
		z-index: 999;
		top: 76px;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0, 0, 0, .46);
		transition: all .1s;
		visibility: hidden;
		opacity: 0;
	}
	
	.action-childview-show {
		opacity: 1;
		visibility: visible;
	}
	
	.action-childview-button {
		width: 50%;
		height: 45px;
		text-align: center;
		font-weight: 500;
		font-size: 16px;
		line-height: 45px;
	}
	
	.action-static-title {
		margin-top: -100px;
		height: 100px;
		flex-direction: column;
		padding: 10px 20px;
	}
	
	.action-static-content {
		height: 100%;
		flex-direction: column;
		padding: 0 20px;
	}
	
	.action-static-content-1 {
		height: 200px;
		border-radius: 10px;
		background-color: #FFFFFF;
		flex-direction: column;
		overflow: hidden;
	}
	
	.action-static-content-1-common {
		width: 100%;
		font-size: 13px;
		text-align: center;
	}
	
	.action-static-content-1-tap {
		height: 40px;
		font-weight: 600;
		background-color: #FFFFDF;
	}
	
	.action-static-content-1-tap > text {
		width: 50%;
		height: 40px;
		line-height: 40px;
	}
	
	.action-static-content-1-content, .action-static-content-1-content2, .action-static-content-1-content3 , .action-static-content-1-content4{
		height: 50px;
	}
	
	.action-static-content-1-content > text, .action-static-content-1-content3 > text {
		height: 50px;
		line-height: 50px;
		font-size: 20px;
		font-weight: 700;
	}
	
	.action-static-content-1-content > text,  .action-static-content-1-content2  > text{
		width: 25%;
	}
	
	.action-static-content-1-content3 > text, .action-static-content-1-content4 > text {
		width: 33.3%;
	}
	
</style>
