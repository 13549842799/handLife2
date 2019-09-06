<template>
	<view class="view-container">
		<text class="section-portion-title">分卷:&nbsp;&nbsp;&nbsp;{{portionTitle}}</text>
		<view class="section-content">
			<view class="section-title-content">
				<text>最新章</text>
				<input v-model="section.title" placeholder="快起一个有趣的标题吧!" placeholder-class="common-placeholder" class="section-title" :adjust-position="false"/>
			</view>
		</view>
		<textarea v-model="section.content" class="section-content-edit"  placeholder="来开始你新的故事!" placeholder-class="common-placeholder" maxlength="12000" :adjust-position="false" @linechange="lineChange"></textarea>
		<view class="section-other-content">
			<view class="section-other-content-image" v-for="(f, index) in section.files" :key="index">
				<text @tap="previewImage(1, index)">{{f.name}}</text>
				<text @tap="delImage(f.id)" style="color: #0FAEFF;">删除</text>
			</view>
			<view class="section-images-name-save" v-show="tempFile.path !== ''">
				<input v-model="tempFile.name"  placeholder="请编辑图片名称" placeholder-class="common-placeholder"/>
				<button @tap="saveImage" type="primary" size="mini" style="height: 40upx;line-height: 40upx;margin: 0;">保存</button>
			</view>
			<text v-show="section.remark !== '' && section.remark !== null" style="width: 100%;font-size: 25upx;overflow: hidden;text-overflow: ellipsis;color: red;margin-top: 20upx;border-top: 1upx solid #F1F1F1;">备注:&nbsp;&nbsp;{{section.remark}}</text>
		</view>
		<text class="wordNum-section">{{curWordNum}}/12000</text>
		<view class="section-bottom">
			<text style="margin-right: 80upx;" @tap="addImage">插入图片</text>
			<text style="margin-left: 80upx;" @tap="openRemark">备注</text>
		</view>
		<modal-view :hidden.sync='remarkVisible' @confirm="confirmSureResult">
			<view slot='title' style="width: 100%;">
				<text style="width: 100%;text-align: center;font-size: 40upx;font-weight: 800;padding: 20upx 0;">备注</text>
			</view>
			<view slot='text' style="padding: 30upx; height: 200upx; justify-content: center; align-items: center;">
				<textarea v-model="tempRemark" style="width: 100%;border: 1upx solid #F1F1F1;height: 160upx;padding: 10upx;border-radius: 10upx;"></textarea>
			</view>
		</modal-view>
	</view>
</template>

<script>
	import sectionApi from '../../../api/article/section.js'
	
	import uploadApi from '../../../api/upload.js'
	
	import objUtil from '../../../common/objUtil.js'
	
	import inputDlog from '../../../components/inputDlog'
	
	import modalView from '../../../components/x-modal/x-modal.vue'
	
	export default {
		components: {
			inputDlog,
			modalView
		},
		data () {
			return {
				novelTitle: null,
				portionTitle: null,
				section: {
					portionId: null,
					title: '',
					content: '',
					remark: '',
					files: []
				},
				fileList: [],
				tempFile: {
					name: '',
					path: ''
				},
				fileDelIds: [],
				fileAddIds: [],
				remarkVisible: true,
				tempRemark: ''
			}
		},
		onLoad (option) {
			let id = option.id
			this.novelTitle = option.novel
			this.portionTitle = option.portion
			uni.setNavigationBarTitle( { title: this.novelTitle} )
			if (!id) {
				this.section.portionId = option.portioinId
				return
			}
			let v = this
			sectionApi.getSection(id).then(res => {
				v.section = res
				v.fileList = v.section.files
			}).catch(err => { console.log(err) })
		},
		onNavigationBarButtonTap () {
			let v = this
			let title = v.section.title
			if (title === null || title === undefined || title.trim() === '') {
				uni.showToast({title: '必须有标题',icon: "none"})
				return
			}
			/* let content = v.section.content
			if (content === null || content === undefined || content.trim() === '' || content.length < 500) {
				uni.showToast({title: '内容不能少于500字',icon: "none"})
				return
			} */
			v.section.delImagesId = v.fileDelIds.toString()
			v.section.addImagesId = v.fileAddIds.toString()
			sectionApi.saveSection(v.section).then(res => {
				uni.showToast({title: '保存成功'})
			}).catch (err => {
				
			})
		},
		computed: {
			curWordNum () {			
				return this.section.content.replace(' ', '').length + '字'
			}
		},
		methods: {
			/**
			 * 选择图片
			 */
			addImage () {
				let v = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						v.tempFile.name = ''
						v.tempFile.path = res.tempFilePaths[0]
				    }
				});
			},
			/**
			 * 保存已被编辑名称的图片
			 */
			saveImage () {
				let v = this
				if (v.tempFile.name.trim() === '' || v.tempFile.name === undefined) {
					uni.showToast({title: '请为图片编辑名称'})
					return
				}
				let tf = objUtil.newObj(v.tempFile)
				v.tempFile.name = ''
				v.tempFile.path = ''
				uploadApi.uploadFile({
					'data': {'name': tf.name, 'relevance': 4},
					'name': tf.name,
					'path': tf.path
				}).then(res => {
					v.section.files.push(res)
					v.fileAddIds.push(res.id)
				}).catch(err => { console.log(err) })
			},
			previewImage (type, index) {
                if (type !== 1 && type !==2) {
					return
				}
				let path = type === 1 ? this.section.files[index].path : this.temFiles[index].path
				// 预览图片
				uni.previewImage({
					current: 0,
					urls: [path],
					longPressActions: {
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			delImage (id) {
				let index = this.section.files.findIndex(o => { return o.id === id })
				this.fileDelIds.push(id)
				this.section.files.splice(index, 1)
			},
			openRemark () {
				this.remarkVisible = false
				this.tempRemark = this.section.remark
				console.log(this.remarkVisible)
			},
			confirmSureResult () {
				this.section.remark = this.tempRemark
			},
			lineChange (e) {}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.section-portion-title, .section-title {
		width: 750upx;
	}
	
	.section-content, .section-content-edit, .section-other-content {
		width: 710upx;
		padding: 20upx;
	}

	.section-portion-title {
		height: 50upx;
		line-height: 50upx;
		font-size: 35upx;
		font-weight: 800;
		color: #C7C7CD;
		text-align: center;
	}
	
	.section-title-content {
		width: 100%;
	}
	
	.section-content {
		flex-direction: row;
		border-bottom: 1upx solid #F1F1F1;
	}
	.section-content text {
		font-size: 32upx;
		
	}
	.section-title {
		text-align: center;
		width: 70%;
		margin-left: 20upx;
		font-size: 30upx;
	}
	
	.section-content-edit {
		height: 800upx;
		font-size: 30upx;
		line-height: 50upx;
	}
	
	.wordNum-section {
		position: fixed;
		bottom: 130upx;
		right: 20upx;
		font-size: 25upx;
		color: #EFEFF4;
	}
	
	.section-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100upx;
		justify-content:center;
		border-top: 1upx solid #F1F1F1;
	}
	
	.section-bottom > text {
		font-size: 30upx;
		height: 100upx;
		line-height: 100upx;
	}
	
	.section-other-content {
		flex-direction: column;
	}
	
	.section-other-content-image {
		flex-direction: row;
		width: 100%;
	}
	
	.section-other-content-image text {
		font-size: 30upx;
		margin-right: 20upx;
	}
	
	.section-other-content .section-images-name-save {
		flex-direction: row;
		justify-content: space-between;
	}
	
	.section-images-name-save input {
		border-bottom: 1upx solid #F1F1F1;
	}
</style>
