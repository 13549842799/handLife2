<template>
	<title-item :title="title">
		<picker mode="date" :value="date" :start="startD" @change="bindDateChange">
			<view class="date-text">{{date}}</view>
		</picker>
	</title-item>
</template>

<script>
	import titleItem from './titleItem.vue'
	
	import dataUtil from './../../common/dataUtil.js'
	import objUtil from './../../common/objUtil.js'
	
	export default {
		components: {
			titleItem
		},
		props: {
			title: {
				type: String
			},
			startDate: {
				type: [String, Date]
			},
			value: {
				type: [String, Date],
				default: function () {
					return dataUtil.dateFormat('yyyy-MM-dd', new Date())
				}
			},
			err: {
				type: String,
				require: false
			}
		},
		computed: {
			valType () {
				return objUtil.isStr(this.value)
			},
			startD() {
				return objUtil.isStr(this.startDate) ? this.startDate : dataUtil.dateFormat('yyyy-MM-dd', this.startDate)
			},
			date() {
				return objUtil.isStr(this.value) ? this.value : dataUtil.dateFormat('yyyy-MM-dd', this.value)
			}
		},
		data () {			
			return {
				curDate: new Date()
			}
		},
		methods: {				
			bindDateChange: function (e) {
				let val = e.detail.value
				if (!this.valType) {
					val = objUtil.returnDate(val)
				}
				this.$emit('change', val)
			}
		}
	}
</script>

<style>
.date-text {
	border-bottom: 2upx solid #C8C7CC;
}
</style>
