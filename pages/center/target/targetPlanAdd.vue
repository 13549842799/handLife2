<template>
	<view class="view-padding-container">
		<input-item title="计划名称" placeholder="请为你的计划命名吧" v-model="plan.name" ></input-item>
		<text-area-item title="计划内容-在这个计划中,你需要完成的是什么!" placeholder="请填写你的动作吧" v-model="plan.content"></text-area-item>
		<date-time-input v-model="plan.executionTime" title="计划执行时间" type="time"></date-time-input>
		<date-time-input v-model="plan.endTime" title="执行期限" type="time"></date-time-input>
		<date-time-input v-if="!afterStartDate" v-model="plan.startDate" title="计划首次执行日期" type="date"></date-time-input>
		<view class="form-unit-input">
			<text>请选择执行周期</text>
			<view>
				<text>每</text>
				<input v-model="plan.period" class="form-unit-input-unit" type="number" />
				<picker :range="units" range-key="name" @change="selectUnit">
					<text>{{unitName}}</text>
				</picker>
			</view>
		</view>
		<button type="primary" size="mini" @tap="submitPlan">提交</button>
	</view>
</template>

<script>
	import inputItem from '../../../components/form/input'
	import textAreaItem from '../../../components/form/textarea'
	import DateTimeInput from '../../../components/form/DateTimeInput'
	
	import planApi from '../../../api/target/targetPlan.js'
	
	import objUtil from '../../../common/objUtil.js'
	import dataUtil from '../../../common/dataUtil.js'
	
	export default {
		components: {
			inputItem,
			textAreaItem,
			DateTimeInput
		},
		data () {
			return {
				plan: {
					id: null,
					executionTime: '00:00',
					endTime: '00:00',
					period: 1,
					unit: 1,
					startDate: dataUtil.dateFormat('yyyy-MM-dd', new Date())
				},
				units: [{name:'小时', id: 1}, {name:'天', id: 2}, {name:'周', id: 3}, {name:'月', id: 4}]
			}
		},
		onLoad(option) {
			let v = this
			let id = option.id
			if (id) {
				planApi.getPlan(id).then(res => {
					v.plan = res
				}).catch(err => { console.log(err) })
			}
		},
		computed: {
			unitName() {
				let id = this.plan.unit
				return this.units.find(val => {return val.id === id}).name
			},
			afterStartDate() {
				return this.plan.id != null && new Date() > new Date(this.plan.startDate)
			}
		},
		methods: {
			selectUnit(event) {
				let index = event.detail.value
				this.plan.unit = this.units[index].id
			},
			submitPlan() {
				let v = this
				planApi.savePlan(v.plan).then(res => {
					//#ifdef APP-PLUS
					plus.nativeUI.alert("保存成功", function(){
						uni.reLaunch({ url: 'targetPlans' })
					}, "", "OK");
					//#endif
					//#ifdef H5
					uni.reLaunch({ url: 'targetPlans' })
					//#endif
				}).catch(err => {
					uni.showToast({
						title: err.message,
						icon: "none"
					})
				})
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.form-unit-input {
		width: 100%;
		flex-direction: row;
		margin-top: 30rpx;
		margin-bottom: 50px;
	}
	
	.form-unit-input > text {
		font-size: 35rpx;
		color: #CDCDCD;
		margin-right: 50rpx;
	}
	
	.form-unit-input view {
		flex-direction: row;
		font-size: 35rpx;
		color: #E0E0E0;
	}
	
	.form-unit-input-unit {
		width: 100rpx;
		border: 1rpx solid;
		text-align: center;
		margin: 0 10px;
		color: #2F85FC;
	}
</style>
