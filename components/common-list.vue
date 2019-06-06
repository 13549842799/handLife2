<template>
	<view class="common-list-content">
		<view class="common-list-item" v-for="l in list" v-bind:key="l[rules['id']]">
			<view class="common-list-item-title">
				<view>
					<text>{{l[rules["title"]]}}</text>
				</view>
				<view class="common-list-item-title-right">
					<slot v-bind:sign = "{id: l[rules['id']], title: l[rules['title']]}"></slot>
				</view>
			</view>
			<view class="common-list-item-content">
				<rich-text :nodes="getFirstP(l[rules['content']])"></rich-text>
			</view>
			<view class="common-list-item-foot">
				<text>{{l[rules['date']]}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import htmlParser from './../common/html-parser.js'
	
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return []
				}
			},
			mapper: {
				type: Object,
				required: false
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			/**
			 * 通过引入的html处理函数把字符串转化成html节点数组
			 * @param {Object} html html字符串
			 */
			parseHtml (html) {
				return htmlParser(html)
			},
			/**
			 * 获取html中第一个p标签的html节点数组
			 * @param {Object} html
			 */
			getFirstP (html) {
				let index_begin = html.indexOf("<p>")
				let index_end = html.indexOf("</p>")
				return this.parseHtml(html.substring(index_begin, index_end + 4))
			}
		},
		computed: {
			rules () {
				let obj = {
					title: 'title',
					content: 'content',
					date: 'date',
					id: 'id'
				}
				if (this.mapper == null) {
					return obj
				}
				for (let key in this.mapper) {
					obj[key] = this.mapper[key]
				}
				return obj
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
    .common-list-content {
		width: 100%;
	}
	
	.common-list-item {
		width: 100%;
		flex-direction: column;
		border-bottom: 0.5upx solid #F2F2F2;
	}
	
	.common-list-item > view {
		flex-direction: row;
		padding: 10upx 30upx;
	}
	
	.common-list-item-title {
		font-size: 40upx;
		font-family: "SimHei";
		justify-content: space-between;
		height: 60upx;
		line-height: 60upx;
	}
	
	.common-list-item-title-right {
		width: 60%;
		flex-direction: row-reverse;
	}
	
	.common-list-item-content {
		font-size: 28upx;
	}
	
	.common-list-item-foot {
		font-size: 25upx;
	}
	
</style>
