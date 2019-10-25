<template>
	<view class="form-textarea">
		<text>{{title}}</text>
		<textarea :placeholder="placeholder" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" placeholder-class="placeholder-class" :auto-height="true"></textarea>
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
.form-textarea {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 10upx 0;
	margin-top: 20upx;
}

.form-textarea text {
	font-size: 35upx;
	margin-bottom: 20upx;
	color: #CDCDCD;
	/* text-align-last: justify; */
}

.form-textarea textarea {
	font-size: 35upx;
	border-bottom: 2upx solid #C8C7CC;
	color:  #3299CC;
	width: 100%;
}

.form-textarea .placeholder-class {
	color: #EFEFF4;
}

</style>
