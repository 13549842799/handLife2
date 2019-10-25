<template>
	<view class="view-container-target-add">
		<text-area-item v-model="target.cause" title="原因" placeholder="请来明确你设立此目标的原因吧!"></text-area-item>
		<text-area-item v-model="target.content" title="目标的内容" placeholder="你要实现的目标是什么!"></text-area-item>
		<text-area-item v-model="target.finishSign" title="完成的标志" placeholder="怎样才算完成呢？"></text-area-item>
		<dot-radio current="1" :items="levelItems" title="目标等级" tip="请选择对应的目标等级吧" v-model="target.level" ></dot-radio>
	</view>
</template>

<script>
	import inputItem from '../../../components/form/input';
	import textAreaItem from '../../../components/form/textarea'    
	import dotRadio from '../../../components/form/dotRadio'
    
		
	export default {
		components: {
			inputItem,
			textAreaItem,
			dotRadio
		},
		data () {
			return {
				target: {
					cause: '',
					content: '',
					finishSign: '',
					level: 1
				},
				levelItems: [{name: '远期目标', value: 1}, {name: '近期目标', value: 2},{name: '紧急目标', value: 3},{name: '中期目标', value:5}]
			}
		}
	}
</script>

<style>
view {
	display: flex;
}
.view-container-target-add {
	width: 700upx;
	padding: 0 25upx;
	flex-direction: column;
}
</style>
