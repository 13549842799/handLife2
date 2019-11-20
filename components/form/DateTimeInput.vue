<template>
	<title-item :title="title" :err="err">
		<view class="form-date-input">
			<picker :mode="type" :value="value"  @change="bindTimeChange">
				<input v-bind:value="value" />
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
		},
		methods: {
			bindTimeChange(event) {
                let val = event.detail.value
				this.$emit('input', val)
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
