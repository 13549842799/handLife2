<template>
	<view class="diary-edit-content">
		<!-- <uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件" :fixed="true" :status-bar="true"></uni-nav-bar> -->
		<view class="diary-edit-content-title">
			<input class="diary-title-input"  :class="{'diary-title-input-on': titleInput}" v-model="diary.title" placeholder="请输入标题" placeholder-class="diary-placeholder" maxlength="50"  @focus="titleInput=true" @blur="titleInput=false"/>
		</view>
		<view>
			<editor id="editor" class="ql-container" :placeholder="placeholder" @ready="onEditorReady"></editor>
		</view>
	</view>
</template>

<script>
	import diaryApi from '../../../api/article/diary.js'
	
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar"
	
	export default {
		components: {
			uniNavBar
		},
		data () {
			return {
				diary: {
					id: null,
					title: '',
					content: ''
				},
				titleInput: false,
				placeholder: '开始输入...'
			}
		},
		onLoad (option) {
			let id = option.id
			let v = this
			if (!id) {
				// 新建日记
				return
			}
			// 编辑日记
			//1.设置导航栏为日记标题
			uni.setNavigationBarTitle({
				title: "编辑"
			})
			uni.showLoading({
				title: '加载中',
				mask: true
			})
			diaryApi.getDiary(id, {
				complete: function () {
					uni.hideLoading()
				}
			}).then(res => {
				v.diary = res
			}).catch(err => {
				console.log(err)
			})
		},
		onNavigationBarButtonTap () {
			console.log("点击了保存")
		},
		methods: {
			onEditorReady() {
                uni.createSelectorQuery().select('#editor').context((res) => {
                    this.editorCtx = res.context
                }).exec()
            },
            undo() {
                this.editorCtx.undo()
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
		width: 100%;
		margin-top: 20upx;
		font-size: 30upx;
		padding: 10upx 20upx;
		border-bottom: 1upx solid #EFEFF4;
	}
	
	.diary-edit-content-title input {
		
	}
	
	.diary-title-input {
		width: 700upx;
	}
	
	.diary-title-input-on {
		border: 0.5upx solid #EFEFF4;
		box-shadow: 1upx -1upx 1upx 1upx #CCCCCC inset;
	}
	
	.diary-placeholder {
		color: #D5D5D5;
	}
	
	.container {
        padding: 10px;
    }

    #editor {
        width: 100%;
        height: 300px;
        background-color: #CCCCCC;
    }
</style>
