<template>
	<view class="content">
		<view class="label-search">
			<view class="label-search-input">
				<input class="label-search-input-input" v-model="name"/>
				<image @tap="searchLabels" src="/static/icon/search.png"></image>
			</view>
		</view>
		<view class="content-label-content">
			<view class="content-label-content-list">
				<list-item v-for="l in list" v-bind:key="l.id">
					<view class="content-label-conent-list-item" @longpress.stop="deleteLabel(l)">
						<text>{{l.name}}</text>
						<view class="label-icon-view" @tap="editLabel(l)">
							<text class="iconfont classify-list-icon">&#xe608;</text>
						</view>
					</view>
				</list-item>
			</view>
		</view>
		<view class="label-add-view">
			<image @tap="addLabel" src="../../../static/icon/add.png"></image>
		</view>
		<inputDlog ref="labelDlog"></inputDlog>
	</view>
</template>

<script>
	
	import labelApi from '../../../api/article/label.js'
	
	import listItem from '../../../components/list-item'
	
	export default {
		components: {
			listItem
		},
		data() {
			return {
				list: [],
				name: ''
			}
		},
		onLoad() {
			let v = this
			labelApi.getLabelsList().then(res => {
				if (res && res.length > 0)
				    v.list = res
			}).catch(err => { console.log(err) })
		},
		methods: {
			addLabel () {
				let v = this
				v.$refs.labelDlog.show({
					title: '添加标签',
					submit: (name) => {
						labelApi.addLabel({
							name: name
						}).then(res => {
							v.list.push(res)
							uni.showToast({
								title: '创建成功'
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
			editLabel (l) {
				let v = this
				v.$refs.labelDlog.show({
					title: '编辑标签',
					data:  l.name,
					submit: (name) => {
						labelApi.editLabel(l.id, name).then(res => {
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
			deleteLabel (l) {
				let v = this
				uni.showModal({
					title: '删除',
					content: '确定删除名为：' + l.name + '的标签吗',
					success: function (r) {
						if (r.confirm) {
							labelApi.delteLabel(l.id).then(res => {
								let index =  v.list.indexOf(l)
								if (index > -1) {
									v.list.splice(index, 1)
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
			},
			searchLabels () {
				let v = this
				labelApi.getLabelsList({name: v.name}).then(res => {
					console.log(res)
					v.list = res
				})
			}
		}
	}
</script>

<style>
	.page,
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
	
    .label-search {
		width: 100%;
		height: 100upx;
		margin-bottom: 30upx;
		flex-direction: row;
	}
	
	.label-search image {
		width: 50upx;
		height: 50upx;
		margin-left: 20upx;
	}
	
	.label-search-input {
		width: 100%;
		padding: 20upx 0;
	}
	
	.label-search-input-input {
		margin-left: 20upx;
		border: 1upx solid #EFEFF4;
		background: #FFFFFF;
		font-size: 30upx;
		color: #DDDDDD;
	}
	
	.content-label-content {
		width: 100%;
		background-color: #FFFFFF;
	}
	
	.content-label-content-list {
		width: 100%;
		height: 900upx;
		flex-direction: column;
		overflow: auto;
	}
	
	.content-label-conent-list-item {
		width: 100%;
		justify-content: space-between;
	}
	
	.label-icon-view {
		margin-right: 20upx;
	}
	
	.label-add-view {
		width: 100%;
		height: 100upx;
		position: absolute;
		bottom: 0upx;
		left: 0upx;
		background: rgba(0, 0, 0, .2); 
		justify-content: center;
		line-height: 100upx;
	}
	
	.label-add-view image {
		width: 60upx;
		height: 60upx;
		margin-top: 20upx;
	}
</style>
