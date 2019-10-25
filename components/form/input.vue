<template>
	<view class="form-input">
		<text>{{title}}</text>
		<input :placeholder="placeholder" v-bind:value="value" v-on:input="$emit('input', $event.target.value)"  />
	</view>
</template>

<script>
	export default {
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
			}
		}
	}
</script>

<style>
.form-input {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 10upx 0;
	margin-top: 20upx;
}

.form-input text {
	font-size: 35upx;
	margin-bottom: 20upx;
	color: #CDCDCD;
	/* text-align-last: justify; */
}

.form-input input {
	font-size: 35upx;
	border-bottom: 2upx solid #C8C7CC;
	color:  #3299CC;
}
</style>
