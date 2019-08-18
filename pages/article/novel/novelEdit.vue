<template>
	<view class="n-edit-content">
		<view class="form">
			<view class="form-item">
				<view class="item-label"><text>作品名称</text></view>
				<view class="title-input-view">
					<input class="item-input" v-model="novel.title" placeholder-class="novel-form-placeholder-input" placeholder="请输入作品名称" :adjust-position="false"/>
					<!-- #ifdef H5 -->
					<text class="clear-item" size="20">X</text>
					<!-- #endif -->
					<!-- #ifdef APP-PLUS -->
					<icon type="clear" @tap="clearTitle"></icon>
					<!-- #endif -->
				</view>
			</view>
			<view class="form-item">
				<view class="item-label"><text>分类</text></view>
				<view @tap="openSelectClassify" style="width: 500upx;">
					<text :style="{color: novel.classify ? '#0FAEFF' : '#DDDDDD'}">{{classifyName}}</text>
				</view>
			</view>
			<view class="form-item">
				<view class="item-label"><text>简介</text></view>
				<view>
					<textarea style="width: 530upx;" v-model="novel.content" :adjust-position="false" placeholder="赶紧来为你的作品填上有趣的简介吧, 但请不要超过300字..."
					    placeholder-class="novel-form-placeholder-input" :maxlength="300">
					</textarea>
				</view>
			</view>
			<view class="form-item">
				<view class="item-label"><text>标签</text></view>
				<view style="width: 530upx;display: block;" @tap="openLabels">
					<template v-if="checkedLabels == null || checkedLabels.length === 0">
						<text style="color: #DDDDDD;">请点击选择...</text>
					</template>
					<template v-else>
						<label-img v-for="l in checkedLabels" :name="l.name" :key="l.id" size="small"></label-img>
					</template>
				</view>
			</view>
			<view class="form-item">
				<view class="item-label"><text>选择封面</text></view>
				<view class="form-image-content">
					<view class="form-image-content-body">
						<image @tap="selectImage" :src="imagePath" ></image>
					</view>
					<view class="form-image-content-text">
						<text style="color: #DD524D;font-size: 25upx;">上传图片大小请不要超过150KB，长宽比为124px*172px</text>
					</view>
				</view>
			</view>
			<view class="form-item">
				<view style="width: 100%;justify-content: center;">
					<button @tap="submitNovel" type="primary" style="height: 50upx; line-height: 50upx;font-size: 30upx;">提交</button>
				</view>
			</view>
		</view>
		<view class=""></view>
		<bottom-model-picker ref="classifyModel" title="小说分类选择" text="新增" :list="classify"
		    v-on:MyChange="classifyChange" v-on:action="addClassify">
		</bottom-model-picker>
		<bottom-model-check-box ref="labelsModel" title="标签选择" text="新增" :list="labels" :role="{id: 'id', name: 'name', val: 'id'}"
		    v-on:change="labelChange">
			<view style="height: 80upx;">
				<input v-model="editLabel"  style="margin: auto 30upx;width: 500upx;color: #8F8F94;font-size: 30upx;"  
				    placeholder="自定义标签" placeholder-class="novel-form-placeholder-input"/> 
				<button @tap="addLabel" style="height: 50upx;margin: auto 0upx;line-height: 50upx;" 
				    size="mini" type="primary">
					{{isNewNovel}}
				</button>
			</view>
		</bottom-model-check-box>
		<inputDlog ref="classifyDlog"></inputDlog>
	</view>
</template>

<script>
	import {
	    mapState,
	    mapMutations
	} from 'vuex'
	
	import novelApi from '../../../api/article/novel.js'
	
	import classifyApi from '../../../api/article/classify.js'
	
	import labelApi from '../../../api/article/label.js'
	
	import bottomModelPicker from '../../../components/model/bottomModelPicker.vue'
	
	import bottomModelCheckBox from '../../../components/model/BottomModelCheckBox.vue'
	
	import inputDlog from '../../../components/inputDlog'
	
	import LabelImg from '../../../components/label-img.vue'
	
	export default {
		components: {
			bottomModelPicker,
			bottomModelCheckBox,
			inputDlog,
			LabelImg
		},
		data () {
			return  {
				novel: {
					title: '',
					content: '',
					classify: null,
					labels: '',
					novelState: 0,
					source: 2
				},
				classify: [],
				labels: [],
				editLabel: '',
				imagePath: '',
				submiting: false
			}
		},
		onLoad (option) {
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
			// #endif
			let id = option.id
			let v = this
			
			classifyApi.getClassifies({'childType': 4}).then(res => {
				this.classify = res
			}).catch (err => { console.log(err) })
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
			//2.加载小说概况
			novelApi.getNovel(id).then(res => {
				v.novel = res
				//2.1 根据小说自己的所选标签通过id匹配总的标签确定是否已被选中，根据是否被选中添加check的值， 选中 true， 没有 false
				/* v.labels.map((label, index) => {
					label.check = v.novel.labelList.some(l => { return l.id.toString() === label.id })
				}) */
				//匹配分类
				v.$refs.classifyModel.initVal(!v.classify ? null : v.classify.findIndex(c => { return c.id === v.diary.classify }))
			}).catch(err => { console.log(err) })
		},
		computed: {
			classifyName () {
				return this.novel.classify && this.novel.classify !== -1 ? 
				    this.classify.find(val => { return val.id === this.novel.classify }).name : "请选择分类"
			},
			checkedLabels () {
				return this.labels.filter(o => { return o.check })
			},
			/**
			 * 当前页面状态 true-新建 false-已有小说，编辑
			 */
			isNewNovel () {
				return this.novel.id === null ? "提交" : "保存"
			}
		},
		methods: {
			...mapMutations({
				'alterListStatus': 'novel/alterStatus'
			}),
			openSelectClassify () {
				this.$refs.classifyModel.open()
			},
			closeBottom () {
				this.$refs.classifyModel.close()
			},
			clearTitle () {
				this.novel.title = ''
			},
			/**
			 * 选择分类触发方法
			 * @param index
			 */
			classifyChange (index) {
				this.novel.classify = this.classify[index].id
			},
			addClassify (obj) {
				this.$refs.classifyModel.close()
				let v = this
				this.$refs.classifyDlog.show({
					title: '请输入分类名',
					placeholder: '分类名不能超过7个字',
					submit: (name) => {
						classifyApi.addClassify( {name: name, childType: 1} ).then(res => {
							v.classify.push(res)
							v.novel.classify = res.id
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
			openLabels () {
				console.log('点击')
				this.$refs.labelsModel.open()
			},
			labelChange (arr) {
				this.novel.labels = arr.toString()
				for (let i = 0; i < this.labels.length; i ++) {
					this.labels[i].check =  arr.findIndex(o => { return o === this.labels[i].id }) !== -1
				}
			},
			addLabel () {
				let v = this
				labelApi.addLabel({name: v.editLabel}).then(res => {
					res.id = res.id.toString()
					res.check  = true
					v.labels.push(res)
					v.editLabel = ''
					uni.showToast({ title: '创建成功' })
				}).catch(err => {
					console.log(err)
					uni.showToast({ title: err.message, icon: "none" })
				})
			},
			/**
			 * 选择封面图片并进行预览
			 */
			selectImage () {
				let v = this
				// 从相册选择6张图
				uni.chooseImage({
				    count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function(res) {
						v.imagePath = res.tempFilePaths[0]
				    }
				});
			},
			/**
			 * 提交表单，保存小说概况
			 */
			submitNovel () {
				let v = this
				if (v.novel.title === null || v.novel.title.trim() === '') {
					uni.showToast({ title: "不能没有作品名称喔！", icon: "none" })
					return;
				}
				if (v.novel.classify === null) {
					uni.showToast({ title: "来为你的作品选择合适的分类吧！", icon: "none" })
					return;
				}
				console.log(v.submiting)
				if (v.submiting) {
					return
				}
				v.submiting = true
				let params = {
					fileName: 'coverImage',
					filePath: v.imagePath,
					data: v.novel
				}
				console.log('准备请求上传接口')
				novelApi.saveNovel(params).then(res => {
					v.submiting = false
					v.novel = res
					uni.showToast({ title: "提交成功！" })
					v.alterListStatus(1)
				}).catch(err => {
					v.submiting = false
					uni.showToast({ title: err.message, icon: "none" })
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.n-edit-content {
		width: 100%;
		overflow: auto;
	}
	
	.n-edit-content .form {
		width: 100%;
		flex-direction: column;
		font-size: 30upx;
	}
	.n-edit-content .form .form-item {
		width: 100%;
		border-bottom: 1upx solid #EFEFF4;
		padding: 20upx 0;
	}
	
	.n-edit-content .form .form-item .item-label {
		width: 120upx;
		margin: 0upx 30upx;
	}
	
	.n-edit-content .form .form-item .item-label text {
		width: 100%;
		font-weight: 700;
		text-align-last: justify;
	}
	
	.n-edit-content .form .form-item .item-input {
		color: #8F8F94;
		width: 500upx;
	}
	
	.novel-form-placeholder-input {
		font-size: 30upx;
		color: #DDDDDD;
	}
	
	.title-input-view {
		position: relative;
	}
	
	.clear-item {
		position: absolute;
		right: -50upx;
	}
	
	.form-image-content {
		width: 560upx;
		height: 350upx;
		flex-direction: row;
	}
	
	.form-image-content .form-image-content-body {
		width: 300upx;
		height: 100%;
	}
	
	.form-image-content .form-image-content-body image {
		width: 248.94upx;
		height: 345upx;
		border: 1px solid #E0E0E0;
	}
	
	.form-image-content .form-image-content-text {
		height: 100%;
		width: 250upx;
	}
</style>
