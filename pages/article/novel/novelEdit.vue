<template>
	<view class="n-edit-content">
		<view class="form">
			<view class="form-item">
				<view class="item-label"><text>作品名称</text></view>
				<view class="title-input-view">
					<input class="item-input" v-model="novel.title" placeholder-class="novel-form-placeholder-input" placeholder="请输入作品名称" :adjust-position="false"/>
					<text class="clear-item">X</text>
				</view>
			</view>
			<view class="form-item">
				<view class="item-label"><text>分类</text></view>
				<view @tap="openSelectClassify" style="width: 500upx;">
					<text :style="{color: novel.classify ? '#0FAEFF' : '#DDDDDD'}">{{classifyName}}</text>
				</view>
			</view>
			<view></view>
		</view>
		<view class=""></view>
		<bottom-model ref="classifyModel" v-on:close="closeBottom"></bottom-model>
	</view>
</template>

<script>
	import novelApi from '../../../api/article/novel.js'
	
	import bottomModel from '../../../components/model/buttomModel.vue'
	
	export default {
		components: {
			bottomModel
		},
		data () {
			return  {
				novel: {}
			}
		},
		onLoad (option) {
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
			// #endif
			let id = option.id
			let v = this
		
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
			novelApi.getNovel(id).then(res => {
				v.novel = res			
			}).catch(err => { console.log(err) })
		},
		computed: {
			classifyName () {
				return this.novel.classify ? "" : "请选择分类"
			}
		},
		methods: {
			openSelectClassify () {
				this.$refs.classifyModel.open()
			},
			closeBottom () {
				this.$refs.classifyModel.close()
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
</style>
