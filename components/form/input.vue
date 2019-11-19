<template>
	<title-item :title="title" :err="err">
		<input :placeholder="placeholder" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" class="form-input" placeholder-class="form-input-placeholder-class"  />
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
			}
		}
	}
</script>

<style>

.form-input {
	font-size: 35upx;
	border-bottom: 2upx solid #C8C7CC;
	color:  #3299CC;
}

.form-input-placeholder-class {
	color: #EFEFF4;
}
</style>
