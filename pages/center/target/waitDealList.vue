<template>
	<view class="view-container">
		<view class="deal-list" v-show="list.length > 0">
			<common-item :obj="l" v-for="(l, index) in list" v-bind:key="l.id" style="width: 100%">
				<my-button v-if="l.actions[0].result === 1" @MyClick="startPlan(l.id)">开始</my-button>
				<my-button v-if="l.actions[0].result === 2" @MyClick="completePlan(l)">结束</my-button>
				<my-button @MyClick="giveUpPlan(l.id)">放弃</my-button>			
			</common-item>
		</view>
		<view class="empty-view"></view>
	</view>
</template>

<script>
	import planApi from '../../../api/target/targetPlan.js'
	
	import MyButton from '../../../components/button/MyButton'
	
	import commonItem from '../../../components/list/common-list-item'
	
	export default {
		components: {
			commonItem,
			MyButton
		},
		data () {
			return {
				list: [],
				mapper: {
					id: 'id',
					content: 'planName'
				}
			}
		},
		onLoad() {
			let v = this
			planApi.unCompleteList().then(res => {
				v.list = res
			}).catch(err => { console.log(err) })
		},
		methods: {
			startPlan (id) {
				let data = {
					'id': id,
					'result': 2,
					'startTime': parseInt(now.getTime()/1000)
				}
				planApi.alterActionState(data).then(res => {}).catch(err => { console.log(err) })
			},
			completePlan () {
				
			},
			giveUpPlan () {
				
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.deal-list {
		flex-direction: column;
	}
	
	.empty-view {
		
	}
</style>
