<template>
	<modal-view :hidden.sync='visible' @confirm="confirmSureResult">
		<view slot='title' class="title-view">
			<text>{{title}}</text>
			<text class="dilog-smallTitle">{{smallTitle}}</text>
		</view>
		<view slot='text' style="padding: 30upx; height: 160upx; justify-content: center; align-items: center;">
			<view class="modal-content">
				<input type="text" v-model="viewData"/>
			</view>
		</view>
	</modal-view>
</template>

<script>
	import modalView from './x-modal/x-modal.vue'
	
	export default {
		components: {
			modalView
		},
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
				visible: true,
				viewData: ''
			};
		},
		computed: {
			
		},
		methods: {
			open () {
				this.visible = false
				this.viewData = ''
			},
			confirmSureResult () {
				this.submit(this.viewData)
			}
		}
	}
</script>

<style>
  .title-view {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-top: 20upx;
	text-align: center;
	margin-bottom: 50upx;
  }
  
  .dilog-smallTitle {
	  font-size: 30upx;
	  color: #C8C7CC;
	  margin-top: 30upx;
  }
  
  .modal-content {
	  justify-content: center;
	  background-color: #F2F2F2;
	  font-size: 40upx;
	  color: #555555;
	  padding: 20upx;
	  border-radius: 20upx;
  }
</style>
