<template>
    <view class="container">
		<web-view :src="'/hybrid/html/DiaryEditor.html' + getIdParam"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
			return {
				id: null
			}
        },
		onLoad(option) {
			if (option.id) {
				this.id = option.id
			}
		},
		computed: {
			getIdParam() {
				return this.id !== null ? '?id=' + this.id : ''
			}
		}
    }
</script>

<style>
	
</style>