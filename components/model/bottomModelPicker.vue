<template>
	<bottom-model ref="bmodel" v-on:close="close">
		<view class="bottom-model-picker">
			<view class="bottom-model-title">
				<text>{{title}}</text>
			</view>
			<view class="bottom-model-body">
				<picker-view class="bottom-picker" indicator-class="picker-selector" @change="pickerChange" :value="indexs">
					 <picker-view-column>
						 <view class="bottom-model-body-item" v-for="l in list" :key="l[role['id']]">{{l[role['name']]}}</view>
					 </picker-view-column>
				</picker-view>
			</view>
			<slot><view class="bottom-model-button"><text @tap="tapButton">{{text}}</text></view></slot>
		</view>
	</bottom-model>
</template>

<script>
	import bottomModel from './buttomModel.vue'
	
	export default {
		components: {
			bottomModel
		},
		props: {
			title: {
				type: String,
				required: true
			},
			text: {
				type: String,
				default: '新增'
			},
			list: {
				type: Array,
				default: () => {return []}
			},
			role: {
				type: Object,
				default: () => {
					return {id: "id", name: "name", val: "val"}
				},
				validator: val => {
					return val.id && val.name && val.val
				}
			}
		},
		data () {
			return {
				obj: {},
				indexs: [-1]
			}
		},
		computed: {
			current () {
				return this.list.indexOf(this.indexs[0])
			}
		},
		methods: {
			open () {
				this.$refs.bmodel.open()
			},
			close (e) {
				this.$refs.bmodel.close()
				this.$emit('close', e)
			},
			/**
			 * 当改变选择时触发
			 * @param {Object} e
			 */
			pickerChange (e) {
				this.$emit('MyChange', e.detail.value[0])
			},
			/**
			 * 初始化当前选择,设置默认值
			 * @param {Object} index 下标
			 */
			initVal (index) {
				this.indexs = [index ? index : -1]
			},
			tapButton () {
				this.$emit('action', this.current)
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.bottom-model-picker {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.bottom-model-picker > view {
		width: 100%;
	}
	
	.bottom-model-title{
		height: 80upx;
		justify-content: center;
		border-bottom: 1upx solid #EFEFF4;
	}
	
	.bottom-model-title text{
		font-size: 30upx;
		font-weight: 600;
		height: 80upx;
		line-height: 80upx;
	}
	
	.bottom-model-body {
		height: 340upx;
	}
	
	.bottom-model-body-item {
		text-align: center;
		line-height: 70upx;
		justify-content: center;
	}
	
	.bottom-model-button {
		height: 80upx;
		justify-content: center;
	}
	
	.bottom-model-button text {
		width: 120upx;
	    height: 50upx;
		line-height: 50upx;
		border-radius: 10upx;
		box-shadow: 1upx 5upx 1upx #E0E0E0;
		font-size: 20upx;
		background: #FFD700;
		text-align: center;
		margin-top: 10upx;
	}
	
	.picker-selector {
		height: 80upx;
		width: 100%;
		font-size: 25upx;
		line-height: 80upx;
	}
	
	.bottom-picker {
	    width: 100%;
	    height: 340upx;
	}
</style>
