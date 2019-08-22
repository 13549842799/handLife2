<template>
	<bottom-model ref="checkBoxModel" v-on:close="close">
		<view class="bottom-model-container">
			<view class="bottom-model-title">
				<text>{{title}}</text>
			</view>
			<view class="bottom-model-body">
				<checkbox-group style="width: 100%;" @change="checkboxChange">
					<label class="checkbox-label" v-for="l in list" :key="l[role['id']]">
						<label-img :name="l[role['name']]" size="small"></label-img>
						<view>
							<checkbox :value="l[role['val']].toString()"  :checked="l.check" style="transform:scale(0.7)"/>
						</view>
					</label>
				</checkbox-group>
			</view>
			<slot>
			    <view class="bottom-model-button"><text @tap="tapButton">新增</text></view>
			</slot>
		</view>
	</bottom-model>
</template>

<script>
	import bottomModel from './buttomModel.vue'
	
	import labelImg from './../label-img'
	
	export default {
		components: {
			bottomModel,
			labelImg
		},
		props: {
			title: {
				type: String,
				required: true
			},
			list: {
				type: Array,
				default: () => { return [] }
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
				
			}
		},
		computed: {
			
		},
		methods: {
			open () {
				this.$refs.checkBoxModel.open()
			},
			close (e) {
				this.$refs.checkBoxModel.close()
				this.$emit('close', e)
			},
			/**
			 * 标签的多选框选择事件
			 * @param {Object} val
			 */
			checkboxChange (e) {
				let vals = e.detail.value
				this.$emit('change', vals)
			},
			tapButton () {
				this.$emit('tapButton')
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.bottom-model-container {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	.bottom-model-container > view {
		width: 100%;
	}
	
	.bottom-model-container .bottom-model-title {
		height: 80upx;
		border-bottom: 1upx solid #EFEFF4;
		justify-content: center;
	}
	
	.bottom-model-container .bottom-model-title text {
		height: 80upx;
		line-height: 80upx;
		font-size: 30upx;
		font-weight: 600;
	}
	
	.bottom-model-body {
		height: 340upx;
		overflow: auto;
	}
	
	.checkbox-label {
		flex-direction: row;
		display: flex;
		padding: 10upx 10upx;
		height: 40upx;
		line-height: 40upx;
		overflow: hidden;
		text-overflow: ellipsis;
		justify-content: space-between;
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
</style>
