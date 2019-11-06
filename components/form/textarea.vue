<template>
	<title-item :title="title" :err="err">
		<textarea class="form-textarea" :placeholder="placeholder" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" placeholder-class="form-textarea-placeholder-class" :auto-height="true"></textarea>
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

.form-textarea {
	font-size: 35upx;
	border-bottom: 2upx solid #C8C7CC;
	color:  #3299CC;
	width: 100%;
}

.form-textarea-placeholder-class {
	color: #EFEFF4;
}

</style>
