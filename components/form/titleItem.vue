<template>
	<view class="form-title-item">
		<text v-if="title" class="title">{{title}}</text>
		<view class="form-content">
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String
		}
	},
	data() {
		return {}
	}
}
</script>

<style>
.form-title-item {
	width: 100%;
	flex-direction: column;
	margin-top: 20rpx;
	display: flex;
}

.form-title-item .title {
	font-size: 35rpx;
	margin-bottom: 20rpx;
	color: #CDCDCD;
}
.form-title-item .form-content {
    display: flex;
	flex-direction: column;
	width: 100%;
}
</style>
