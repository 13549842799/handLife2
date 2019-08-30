<template>
	<view class="view-container">
		<view class="account-add">
			<text @tap="addAccount">添加账号</text>
		</view>
		<list-item v-for="l in page.list" :key="l.id" :title="l.source" :val="l.username" :sign="false"></list-item>
	</view>
</template>

<script>
	import {MyPage} from '../../../common/pageUtil.js'
	
	import allAccountApi from '../../../api/allAccount/allAccount.js'
	
	import listItem from '../../../components/list-item.vue'
	
	export default {
		components: {
			listItem
		},
		data() {
			return {
			    page: null
			}
		},
		onLoad() {
            let v = this
			v.page = new MyPage({'searchFunction': allAccountApi.getList})
			
		},
		onReachBottom () { //上拉触底事件监听
			this.page.getNextLine({})
		},
		methods: {
			addAccount () {
				uni.navigateTo({
					url: 'allAccountAdd'
				})
			}
		}
	}
</script>

<style>
    view {
		display: flex;
	}
	
	.account-add {
		width: 100%;
		height: 60upx;
	}
	
	.account-add text {
		width: 100%;
		height: 100%;
		line-height: 60upx;
		text-align: center;
	}
</style>
