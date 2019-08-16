<template>
	<bottom-model ref="bmodel" v-on:close="closeBottomModel">
		<view class="bottom-model-picker">
			<view class="bottom-model-title">
				<text>{{title}}</text>
			</view>
			<view class="bottom-model-classify-body">
				<picker-view class="classify-picker" indicator-class="classify-selector" @change="classifyChange" :value="classifyIndex">
					 <picker-view-column>
						 <view class="bottom-model-classify-body-item" v-for="c in classify" :key="c.id">{{c.name}}</view>
					 </picker-view-column>
				</picker-view>
			</view>
			<view class="bottom-model-add"><text @tap="openClassifyDiog">新增</text></view>
		</view>
	</bottom-model>
</template>

<script>
	import bottomModel from 'buttomModel.vue'
	
	export default {
		components: {
			bottomModel
		},
		props: {
			title: {
				type: String,
				require: true
			},
		},
		data () {
			
		},
		methods: {
			closeBottomModel (e) {
				this.$refs.bmodel.close()
				this.$emit('close', e)
			}
		}
	}
</script>

<style>
	.bottom-model-picker {
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
