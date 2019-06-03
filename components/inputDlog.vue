<template>
	<view class="viewZZ" >
		<view>
			<view>{{title}}</view>
			<view>{{smallTitle}}</view>
			<view>
				<input type="text" v-model="viewData"/>
			</view>
			<view>
				<button @tap="cancel">取消</button>
				<button @tap="clickSure">确定</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String
			},
			smallTitle: {
				type:String
			},
			submit: {
				type: Function,
				require: true
			}
		},
		data() {
			return {
				visible: false,
				viewData: ''
			};
		},
		computed: {
			
		},
		methods: {
			open () {
				this.visible = true
			},
			clickSure () {
				this.submit(this.viewData)
			},
			cancel () {
				this.viewData = '',
				this.visible = false
			}
		}
	}
</script>

<style>
  .viewZZ {
	  background-color: #C8C7CC;
  }
  
  .viewZZ > .diog {
	  display: flex;
  }
</style>
