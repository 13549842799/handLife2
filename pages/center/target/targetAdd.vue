<template>
	<view class="view-container-target-add">
		<text-area-item v-model="target.cause" title="原因" placeholder="请来明确你设立此目标的原因吧!"></text-area-item>
		<text-area-item v-model="target.content" title="目标的内容" placeholder="你要实现的目标是什么!"></text-area-item>
		<text-area-item v-model="target.finishSign" title="完成的标志" placeholder="怎样才算完成呢？"></text-area-item>
		<dot-radio current="1" :items="levelItems" title="目标等级" tip="请选择对应的目标等级吧" v-model="target.level" ></dot-radio>
		<radio-item @change="typeChange" title="目标类型" :items="typeItems" :defaultValue="typeStr" :dire="true"></radio-item>
		<date-input title="决定完成目标的预期时间吧" startDate="2019-10-25" :value="target.expectFinishTime" @change="dateChange"></date-input>
	    <view style="width: 100%;margin-top: 50rpx;">
			<button type="primary" @tap="submitTarget">提交新目标</button>
		</view>
	</view>
</template>

<script>
	import inputItem from '../../../components/form/input';
	import textAreaItem from '../../../components/form/textarea'    
	import dotRadio from '../../../components/form/dotRadio'
    import radioItem from '../../../components/form/radio'
	import dateInput from '../../../components/form/dateInput.vue'
	
	import objUtil from '../../../common/objUtil.js'
		
	export default {
		components: {
			inputItem,
			textAreaItem,
			dotRadio,
			radioItem,
			dateInput
		},
		computed: {
			typeStr () {
				return String(objUtil.defaultVal(this.target.type, 0))
			}
		},
		data () {
			return {
				target: {
					cause: '',
					content: '',
					finishSign: '',
					level: 1,
					type: 1,
					expectFinishTime: new Date()
				},
				levelItems: [{name: '远期目标', value: 1}, {name: '近期目标', value: 2},{name: '紧急目标', value: 3},{name: '中期目标', value:5}],
                typeItems: [{name: '生活', value: '1'}, {name: '学习', value: '2'}, {name: '工作', value: '3'}]			
			}
		},
		methods: {
			typeChange (o) {
				this.target.type = parseInt(o.value)
			},
			dateChange(date) {
				this.target.expectFinishTime = date
			},
			submitTarget() {
				uni.reLaunch({
					url: 'targetList'
				})
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
