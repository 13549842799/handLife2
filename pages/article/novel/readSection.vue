<template>
	<view class="view-container read-page">
		<view class="status_bar">{{title}}</view>
		
	</view>
</template>

<script>
	import sectionApi from '../../../api/article/section.js'
	
	export default {
		data () {
			return {
				section: {
					title: '标题'
				}
			}
		},
		onLoad (id) {
			
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	.read-page {
		background-color: #FFFFFF;
	}
	.status_bar {
		height: var(--status-bar-height);  
		width: 100%;  
		position: fixed;  
		background-color: #F8F8F8;  
		top: 0;  
		z-index: 999;  
	}
</style>
