<template>
	<title-item :title="title" :err="err">
		<view class="form-date-input">
			<picker :mode="type" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
			    <view class="uni-input">{{time}}</view>
			</picker>
		</view>		
	</title-item>
</template>

<script>
	import titleItem from './titleItem.vue'
	
	export default {
		components: {
		    titleItem
		},
		props: {
			title: {
				type: String,
				require: true
			},
			placeholder: {
				type:String
			},
			value: {
				type:String,
				require: true
			},
			err: {
				type: String,
				require: false
			},
			type: {
				type: String,
				default: 'date',
				validator: function (value) {
					return value === 'date' || value === 'time'
				}
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style>
	.form-date-input {
		font-size: 35upx;
		border-bottom: 2upx solid #C8C7CC;
		color:  #3299CC;
		width: 100%;
	}
</style>
