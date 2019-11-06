<template>
	<title-item :title="title" :err="err">
		<view class="label-radio-list">
			<text v-for="(i, index) in items" :key="i.val" :class="{'label-radio-checked': checked === i.val}" @click="checkSelf" :id="index">{{i.label}}</text>
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
				require: false
			},
			placeholder: {
				type:String,
				require: false
			},
			defaultVal: {
				type:[String,Number],
				require: false
			},
			items: {
				type: Array,
				require: true,
				validator: function (val) {
					return val.length > 0
				}
			},
			err: {
				type: String,
				require: false
			}
		},
		data() {
			return {
				checked: this.defaultVal === null || this.defaultVal === undefined ? this.items[0].val : this.defaultVal
			}
		},
		methods: {
			checkSelf(e) {
				let val = this.items[e.target.id].val
				this.checked = val
				this.$emit('change', val)
			}
		}
	}
</script>

<style>
.label-radio-list {
	display: flex;
	flex-direction: row;
}

.label-radio-list text {
	font-size: 30rpx;
	margin-right: 30rpx;
	padding: 10rpx 20rpx;
	font-weight: 600;
}

.label-radio-checked {
	border-radius: 10rpx;
	background: #EBEDF0;
	color: #87CEFA;
}
</style>
