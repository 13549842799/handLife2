<template>
	<view class="form-radio">
		<text v-if="title" class="title">{{title}}</text>
		<text style="color: red;width: 100%;font-size: 25upx;line-height: 25upx;text-align: center;">{{obj === null ? '' : obj.name}}</text>
		<view class="form-radio-dot">
			<radio-group @change="radioChange">
					<view class="radio-view" v-for="(item, index) in items" :key="index" :style="{width: cWidth(index)}" >
						<view v-show="index != 0" :style="{background: curIndex >= index ? '#0FAEFF' : '#EBEDF0'}"></view>
						<radio :value="cString(item.value)" class="radio"  :checked="cString(item.value) === valueStr"/><!--宽57rpx -->
						<view v-show="index != lastIndex" :style="{background: curIndex -1 >= index ? '#0FAEFF' : '#EBEDF0'}"></view>
					</view>					
			</radio-group>
		</view>
		<text class="tip" v-if="tip">{{tip}}</text>
		<input ref="ditInput" v-bind:value="value" style="display: none;" />
	</view>
</template>

<script>

	export default {
		components: {
		},
		props: {
			title: {
				type: String
			},
			items: {
				type:Array
			},
			tip: {
				type: String
			},
			value: {
				type: Number,
				default: 1
			}
		},
		data() {
			return {
				//curIndex: this.items.findIndex(o=> { return o.value === this.value}),
				obj: this.items.find(o=> { return o.value === this.value }),
				//valueStr: String(this.value)
			}
		},
		computed: {
			lastIndex () {	
				return this.items.length - 1
			},
			curIndex () {
				return this.items.findIndex(o=> { return o.value === this.value})
			},
			valueStr () {
				return String(this.value)
			}
		},
		methods: {
			radioChange(evt) {
				for (let i = 0; i < this.items.length; i++) {
					if (String(this.items[i].value) === evt.target.value) {
						//this.curIndex = i;
						this.obj = this.items[i]					
						this.$emit('input', this.items[i].value)
						break;
					}
				}
			},
			cWidth(i) {
				let realLen = 710 - i*57
				let len = (1/this.items.length)*realLen;
				len = i === 0 || i === this.lastIndex ? len/2 : len;
				len = len + 57
				return len + 'rpx'
			},
			cString(s) {
				return s === null || s ===  undefined ? '' : String(s)
			}
		}
	}
</script>

<style>
view {
	display: flex;
}

.form-radio {
	width: 100%;
	flex-direction: column;
	margin-top: 20rpx;
}

.form-radio .title{
	font-size: 35rpx;
	margin-bottom: 20rpx;
	color: #CDCDCD;
}

.form-radio .tip {
	font-size: 30rpx;
	margin-top: 15rpx;
	color: #EFEFF4;
	width: 100%;
	text-align: center;
}

.form-radio-dot {
	flex-direction: row;
	width: 100%;
}

.form-radio-dot radio-group {
	display: flex;
	flex-direction: row;
	width: 710rpx;
	height: 60rpx;
	line-height: 60rpx;
	justify-content: center;
}

.radio-view {
	width: 100%;
	display: inline-flex;
	flex-direction: row;
	height: 53rpx;
	line-height: 53rpx;
	justify-content: center;
	align-items: center;
}

.radio {
	margin: 10rpx;
}

.radio-view view {
	background: #0FAEFF;
	height: 5rpx;
	flex: 1;
	position: relative;
	border: 0 solid #000;
	box-sizing: border-box;
}
</style>
