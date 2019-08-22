<template>
	<view class="view-container">
		<view class="portion-edit-form">
			<text>分卷名称：</text>
			<input v-model="portion.title" placeholder="请输入分卷名" placeholder-class="common-placeholder" class="portion-edit-input"/>
			<text>分卷简介：</text>
			<textarea class="textarea-style" v-model="portion.content" placeholder="快补充你的分卷简介吧!" placeholder-class="common-placeholder" :maxlength="80"></textarea>
			<view style="margin:20upx 0;">
				<button @tap="submitPortion" size="mini" type="primary">提交</button>
			</view>
		</view>
		<view class="portion-info">
			<text @tap="goToSectionEdit()">创建新一章</text>
		</view>
		<text>所属章节</text>
		<view class="portion-section-list">
			<text v-for="s in portion.sections" :key="s.id" @tap="goToSectionEdit(s.id)" @longpress="deleteSection(s.id, s.title)">{{s.title}}</text>
		</view>
		<image @tap="backToTop" class="toUp-img" src="/static/icon/toUp.png"></image>
	</view>
</template>

<script>
	import portionApi from '../../../api/article/portion.js'
	
	import sectionApi from '../../../api/article/section.js'
	
	import objUtil from '../../../common/objUtil.js'
	
	
	export default {
		data () {
			return {
				novelTitle: null,
				portion: {
					title: '',
					content: '',
					sections: []
				}
			}
		},
		onLoad (option) {
			this.novelTitle = option.novel
			let novelId = option.novelId, portionId = option.portionId
			let v = this
			
			portionApi.getPortionsList({'novel': novelId, 'portion': portionId}).then(res => {
				if (res && res.length === 1) {
					v.portion = res[0]
				} 
			}).catch(err => {console.log(err)})
		},
		methods: {
			backToTop () {
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
			submitPortion () {
				let v = this
				if (!v.portion.title) {
					uni.showToast({ title: '分卷不能没有名称!', icon: "none" })
					return
				}
				let subObj = objUtil.newfilterObject(this.portion, ['sections'], [])
				portionApi.addPortion(subObj).then(res => {
					objUtil.copyProperty(v.portion, res, ['sections'])
					uni.showToast({ title: '保存成功!'})
				}).catch(err => { console.log(err) })
			},
			goToSectionEdit (id) {
				uni.navigateTo({
					url: 'section?novel=' + this.novelTitle + '&portion=' + this.portion.title + (id ? '&id=' + id : '')
				})
			},
			deleteSection (id, title) {
				let v = this
				//#ifdef APP-PLUS
				plus.nativeUI.confirm("Are you sure ready?", function(e){
					console.log("Close confirm: "+e.index);
				});
				//#endif
				sectionApi.deleteSection(id).then(res => {
					let index = v.portion.sections.findIndex(o => { return o.id === id })
				    v.portion.sections.splice( index, 1)
					uni.showToast({ title: '章节《'+ title +'》删除成功' })
				}).catch(err => { console.log(err) })
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
    text {
		font-size: 35upx;
	}
	
	.portion-edit-form {
		width: 710upx;
		flex-direction: column;
		border-bottom: 1upx solid #EFEFF4;
	}
	
	.portion-edit-form text, .portion-edit-form .textarea-style, .portion-edit-input {
		margin-top: 20upx;
		margin-left: 20upx;
	}
	
	.portion-edit-input {
		border-bottom: 1upx solid #D5D5D5;
	}
	
	.portion-edit-form .textarea-style {
		width: 690upx;
		border: 1upx solid #D5D5D5;
		border-radius: 20upx;
		height: 100upx;
		padding: 10upx;
	}
	
	.portion-info {
		width: 710upx;
		padding: 20upx;
	}
	
	.view-container > text {
		font-size: 25upx;
		color: #C0C0C0;
		width: 100%;
		border-top: 1upx solid #DD524D;
		border-bottom: 1upx solid #DD524D;
		text-align: center;
		margin-top: 20upx;
	}
	
	.portion-section-list {
		width: 100%;
		flex-direction: column;
		margin-top: 20upx;
	}
	
	.portion-section-list text {
		width: 710upx;
		padding: 0 20upx;
		height: 80upx;
		line-height: 80upx;
		border-bottom: 1upx solid #EFEFF4;
		margin-top: 10upx;
	}
	
	.toUp-img {
		position: fixed;
		width: 70upx;
		height: 70upx;
		bottom: 100upx;
		right: 50upx;
		border: 1upx solid #C7C7CD;
		border-radius: 150upx;
	}
</style>
