<template>
	<modal-view :hidden.sync='visible' @confirm="confirmSureResult">
		<view slot='title' class="title-view">
			<text>{{trueTile}}</text>
			<text v-if="hasSmallTitle" class="dilog-smallTitle">{{trueSmallTitle}}</text>
		</view>
		<view slot='text' style="padding: 30upx; height: 160upx; justify-content: center; align-items: center;">
			<view class="modal-content">
				<input type="text" v-model="viewData" :placeholder="truePlaceHolder" placeholder-class="placeholder-input"/>
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
				require: false,
				default: () => {}
			}
		},
		data() {
			return {
				visible: true,
				viewData: '',
				param: null
			};
		},
		computed: {
			hasSmallTitle () {
				return this.param === null ? (this.smallTitle !== null && this.smallTitle !== undefined) : (this.param.smallTitle !== null && this.param.smallTitle !== undefined)
			},
			trueTile () {
				return this.param === null ? this.title : this.param.title
			},
			trueSmallTitle () {
				return this.param === null ? this.smallTitle : this.param.smallTitle
			},
			truePlaceHolder () {
				return this.param === null ? '' : this.param.placeHolder
			}
		},
		methods: {
			open () {
				this.visible = false
				this.viewData = ''
			},
			confirmSureResult () {
				if (this.param && this.param.submit) {
					this.param.submit(this.viewData)
				} else {
				    this.submit(this.viewData)	
				}
			},
			/**
			 * 通过传参设定标题和确定方法
			 * @param {Object} p <title, smallTitle, submit>
			 */
			show (p) {
				this.viewData = null
				this.open()
				if (p) {
					this.param = p,
					this.viewData = p.data
				}
				
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
  
  .placeholder-input {
	  font-size: 30upx;
	  color: #E0E0E0;
  }
</style>
