<template>
	<view class="view-container-target-add">
<<<<<<< HEAD
		<view v-show="firstPart">
			<text-area-item v-model="target.cause" title="原因" placeholder="请来明确你设立此目标的原因吧!"></text-area-item>
			<text-area-item v-model="target.content" title="目标的内容" placeholder="你要实现的目标是什么!"></text-area-item>
		</view>		
		<view v-show="secondPart">
			<text-area-item v-model="target.finishSign" title="完成的标志" placeholder="怎样才算完成呢？"></text-area-item>
		</view>
		<view v-show="thirdPart">
		    
		</view>
		<view v-show="laststPart">
		    <dot-radio current="1" :items="levelItems" title="目标等级" tip="请选择对应的目标等级吧" v-model="target.level" ></dot-radio>
		</view>
		<view class="bottom-button-group">
			<button type="default" size="mini" @tap="goLast" v-show="!firstPart">上一步</button>
			<button type="primary" size="mini" v-if="target.state !== 1">存草稿</button>
			<button type="primary" size="mini" @tap="validFirstPart" v-show="!laststPart">下一步</button>
			<button type="primary" size="mini"  v-show="laststPart">提交</button>
=======
		<text-area-item v-model="target.cause" title="原因" placeholder="请来明确你设立此目标的原因吧!"></text-area-item>
		<text-area-item v-model="target.content" title="目标的内容" placeholder="你要实现的目标是什么!"></text-area-item>
		<text-area-item v-model="target.finishSign" title="完成的标志" placeholder="怎样才算完成呢？"></text-area-item>
		<dot-radio current="1" :items="levelItems" title="目标等级" tip="请选择对应的目标等级吧" v-model="target.level" ></dot-radio>
		<radio-item @change="typeChange" title="目标类型" :items="typeItems" :defaultValue="typeStr" :dire="true"></radio-item>
		<date-input title="决定完成目标的预期时间吧" startDate="2019-10-25" :value="target.expectFinishTime" @change="dateChange"></date-input>
	    <view style="width: 100%;margin-top: 50rpx;">
			<button type="primary" @tap="submitTarget">提交新目标</button>
>>>>>>> 042e3a0f77eef63c7ed2c61cb5520a560f5ec0e7
		</view>
	</view>
</template>

<script>
	import inputItem from '../../../components/form/input';
	import textAreaItem from '../../../components/form/textarea'    
	import dotRadio from '../../../components/form/dotRadio'
<<<<<<< HEAD
    
	const maxPage = 4 //最大页数
=======
    import radioItem from '../../../components/form/radio'
	import dateInput from '../../../components/form/dateInput.vue'
	
	import objUtil from '../../../common/objUtil.js'
>>>>>>> 042e3a0f77eef63c7ed2c61cb5520a560f5ec0e7
		
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
<<<<<<< HEAD
					state: 0
				},
				levelItems: [{name: '远期目标', value: 1}, {name: '近期目标', value: 2},{name: '紧急目标', value: 3},{name: '中期目标', value:5}],
				curTap: 1
			}
		},
		computed: {
			firstPart() {
				return this.curTap === 1
			},
			secondPart() {
				return this.curTap === 2
			},
			thirdPart() {
				return this.curTap === 3
			},
			laststPart() {
				return this.curTap === maxPage
			}
		},
		methods: {
			validFirstPart() {
				this.curTap = this.curTap >=maxPage ? maxPage : this.curTap + 1
			},
			goLast() {
				this.curTap = this.curTap === 1 ? this.curTap === 1 : this.curTap - 1
=======
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
>>>>>>> 042e3a0f77eef63c7ed2c61cb5520a560f5ec0e7
			}
		}
	}
</script>

<style>
view {
	display: flex;
}
.view-container-target-add {
	width: 700rpx;
	padding: 0 25rpx;
	flex-direction: column;
}

.view-container-target-add > view {
	flex-direction: column;
	width: 100%;
}

.bottom-button-group {
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 100rpx;
	flex-direction: row !important;
	padding-top: 20rpx;
}

.bottom-button-group button {
	height: 60rpx;
}
</style>
