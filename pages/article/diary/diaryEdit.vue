<template>
	<view class="diary-edit-content">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件" :fixed="true" :status-bar="true"></uni-nav-bar> -->
		<view class="diary-edit-content-title">
			<input class="diary-title-input" :adjust-position="false"  :class="{'diary-title-input-on': titleInput}" v-model="diary.title" placeholder="请输入标题" placeholder-class="diary-placeholder" maxlength="50"  @focus="titleInput=true" @blur="titleInput=false"/>
		    <view class="diary-title-date">
				<!-- <text>{{diary.date}}</text> -->
				<!-- <ruiDatePicker
					fields="second"
					start="2010-00-00 00:00:00"
					end="2030-12-30 23:59:59"
					:value="diary.date"
					@change="bindChange"
					@cancel="bindCancel"
				></ruiDatePicker> -->
				<picker mode="date" :value="diary.date" @change="bindDateChange">{{diary.date}}</picker>
			</view>
		</view>
		<view class="diary-edit-content-body">
			<textarea class="diary-edit-content-body-text" v-model="diary.content" placeholder="请输入内容" placeholder-style="color: #E0E0E0;" maxlength="-1"></textarea>
		</view>
		<view class="diary-edit-foot">
            <buttom-menu>
				<template v-slot:top>
					<view style="width: 100%; height: 100%;flex-direction: column-reverse;">
						<view>
							<label-img v-for="l in checkedLabels" :name="l.name" :key="l.id" size="small"></label-img>
						</view>
					</view>
				</template>
				<menu-item :title="classifyName" ref="titleDiv">
					<view class="menu-item-hover-view-classify">						
						<view class="menu-item-hover-view-classify-list">
							<view class="menu-item-hover-view-classify-list-view" v-for="c in classify"  :key="c.id" @tap="selectClassify(c.id)" hover-class="select-classify" :hover-start-time="0" :hover-stay-time="1000">
								<text class="menu-item-hover-view-classify-list-text">{{c.name}}</text>
							</view>
						</view>
						<view @tap="openClassifyDiog" hover-class="select-classify" :hover-start-time="0" :hover-stay-time="1000">
							<text>创建分类</text>
						</view>
					</view>
				</menu-item>
				<menu-item title="标签">
					<view class="menu-item-hover-view-labels">
						<view class="menu-item-hover-view-labels-list">
							<checkbox-group @change="checkboxChange">
								<label class="checkbox-label" v-for="label in labels" :key="label.id">
									<view>
										<checkbox :value="label.id" :checked="label.check" style="transform:scale(0.7)"/>
									</view>
									<view>{{label.name}}</view>
								</label>
							</checkbox-group>
						</view>
						<view>
							<text @tap="openLabelDlog">创建标签</text>
						</view>
					</view>
				</menu-item>
				<menu-item :title="typeName" :menuAble="false" :tapEvent="true" @MyClick="alterSaveType"></menu-item>
			</buttom-menu>
		</view>
		<inputDlog ref="classifyDlog" title="请输入分类名" :submit="addClassify"></inputDlog>
		<inputDlog ref="labelDlog" title="请输入标签名" :submit="addLabel"></inputDlog>
	</view>
</template>

<script>
	import diaryApi from '../../../api/article/diary.js'
	
	import classifyApi from '../../../api/article/classify.js'
	
	import labelApi from '../../../api/article/label.js'
	
	import {userToken} from '../../../http.js'
	
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar"
	
	import buttomMenu from '../../../components/buttom-menu/buttom-menu'
	
	import menuItem from '../../../components/buttom-menu/menu-item'
	
	import inputDlog from '../../../components/inputDlog'
	
	import labelImg from '../../../components/label-img'
	
	import dataUtil from '../../../common/dataUtil.js'

    const saveType = ['草稿', '私密', '发布']

	export default {
		components: {
			uniNavBar,
			buttomMenu,
			menuItem,
			labelImg
		},
		data () {
			return {
				diary: {
					id: null,
					title: '',
					content: '',
					status: 0,
					classify: null,
					date: dataUtil.dateFormat('yyyy-MM-dd', new Date())
				},
				classify: [],
				labels: [],
				titleInput: false,
				src: 'http://localhost:8085/?token=' + userToken.token + '&user=' + userToken.user // 暂时无用
			}
		},
		onLoad (option) {
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
					label.check = v.diary.labelList.some(l => {
						return l.id.toString() === label.id
					})
				})
				console.log(v.labels)
			}).catch(err => { console.log(err) })
		},
		/**
		 * 导航栏按钮响应事件 (保存日记)
		 */
		onNavigationBarButtonTap () {
			console.log("点击了保存")
			let v = this
			if (v.diary.title.trim() === '') {
				uni.showToast({
					title: '标题不能为空',
					icon: "none"
				})
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
				uni.showToast({
					title: '保存成功'
				})
			}).catch(err => {
				uni.showToast({
					title: err.message,
					icon: 'none'
				})
			})
		},
		methods: {
			/**
			 * 选择日记的分类
			 * @param {Object} id
			 */
			selectClassify (id) {
				this.diary.classify = id
				this.$refs.titleDiv.closeMenu()
			},
			/**
			 * 打开添加分类的弹窗
			 */
			openClassifyDiog () {
				this.$refs.classifyDlog.open()
			},
			/**
			 * 添加日记分类
			 * @param {Object} name
			 */
			addClassify (name) {
				let v = this
				classifyApi.addClassify( {name: name, childType: 1} ).then(res => {
					v.classify.push(res)
					v.diary.classify = res.id
					uni.showToast({
						title: '创建成功'
					})
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "none"
					})
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
				console.log(this.diary)
				this.diary.status = this.diary.status === 2 ? 0 : this.diary.status + 1
			},
			/**
			 * 打开标签创建输入框
			 */
			openLabelDlog () {
				this.$refs.labelDlog.open()
			},
			/**
			 * 添加标签
			 * @param {Object} name
			 */
			addLabel (name) {
				let v = this
				labelApi.addLabel({name: name}).then(res => {
					res.id = res.id.toString()
					res.check  = true
					v.labels.push(res)
					uni.showToast({
						title: '创建成功'
					})
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "none"
					})
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
		width: 750upx;
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
	
	.diary-title-input-on {
		border: 0.5upx solid #EFEFF4;
		box-shadow: 1upx -1upx 1upx 1upx #CCCCCC inset;
	}
	
	.diary-placeholder {
		color: #D5D5D5;
	}
	
	.diary-edit-content-body {
		padding: 20upx 30upx;
	}
	
	.diary-edit-content-body-text {
		width: 690upx;
		height: 650upx;
	}
	
	.diary-edit-foot {
		position: absolute;
		bottom: 0upx;
		height: 150upx;
		width: 750upx;
		flex-direction: column;
	}
	
	.diary-edit-foot-label {
		height: 50upx;
	}
	
	.diary-edit-foot-menu {
		line-height: 100upx;
		color: #C8C7CC;
		flex-direction: row;
		height: 100upx;
		border-top: 1upx solid #EFEFF4;
	}
	
	.diary-edit-foot-menu-item {
		width: 33%;
		font-size: 30upx;
	}
	
	.diary-edit-foot-menu-item > view  > text {
		width: 100%;
		text-align: center;
	}
	
	.menu-item-hover-view-classify, .menu-item-hover-view-labels {
		height: 400upx;
		width: 250upx;
		flex-direction: column;
		font-size: 25upx;
		background-color: #FFFFFF;
	}
	
	.menu-item-hover-view-classify {
		border-top: 1upx solid #C8C7CC;
		border-right: 1upx solid #C8C7CC;
	}
	
	.menu-item-hover-view-classify text {
		width: 100%;
		text-align: center;
	}
	
	.menu-item-hover-view-classify-list {
		flex-direction: column;
		height: 80%;
		overflow: auto;
	}
	
	.menu-item-hover-view-classify-list-view {
	}
	
	.menu-item-hover-view-classify-list-text {	
	}
	
	.select-classify {
		background-color: #EFEFF4;
		color: #999999;
		box-shadow: 1upx -1upx 1upx 1upx #E0E0E0 inset;
	}
	
	.menu-item-hover-view-labels {
		border: 0.5upx solid #C8C7CC;
	}
	.menu-item-hover-view-labels-list {
		flex-direction: column;
		height: 80%;
		overflow: auto;
	}
	
	.menu-item-hover-view-labels > view  > text {
		width: 100%;
		text-align: center;
	}
	
	.checkbox-label {
		flex-direction: row;
		display: flex;
		padding: 10upx 10upx;
		height: 40upx;
		line-height: 40upx;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
