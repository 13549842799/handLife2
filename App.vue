<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			plus.screen.lockOrientation('portrait-primary'); //锁定
			// 检测升级
			uni.request({
				url: 'http://www.caiyangzhi.com/O.OBusinessPlan/api/system/appVersion/version.re', //检查更新的服务器地址
				/* data: {
					appid: plus.runtime.appid,
					version: plus.runtime.version,
					imei: plus.device.imei
				} */
				fail(res) {
					console.log('获取升级信息:', JSON.stringify(res))
				},
				success: (res) => {
					console.log('success', res)
					if (res.statusCode !== 200 || res.data.status !== 200 || res.data.data === null) {
						return
					}
					let verNo = null
					if (plus.runtime.version !== res.data.data.versionNo) {
						// 提醒用户更新
						uni.showModal({
							title: '更新提示',
							content: '检测有新版本,是否选择更新',
							success: (showResult) => {
								if (showResult.confirm) {
									plus.runtime.openURL(res.data.data.path);
								}
							}
						})
					}
					/* if (res.statusCode == 200 && res.data.isUpdate) {
						let openUrl = plus.os.name === 'iOS' ? res.data.iOS : res.data.Android;
						// 提醒用户更新
						uni.showModal({
							title: '更新提示',
							content: res.data.note ? res.data.note : '是否选择更新',
							success: (showResult) => {
								if (showResult.confirm) {
									plus.runtime.openURL(openUrl);
								}
							}
						})
					} */
				}
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	
	/*每个页面公共css */
	/* #ifndef APP-PLUS-NVUE */
	body,
	page {
		min-height: 100%;
		display: flex;
	}

	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}

	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	/* #endif */

	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		min-height: 100%;
		display: flex;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 20upx;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 40upx;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		width: 20%;
		height: 50upx;
		min-height: 50upx;
		padding: 15upx 0;
		padding-left: 30upx;
		line-height: 50upx;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15upx;
		height: 1upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 50upx;
		padding: 20upx;
	}

	button.primary {
		background-color: #0faeff;
	}
	
	/* 最外曾样式 */
	.view-container {
		width: 750upx;
		flex-direction: column;
	}
	
	.view-padding-container {
		width: 710rpx;
		padding: 20rpx 20rpx;
		flex-direction: column;
	}
	
	/* 输入框placeHolder样式 */
	.common-placeholder {
		font-size: 30upx;
		color: #DCDCDC;
	}
	
	.item-text {
		font-family: texticons;
	}
	
	.common-input-size {
		font-size: 30upx;
	}
	
	.app-status-bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	
	.common-bottom-item {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
	}
	
	/* #endif */
</style>
