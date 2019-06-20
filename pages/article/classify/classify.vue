<template>
	<view class="content">
		<view class="classify-select">
			<view>
				<view class="diary-pos" @tap="selectClassify(1)" :class="{'classify-select-selected': diarySelect}">
					<image src="../../../static/icon/article/diary.png"></image>
					<text>日记</text>
				</view>
			</view>
			<view>
				<view class="finalreport-pos" @tap="selectClassify(2)" :class="{'classify-select-selected': finalreportSelect}">
					<image src="../../../static/icon/article/finalreport.png"></image>
					<text>总结</text>
				</view>
			</view>
			<view>
				<view class="inspiration-pos" @tap="selectClassify(3)" :class="{'classify-select-selected': inspirationSelect}">
					<image src="../../../static/icon/article/Inspiration.png"></image>
					<text>灵感</text>
				</view>
			</view>
			<view>
				<view class="novel-pos" @tap="selectClassify(4)" :class="{'classify-select-selected': novelSelect}">
					<image src="../../../static/icon/article/novel.png"></image>
					<text>小说</text>
				</view>
			</view>
		</view>
		<view class="content-classify-conent">
			<view class="content-classify-conent-list">
				<!-- 此处不能直接使用二维数组，需要使用计算属性直接获取对应的数组 -->
				<list-item v-for="(l, index) in currentList" v-bind:key="index">
					<view class="content-classify-conent-list-item" @longpress.stop="deleteClassify(l)">
						<text>{{l.name}}</text>
						<view class="classify-icon-view" @tap="editClassify(l)">
							<text class="iconfont classify-list-icon">&#xe608;</text>
						</view>
					</view>
				</list-item>
			</view>
		</view>
		<view class="classify-add-view">
			<image @tap="addClassiofyModel" src="../../../static/icon/add.png"></image>
		</view>
		<inputDlog ref="addDlog"></inputDlog>
		<inputDlog ref="editDlog"></inputDlog>
	</view>
</template>

<script>
	import classifyApi from '../../../api/article/classify.js'
	
	import listItem from '../../../components/list-item'
	
	const fieldArr = ['finalreportList', 'inspirationList', 'diaryList', 'novelList']
	
	export default {
		components: {
			listItem
		},
		data () {
			return {
				current: 1,
				list: []
			}
		},
		onLoad() {
			let v = this
			//加载默认类型的分类
			classifyApi.getClassifies({childType: v.current}).then(res => {
				let ls = res === null || res === undefined || res.length === 0 ? [] : res
				v.list.push(ls)
			}).catch(err => { console.log(err) })
		},
		methods: {
			addClassiofyModel () {
				let v = this
				v.$refs.addDlog.show({
					title: '请输入分类名',
					placeHolder: '分类名的长度不得大于9',
					submit: (name) => {
						classifyApi.addClassify({
							name: name,
							childType: v.current
						}).then(res => {
							v.list[v.current - 1].push(res)
							uni.showToast({
								title: '创建分类成功'
							})
						}).catch(err => { 
							uni.showToast({
								title: err.message,
								icon:'none'
							})
						})
					}
				})
			},
			selectClassify (type) {
				let v = this
				v.current = type
				if (!v.list[type]) {
					classifyApi.getClassifies({childType: v.current}).then(res => {
						let temp = [...v.list]
						temp[type - 1] =  res === null || res === undefined || res.length === 0 ? [] : res
						v.list = temp
					}).catch(err => { console.log(err) })
				}
			},
			/**
			 * 打开i编辑分类弹窗
			 * @param {Object} l
			 */
			editClassify (l) {
				let v = this
				this.$refs.editDlog.show({
					title: '编辑分类名',
					placeHolder: '分类名的长度不得大于9',
					data: l.name,
					submit: (name) => {
						classifyApi.editClassify(l.id, v.current, name).then(res => {
							l.name = name
							uni.showToast({
								title: '编辑成功'
							})
						}).catch(err => { 
							uni.showToast({
								title: err.message,
								icon: 'none'
							})
						})
					}
				})
			},
			/**
			 * 打开删除分类弹窗
			 * @param {Object} id
			 * @param {Object} name
			 */
			deleteClassify (l) {
				let v = this
				uni.showModal({
					title: '删除',
					content: '确定删除名为：' + l.name + '的分类吗',
					success: function (r) {
						if (r.confirm) {
							classifyApi.deleteClassify(l.id).then(res => {
								console.log('成功')
								let index =  v.list[v.current - 1].indexOf(l)
								if (index > -1) {
									v.list[v.current - 1].splice(index, 1)
									uni.showToast({
										title: '删除成功'
									})
								}
							}).catch(err => { console.log(err) })
						} else if (r.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
		},
		computed: {
			diarySelect () {
				return this.current === 1
			},
			finalreportSelect () {
				return this.current === 2
			},
			inspirationSelect () {
				return this.current === 3
			},
			novelSelect () {
				return this.current === 4
			},
			currentList () {
				return this.list[this.current - 1]
			}
		}
	}
</script>

<style>
	page,
	view {
		display: flex;
	}
	
	@font-face {font-family: "iconfont";
	  src: url('/static/css/editIcon/iconfont.eot?t=1560924735927'); /* IE9 */
	  src: url('/static/css/editIcon/iconfont.eot?t=1560924735927#iefix') format('embedded-opentype'), /* IE6-IE8 */
	  url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOUAAsAAAAAB5gAAANHAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqCdIJCATYCJAMMCwgABCAFhG0HQxuVBsgOJS3NwABgAAVEBE/7pfN2934QXKIAXeLDHgBULNWdKrCsROMrTIWpMOwqzP2vm/+3TTU8l3xzXYG2gTqcEJ77+Hz6orKJbS6bi89zOb0pfld9y3Jce/pRL8A4oED3wCjhNkhAHkjD2JUXcZpAq2HDWVYWLl8PLoUxKRC3AVUGV8qu1LSGZqEqWVnEe6hpTi+s3wG88z8f/2BsuEhqmTFz7WaBD2b/dL0Joar/dUcuAYrxvGDryJgBCnFS6t+DwvwMpFXR2+prK0VIY6X+/8eXq8ZqpT+8RFSM5nYwAQuJny5bSvAztEYCGVSgeAe8gGz/38jySJqQhWOexF2609e+9e6i2O27q3b1j2nZBaW+W+h6tTcbVe9t3Q3p4y1PC97p3JO2sTddvdg6Y8ju/VX7BvvaN25Qu6rThna2pPhKsfXDKdz+ck8Wwl/3ZTh6dgs9rWeznb0X9NjWLkvuTPUOb3VXaweot7d0Wmb1YWvlxYsdax3OLHkIKexfSIYkdSevTe5OQpYma3zThQMKk4Y4lixuOYbS04Tn4/IS6lPemWaDv6EnaeaEWYkFBdd1abVbUW8MvNH7aMAjRYWplxtKDdycfTv7V4tRt+mPMMz9K3tDTol7mNB2sOI2/uQywWxmhU/x2eSzeBufST6DnQE0bqMzaBqgsSf/Qxv/zHf8v4Yfi/HTvzYLBfwY9Xnejzb2FO2CoPm8A8F/ULTsKKoJNhRZbsv1YLZ6T7mEVtXg7bdDryf9jQOts4TmlIIhaTKErNkIWdgZ1LSZQ6XZPFpNW7S+TR8GidKCKfUAodtBJJ2+Iet2kyzsY9QMeotKdyC02onkHduMRQDPY1Tm1Ec8xSTg1aKK5eI4aF1LVTMss6TK5zZSZgRSZMzI0dnSIhqlbIw5RoE6lnOFKEyLkIXgPBoOa0RnWpB6+Ug/5/rUUaOUsiuN9GoRwJYxlIyjfAiPYkSAlyZKcXtzOPf+tSiVKUzGagQV2Y0oxhAYnBhjpNEtyEX6aCvBtVxiKKAai+MUhILRRBALgZcKm3kNoZcPC6K8uJH8PbK6qUahbkpb/cj5jZHn2wetjL1zpMhRVBcBORoMJHhkzWtGR/BUrdevRVUAAA==') format('woff2'),
	  url('/static/css/editIcon//static/css/editIcon//static/css/editIcon/iconfont.woff?t=1560924735927') format('woff'),
	  url('/static/css/editIcon//static/css/editIcon/iconfont.ttf?t=1560924735927') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
	  url('/static/css/editIcon/iconfont.svg?t=1560924735927#iconfont') format('svg'); /* iOS 4.1- */
	}
	
	.iconfont {
	    font-family: "iconfont" !important;
	    font-size: 16px;
	    font-style: normal;
	    -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
		color: #0FAEFF;
	}
	
	.classify-select {
		height: 180upx;
		border-bottom: 1upx solid #F8F8F8;
		justify-content:space-between;
		background-color: #FFFFFF;
	}
	
	.classify-select > view  {
		width: 25%;
		height: 100%;
		position: relative;
	}
	
	.classify-select > view > view{
		width: 100upx;
		height: 120upx;
		flex-direction: column;
		font-size: 20upx;
		text-align: center;
		position: absolute;
		top: 30upx;
		left: 10upx;
	}
	
	.finalreport-pos {
		top: 20upx;
		left: 20upx;
	}
	
	.classify-select > view  > view > image {
		width: 100%;
		height: 75%;
		border-radius: 150px;
		border: 1upx solid #F8F8F8
	}
	
	.classify-select > view > view > text {
		width: 100%;
	}
	
	/*当被选中时的样式*/
	.classify-select-selected {
		width: 130upx !important;
		height: 160upx !important;
		font-size: 26upx !important;
		top: 10upx !important;
		left: 10upx !important;
	}
	
	.content-classify-conent {
        width: 100%;
		background-color: #FFFFFF;
	}
	
	.content-classify-conent-list {
		width: 100%;
		height: 900upx;
		flex-direction: column;
		overflow: auto;
	}
	
	.content-classify-conent-list-item {
		width: 100%;
		justify-content: space-between;
	}
	
	.classify-icon-view {
		margin-right: 20upx;
	}
	
	.classify-add-view {
		width: 100%;
		height: 100upx;
		position: absolute;
		bottom: 0upx;
		left: 0upx;
		background: rgba(0, 0, 0, .2); 
		justify-content: center;
		line-height: 100upx;
	}
	
	.classify-add-view image {
		width: 60upx;
		height: 60upx;
		margin-top: 20upx;
	}
</style>
