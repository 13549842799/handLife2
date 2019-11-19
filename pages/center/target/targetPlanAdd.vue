<template>
	<view class="view-padding-container">
		<input-item title="计划名称" placeholder="请为你的计划命名吧" v-model="plan.name" ></input-item>
		<text-area-item title="计划内容-在这个计划中,你需要完成的是什么!" placeholder="请填写你的动作吧" v-model="plan.content"></text-area-item>
	</view>
</template>

<script>
	import inputItem from '../../../components/form/input'
	import textAreaItem from '../../../components/form/textarea'
	
	export default {
		components: {
			inputItem,
			textAreaItem
		},
		data () {
			return {
				plan: {}
			}
		}
	}
</script>

<style>
</style>
