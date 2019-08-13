<template>
	<view class="diary-edit-content">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件" :fixed="true" :status-bar="true"></uni-nav-bar> -->
		<view class="diary-edit-content-title">
			<input class="diary-title-input" :adjust-position="false" v-model="diary.title" placeholder="请输入标题" placeholder-class="diary-placeholder" maxlength="50"/>
		    <view class="diary-title-date">
				<picker mode="date" :value="diary.date" @change="bindDateChange">{{diary.date}}</picker>
			</view>
		</view>
		<view class="diary-edit-content-body">
			<textarea class="diary-edit-content-body-text" 
			          v-model="diary.content" 
					  placeholder="请输入内容" 
					  placeholder-style="color: #E0E0E0;" 
					  maxlength="-1"
			></textarea>
		</view>
		<view class="diary-edit-foot" v-show="foot.footVisable">
			<!-- 标签 -->
			<view class="diary-edit-foot-label">
				<label-img v-for="l in checkedLabels" :name="l.name" :key="l.id" size="small"></label-img>
			</view>
			<!-- 分类-->
			<view class="diary-edit-foot-classify">
				#{{classifyName}}#
			</view>
			<view class="diary-edit-foot-button" @tap="foot.button = !foot.button">
				<text>···</text>
			</view>
			<!-- 列表 -->
			<view class="diary-edit-foot-list" :class="{'diary-edit-foot-list-hide': !foot.button, 'diary-edit-foot-list-show': foot.button}">
				<view @tap="openBottomModel"><text>分类</text></view>
				<view @tap="openBottomLabel"><text>标签</text></view>
				<view @tap="alterSaveType" :class="statusClass"><text>{{typeName}}</text></view>
			</view>
		</view>
		<inputDlog ref="classifyDlog"></inputDlog>
		<inputDlog ref="labelDlog"></inputDlog>
		<bottom-model ref="bmodel" v-on:close="closeBottomModel">
			<view class="bottom-model-classify">
				<view class="bottom-model-title">
					<text>日记分类选择</text>
				</view>
				<view class="bottom-model-classify-body">
					<picker-view class="classify-picker" indicator-class="classify-selector" @change="classifyChange" :value="classifyIndex">
						 <picker-view-column>
							 <view class="bottom-model-classify-body-item" v-for="c in classify" :key="c.id">{{c.name}}</view>
						 </picker-view-column>
					</picker-view>
				</view>
				<view class="bottom-model-add"><text @tap="openClassifyDiog">新增</text></view>
			</view>
		</bottom-model>
		<bottom-model ref="labelModel" v-on:close="closeBottomLabel">
			<view class="bottom-model-label">
				<view class="bottom-model-title">
					<text>日记标签选择</text>
				</view>
				<view class="bottom-model-label-body">
					<checkbox-group style="width: 100%;" @change="checkboxChange">
						<label class="checkbox-label" v-for="label in labels" :key="label.id">
							<label-img :name="label.name" size="small"></label-img>
							<view>
								<checkbox :value="label.id"  :checked="label.check" style="transform:scale(0.7)"/>
							</view>
						</label>
					</checkbox-group>
				</view>
				<view class="bottom-model-add"><text @tap="openLabelDlog">新增</text></view>
			</view>
		</bottom-model>
	</view>
</template>

<script>
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	
	import diaryApi from '../../../api/article/diary.js'
	
	import classifyApi from '../../../api/article/classify.js'
	
	import labelApi from '../../../api/article/label.js'
	
	import {userToken} from '../../../http.js'
	
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar"
	
	import inputDlog from '../../../components/inputDlog'
	
	import bottomModel from '../../../components/model/buttomModel.vue'
	
	import labelImg from '../../../components/label-img'
	
	import dataUtil from '../../../common/dataUtil.js'

    const saveType = ['草稿', '私密', '发布']

	export default {
		components: {
			uniNavBar,
			labelImg,
			bottomModel
		},
		data () {
			return {
				diary: {
					id: null,
					title: '',
					content: '',
					status: 0,
					classify: null,
					date: dataUtil.dateFormat('yyyy-MM-dd', new Date()),
					source: 2
				},
				classify: [],
				classifyIndex: [],
				labels: [],
				foot: {
					footVisable: true,
					button: false
				}
			}
		},
		onLoad (option) {
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
			// #endif
			let id = option.id
			let v = this
			//1.加载分类列表
			classifyApi.getClassifies({'childType': 1}).then(res => {
				v.classify = res
			}).catch(err => {console.log(err)})
			//2.加载标签列表
			labelApi.getLabelsList().then (res => {
				if (res === null || res === undefined || res.length === 0) {
					v.labels = []
					return
				}
				res.map(l => {
					l.id = l.id.toString()
					v.$set(l, 'check', false)
				})
				v.labels = res	
			}).catch(err => { console.log(err) })
			//3.判断是编辑还是新建
			if (!id) {
				// 新建日记
				return
			}
			// 编辑日记
			//1.设置导航栏为日记标题
			uni.setNavigationBarTitle( { title: "编辑"} )
			uni.showLoading( { title: '加载中', mask: true } )
			//2.加载日记
			diaryApi.getDiary(id, { complete: res => {uni.hideLoading()} } ).then(res => {
				v.diary = res
	            // 初始化已选标签
				//2.1 根据日记自己的所选标签通过id匹配总的标签确定是否已被选中，根据是否被选中添加check的值， 选中 true， 没有 false
				v.labels.map((label, index) => {
					label.check = v.diary.labelList.some(l => { return l.id.toString() === label.id })
				})
				//3 匹配分类
				v.classifyIndex.push(v.classify !== null && v.classify !== undefined ? v.classify.findIndex(c => { return c.id === v.diary.classify }) : -1)
			}).catch(err => { console.log(err) })
		},
		/**
		 * 屏幕尺寸监听事件
		 * @param {Object} e
		 */
		onResize (e) {
			this.foot.footVisable = !(e.size.windowWidth === this.$screen.windowWidth && e.size.windowHeight < this.$screen.windowHeight/2)
		},
		/**
		 * 导航栏按钮响应事件 (保存日记)
		 */
		onNavigationBarButtonTap () {
			let v = this
			if (v.diary.title.trim() === '') {
				uni.showToast({ title: '标题不能为空', icon: "none" })
				return
			}
			//获取选中的标签的id组字符串
			let labels = ''
			v.labels.map((obj, index) => {
				if (obj.check) {
					labels += ',' + obj.id
				}
			})
			v.diary.labels = labels.substr(1)
			diaryApi.saveDiary(v.diary).then(res => {
				if (v.diary.id === null) {
					v.diary.id = res.id
				}
				v.alterListStatus(1) //修改日记模块状态 方便返回列表的时候刷新，否则日记列表页面不会显示新创建的日记
				uni.showToast({ title: '保存成功' })
			}).catch(err => {
				uni.showToast({ title: err.message, icon: 'none' })
			})
		},
		methods: {
			 ...mapMutations({
				 'alterListStatus': 'diary/alterStatus'
			 }),
			/**
			 * 打开添加分类的弹窗,添加日记分类
			 */
			openClassifyDiog () {
				this.$refs.bmodel.close()
				console.log('open')
				let v = this
				this.$refs.classifyDlog.show({
					title: '请输入分类名',
					placeholder: '分类名不能超过7个字',
					submit: (name) => {
						classifyApi.addClassify( {name: name, childType: 1} ).then(res => {
							v.classify.push(res)
							v.diary.classify = res.id
							uni.showToast({ title: '创建成功'})
						}).catch(err => {
							uni.showToast({
								title: err.message,
								icon: "none"
							})
						})
					}
				})
			},
			/**
			 * 标签的多选框选择事件
			 * @param {Object} val
			 */
			checkboxChange (e) {
				let v = this
				let arr = e.detail.value
				for (let i = 0; i < v.labels.length; i ++) {
					v.labels[i].check =  arr.findIndex(o => { return o === v.labels[i].id }) !== -1
				}
			},
			/**
			 * 通过点击修改保存的类型
			 */
			alterSaveType () {
				this.diary.status = this.diary.status === 2 ? 0 : this.diary.status + 1
			},
			/**
			 * 打开标签创建输入框,添加标签
			 * @param {Object} name
			 */
			openLabelDlog () {
				let v = this
				this.$refs.labelModel.close()
				this.$refs.labelDlog.show({
					title: '请输入标签名',
					submit: (name) => {
						labelApi.addLabel({name: name}).then(res => {
							res.id = res.id.toString()
							res.check  = true
							v.labels.push(res)
							uni.showToast({ title: '创建成功' })
						}).catch(err => {
							console.log(err)
							uni.showToast({ title: err.message, icon: "none" })
						})
					}
				})
			},
			/**
			 * 日期修改事件
			 * @param {Object} e
			 */
			bindDateChange (e) {
				if (e && e.detail) {
					this.diary.date = e.detail.value
				}
			},
			openBottomModel (e) {
				this.$refs.bmodel.open()
			},
			closeBottomModel (e) {
				console.log('关闭')
				this.$refs.bmodel.close()
			},
			classifyChange (e) {
				this.diary.classify = this.classify[e.detail.value[0]].id
			},
			openBottomLabel () {
				this.$refs.labelModel.open()
			},
			closeBottomLabel (e) {
				this.$refs.labelModel.close()
			},
			labelChange () {
				
			}
		},
		computed: {
			classifyName () {
				let v = this
				let cls = v.classify.find(o => {
					return v.diary.classify === o.id
				})
				return cls !== undefined && cls !== null ? cls.name : '分类'
			},
			typeName () {
				return saveType[this.diary.status]
			},
			statusClass () {
				return this.diary.status === 1 ? 'private-class' : (this.diary.status === 2 ? 'submit-class' : '')
			},
			checkedLabels () {
				console.log(this.labels)
				return this.labels.filter(l => {
					return l.check
				})
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.diary-edit-content {
		flex-direction: column;
		width: 100%;
	}
	
	.diary-edit-content-title {
		width: 710upx;
		margin-top: 20upx;
		font-size: 30upx;
		padding: 10upx 20upx;
		border-bottom: 1upx solid #EFEFF4;
		flex-direction: row;
		height: 50upx;
	}
	
	.diary-title-input {
		width: 500upx;
	}
	
	.diary-title-date {
		width: 250upx;
		line-height: 50upx;
		justify-content: center;
		border-left: 1upx solid #EFEFF4;
	}
	
	.diary-placeholder {
		color: #D5D5D5;
	}
	
	.diary-edit-content-body {
		padding: 20upx 30upx;
	}
	
	.diary-edit-content-body-text {
		width: 690upx;
		height: 800upx;
		background-color: #FFFFFF;
	}
	
	.diary-edit-foot {
		position: absolute;
		bottom: 0upx;
		height: 170upx;
		width: 100%;
		flex-direction: column-reverse;
	}
	
	.diary-edit-foot-label,  .diary-edit-foot-classify{
		height: 50upx;
		margin-bottom: 10upx;
		flex-direction: row;
	}
	
	.diary-edit-foot-classify {
        font-size: 30upx;
		font-weight: 800;
		border-top: 1upx solid #D5E4FD;
		border-bottom: 1upx solid #D5E4FD;
	}
	
	.diary-edit-foot-button, .diary-edit-foot-list {
		position: absolute;
		width: 80upx;
		right: 50upx;
		z-index: 300;
	}
	
	.diary-edit-foot-button {
		border-radius: 150upx;
		box-shadow: 1upx 5upx 1upx #E0E0E0;
		background: #FFD700;
		top: -100upx;
		height: 80upx;
	}
	
	.diary-edit-foot-list  view, .diary-edit-foot-button text {
		width: 100%;
		text-align: center;
	}
	
	.diary-edit-foot-button text {
		height: 100%;
		line-height: 80upx;
		font-size: 50upx;
	}
	
	.diary-edit-foot-list {
		transition: top 0.6s, height 0.6s, transform 0.6s;
		overflow: hidden;
		display: block;
	}
	
	.diary-edit-foot-list-show {
		height: 260upx;
		top: -400upx;
	}
	
	.diary-edit-foot-list-hide {
		height: 0upx;
		top: -100upx;
	}
	
	.diary-edit-foot-list  view {
		width: 80upx;
		height: 80upx;
		border-radius: 150upx;
		box-shadow: 1upx 5upx 1upx #E0E0E0;
		background: #87CEFA;
		margin-bottom: 10upx;
		
	}
	
	.diary-edit-foot-list  view > text {
		width: 100%;
		height: 100%;
		font-size: 30upx;
		line-height: 80upx;
	}
	
	.checkbox-label {
		flex-direction: row;
		display: flex;
		padding: 10upx 10upx;
		height: 40upx;
		line-height: 40upx;
		overflow: hidden;
		text-overflow: ellipsis;
		justify-content: space-between;
	}
	
	.bottom-model-classify {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.bottom-model-classify > view, .bottom-model-label > view {
		width: 100%;
	}
	
	.bottom-model-title{
		height: 80upx;
		justify-content: center;
		border-bottom: 1upx solid #EFEFF4;
	}
	
	.bottom-model-title text{
		font-size: 30upx;
		font-weight: 600;
		height: 80upx;
		line-height: 80upx;
	}
	
	.bottom-model-classify-body {
		height: 340upx;
	}
	
	.bottom-model-classify-body-item {
		text-align: center;
		line-height: 70upx;
		justify-content: center;
	}
	
	.bottom-model-add {
		height: 80upx;
		justify-content: center;
	}
	
	.bottom-model-add text {
		width: 120upx;
	    height: 50upx;
		line-height: 50upx;
		border-radius: 10upx;
		box-shadow: 1upx 5upx 1upx #E0E0E0;
		font-size: 20upx;
		background: #FFD700;
		text-align: center;
		margin-top: 10upx;
	}

	.classify-selector {
		height: 80upx;
		width: 100%;
		font-size: 25upx;
		line-height: 80upx;
	}
	
	.classify-picker {
	    width: 100%;
	    height: 340upx;
	}
	
	.bottom-model-label {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.bottom-model-label-body {
		height: 340upx;
		overflow: auto;
	}

	.private-class {
		background: #C7C7CD !important;
	}
	.submit-class {
		background: #00FF7F !important;
	}
</style>
