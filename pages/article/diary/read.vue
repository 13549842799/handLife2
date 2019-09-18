<template>
	<view class="view-container" style="height: auto;background: rgba(190,237,199,0.7);">
		<view class="diary-title-view">
			<text class="diary-title">{{diary.title}}</text>
			<text class="diary-status" style="font-size: 20upx;margin-left: 20upx;" :style="{'color': stateColor}">{{statusName}}</text>
		</view>
		<view class="diar-classify" style="justify-content: space-between;">
			<text>{{diary.classifyName}}</text>
			<text>{{diary.date}}</text>
		</view>
		<textarea v-if="!fromComputer" :disabled="true" :maxlength="-1" :value="diary.content" :auto-height="true"></textarea>
		<rich-text v-if="fromComputer" :nodes="diary.content"></rich-text>
		<view class="diar-classify">
			<text>#标签#</text>
		</view>
		<view>
			<label-img v-for="(l, index) in diary.labelList" :key="index" :name="l.name"></label-img>
		</view>
	</view>
</template>

<script>
	import diaryApi from '../../../api/article/diary'
	
	import labelImg from '../../../components/label-img.vue'
	
	const names = ['草稿', '私密', '发布']
	
	export default {
		components: {
			labelImg
		},
		data() {
			return {
				diary: {
					labelList: []
				}
			}
		},
		onLoad(option) {
			let v = this
			diaryApi.getDiary(option.id).then(res => {
				if (res) {
					v.diary = res
				}
			}).catch(err => {console.log(err)})
		},
		computed: {
			/**
			 * 获取日记的来源 ，判断是否来源于电脑
			 */
			fromComputer () {
				return this.diary.source === 1
			},
			statusName () {
				return names[this.diary.status]
			},
			stateColor () {
				switch (this.diary.status){
					case 0:
						return "#E0E0E0"
					case 1:
					    return "#F0AD4E"
					default:
						return "#4CD964"
				}
			}
		}
	}
</script>

<style>
	view {
		display: flex;
	}
	
	.diary-title-view, .diar-classify, .view-container textarea,.view-container rich-text {
		width: 710upx;
		padding: 20upx 20upx;
	}
	
	.diary-title-view {
		flex-direction: row;
	}
	
	.diary-title, .diary-status {
		line-height: 100upx;
		height: 100upx;
	}
	
	.diary-title {
		font-size: 50upx;
	}
	
	.diar-classify {
		height: 40upx;
		background-color: #EFEFF4;
	}
	
	.diar-classify text {
		height: 40upx;
		line-height: 40upx;
		font-size: 30upx;		
	}
	
	.view-container textarea {
	
	}

</style>
