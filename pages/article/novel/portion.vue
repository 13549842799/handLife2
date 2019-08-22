<template>
	<view class="view-container">
		<view class="portion-content-list">
			<view class="portion-list-item" @tap="goToEdit(p.id)" v-for="p in portions" :key="p.id">
				<text>{{p.number}}.{{p.title}}</text>
				<text style="font-family: texticons;">&#xe65e;</text>
			</view>
		</view>
		<bottom-model ref="addPortion" v-on:close="closeBottom">
			<view class="portion-add-title"><text>要创建一个分卷才能开始你的章节喔！</text></view>
			<view class="portion-add-content">
				<text>分卷名称：</text>
				<input v-model="newPortion.title" placeholder="快开始你的分卷标题吧!" placeholder-class="common-placeholder" class="portion-input" />
				<text>分卷简介：</text>
				<textarea v-model="newPortion.content" placeholder="快补充你的分卷简介吧!" placeholder-class="common-placeholder" :maxlength="80"></textarea>
			</view>
			<view class="portion-add-bottom">
				<button type="primary" size="mini" @tap="addPortion()">提交</button>
			</view>
		</bottom-model>
	</view>
</template>

<script>
	import portionApi from '../../../api/article/portion.js'
	
	import bottomModel from '../../../components/model/buttomModel.vue'
	
	import longList from '../../../components/list/LongList.vue'
	
	export default {
		components: {
			bottomModel,
			longList
		},
		data () {
			return {
				novelTitle: null,
				portions: [],
				novelId: null,
				newPortion: {
					novelId: null,
					title: '',
					content: ''
				}
			}
		},
		onLoad (option) {
			let id = option.id
			this.novelTitle = option.title
			uni.setNavigationBarTitle( { title: this.novelTitle} )
			
			let v = this
			v.newPortion.novelId = id
			v.novelId = id
			portionApi.getPortionsList({'novel': id}).then(res => {
				v.portions = res
			}).catch(err => {
				console.log(err)
			})
		},
		onNavigationBarButtonTap () {
			this.$refs.addPortion.open()
		},
		computed: {
			
		},
		methods: {
			initNewPortion () {
				return {novelId: this.novelId, title: '', content: ''}
			},
			closeBottom (e) {
				this.newPortion = this.initNewPortion()
				this.$refs.addPortion.close()
			},
			addPortion () {
				let v = this
				if (!v.newPortion.title) {
					uni.showToast({ title: '请填写标题', icon: "none" })
					return
				}
				portionApi.addPortion(v.newPortion).then(res => {
					let v = this
					v.portions.push(res)
					v.closeBottom()
					// #ifdef APP-PLUS
					    plus.nativeUI.toast('创建成功');
					// #endif
					// #ifdef H5
					    uni.showToast({ title: '创建成功'})
					// #endif			
				}).catch(err => {
					console.log(err)
				})
			},
			goToEdit (id) {
				uni.navigateTo({
					url: './portionEdit?novelId=' + this.novelId + '&portionId=' + id + '&novel=' + this.novelTitle
				})
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	@font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}
	
	.portion-content-list {
		border-top: 1upx solid #F1F1F1;
		width: 100%;
		flex-direction: column;
		background:#F8F8F8;
		margin-top: 20upx;
	}
	
	.portion-content-list .portion-list-item {
		background: #FFFFFF;
		width: 710upx;
		flex-direction: row;
		justify-content: space-between;
		padding: 20upx;
		margin-bottom: 20upx;
	}
	
	.portion-content-list .portion-list-item text {
		font-size: 35upx;
		font-weight: 800upx;
		color: #0FAEFF;
	}
	
	.portion-add-title {
		width: 100%;
		height: 60upx;
		border-bottom: 1upx solid #E0E0E0;
	}
	
	.portion-add-title text {
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		text-align: center;
		font-size: 30upx;
		font-weight: 700;
	}
	
	.portion-add-content {
		width: 100%;
		margin-top: 20upx;
		flex-direction: column;
	}
	
	.portion-add-content text, .portion-add-content textarea, .portion-input{
		font-size: 30upx;
	}
	
	.portion-add-content text, .portion-add-content textarea, .portion-input{
		margin-top: 20upx;
		margin-left: 20upx;
	}
	
	.portion-input {
		border-bottom: 1upx solid #D5D5D5;
	}
	
	.portion-add-content textarea {
		width: 690upx;
		border: 1upx solid #D5D5D5;
		border-radius: 20upx;
		height: 100upx;
		padding: 10upx;
	}
	
	 .portion-add-bottom {
		 margin-top: 20upx;
		 width: 100%;
		 justify-content: center;
	 }
	
</style>
