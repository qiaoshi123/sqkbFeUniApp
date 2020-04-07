<template>
	<view>
		<image class="add-mp-to-list" src="/static/image/home/add-mp-tip-bg.png" mode="widthFix" bindtap="hideAddMpToList"
		 v-if="showAddMpToList"></image>
		<view class="header">
			<view class="name">省钱快报优惠券查询</view>
			<view class="sqkb-way-area clearfix" bindtap="clickSqkbWayEnter">
				<image src="/static/image/home/sqkb-way-tips.png" class="tips"></image>
				<image src="/static/image/home/sqkb-way-btn.png" class="way-btn"></image>
			</view>
			<image src="/static/image/home/home-fee-bg.png" class="fee-bg"></image>
			<view class="search-area-space" v-if="searchFixed"></view>
			<view class="search-area" :class="{'fixed':searchFixed,'not-fixed':!searchFixed}" id="searchArea">
				<view class="search-input-view" bindtap="clickSearchArea">
					<image src="/static/image/common/black-search-icon.png" class="search-icon"></image>
					<view class="hot-words">粘贴商品链接或标题，查询优惠券</view>
				</view>
			</view>
		</view>
		<view class="content">
			<!--  <view class="history-search-area" wx:if="{{historyWords.length>0}}">
		      <view class="history-title">历史搜索
		        <image class="delete-all" src="/static/image/common/delete-history-all-black.png" bindtap="clearHistorySearchWords"></image>
		      </view>
		      <view class="history-group">
		        <view class="history-item ellipsis" wx:for="{{historyWords}}" wx:for-item="item" wx:key="index" data-word="{{item}}" bindtap="clickSearchItem">{{item}}</view>
		      </view>
		    </view>
			-->
			<view class="discover-search-area" v-if="hotList.length>0">
				<view class="discover-title">搜索发现</view>
				<view class="discover-group">
					<view class="discover-item ellipsis" v-for="(v,i) in hotList" :key="i" @click="clickSearchItem">{{v}}</view>
				</view>
			</view>
			<view class="coupon-area" v-if="couponList.length > 0">
				<image src="/static/image/home/home-coupon-area-bg.png" class="title-bg"></image>
				<view class="coupon-list">
					<SqSingleCoupon v-for="(v,i) in couponList" :coupon="v" :key='i'></SqSingleCoupon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import SqSingleCoupon from '@/components/sq-single-coupon/sq-single-coupon.vue'
	export default {
		components: {
			SqSingleCoupon
		},
		data() {
			return {
				searchFixed: false,
				showAddMpToList: true,
				couponList: [],
				hotList: []
			};
		},
		onLoad() {
			this.getHotWord();
			this.getCouponList();
		},
		methods: {
			/**
			 * 点击搜索框
			 */
			clickSearchArea() {

			},
			/**
			 * 点击搜索词
			 */
			clickSearchItem() {

			},
			/**
			 * 获取 搜索发现热词
			 */
			getHotWord() {
				let options = {
					url: uni.apis.microHotWord,
					data: {}
				}
				uni.requestSqkb(options).then(res => {
					if (res.status_code == 1) {
						let hotList = res.data || [];
						this.hotList = hotList;
					} else {
						uni.showToast({
							title: res.message
						})
					}
				}).catch(e => {
					console.log(e);
					uni.showToast({
						title: e.message
					})
				})
			},
			/**
			 * 获取推荐商品列表
			 */
			getCouponList() {
				let options = {
					url: uni.apis.microRecommend,
					data: {},
					method: "POST"
				}
				uni.requestSqkb(options).then(res => {
					if (res.status_code == 1) {
						let couponList = res.data.coupon_list || [];
						this.couponList = couponList;
					} else {
						uni.showToast({
							title: res.meassge
						})
					}
				}).catch(e => {
					console.log(e);
					uni.showToast({
						title: e.message
					})
				})
			},
		}
	}
</script>

<style lang="less">
	.add-mp-to-list {
		width: 424rpx;
		position: fixed;
		z-index: 10;
		top: 0;
		right: 20rpx;
	}

	.header {
		background: #ff512e;
		padding-bottom: 10rpx;

		>.name {
			height: 56rpx;
			font-size: 40rpx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
			line-height: 56rpx;
			text-align: center;
			padding-top: 8rpx;
		}

		>.sqkb-way-area {
			width: 702rpx;
			height: 36rpx;
			margin: 0 auto;
			position: relative;
			margin-top: 10rpx;

			>.tips {
				width: 676rpx;
				height: 36rpx;
			}

			>.way-btn {
				width: 120rpx;
				height: 36rpx;
				position: absolute;
				right: 0;
				top: 0;
			}
		}

		>.fee-bg {
			display: block;
			width: 145rpx;
			height: 68rpx;
			margin: 0 auto;
		}

		>.search-area-space {
			height: 104rpx
		}

		>.search-area {
			background: #ff512e;

			>.search-input-view {
				margin: 0 auto;
				width: 702rpx;
				height: 88rpx;
				background: rgba(255, 255, 255, 1);
				border-radius: 16rpx;
				display: flex;
				flex-direction: row;

				>.search-icon {
					width: 30rpx;
					height: 31rpx;
					margin: 30rpx 21rpx 0 37rpx;
				}

				>.hot-words {
					margin-top: 24rpx;
					flex: 1;
					height: 42rpx;
					font-size: 30rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
					line-height: 42rpx;
				}
			}

		}

		>.search-area.not-fixed {
			padding-bottom: 15rpx;
			transform: translate(0, -9rpx);
		}

		>.search-area.fixed {
			padding-bottom: 22rpx;
			transform: translate(0, 0);
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			z-index: 100;
		}
	}

	.content {
		background: rgba(250, 250, 250, 1);
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		overflow: hidden;
		position: relative;
		top: -12rpx;
	}

	/*历史搜索*/

	.history-search-area {
		margin: 22rpx 24rpx 0 32rpx;
	}

	.history-search-area .history-title {
		height: 32rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(49, 49, 52, 1);
		line-height: 32rpx;
	}

	.history-search-area .delete-all {
		width: 28rpx;
		height: 30rpx;
		padding-left: 20rpx;
		padding-right: 25rpx;
		float: right;
		margin-right: -25rpx;
	}

	.history-group {
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
	}

	.history-group .history-item {
		height: 48rpx;
		line-height: 48rpx;
		padding: 0 16rpx;
		margin: 16rpx 12rpx 0 0;
		background: rgba(238, 238, 238, 1);
		border-radius: 24rpx;
		max-width: 100%;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(97, 97, 104, 1);
	}

	/*搜索发现*/

	.discover-search-area {
		margin: 32rpx 36rpx 0;
	}

	.discover-search-area .discover-title {
		height: 32rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(49, 49, 52, 1);
		line-height: 32rpx;
	}

	.discover-group {
		/* margin-top: 8rpx; */
		display: flex;
		justify-content: start;
		flex-wrap: wrap;
	}

	.discover-group .discover-item {
		height: 48rpx;
		line-height: 48rpx;
		padding: 0 16rpx;
		margin: 16rpx 12rpx 0 0;
		background: rgba(238, 238, 238, 1);
		border-radius: 24rpx;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(97, 97, 104, 1);
	}

	/*商品*/

	.coupon-area {
		margin-top: 56rpx;
	}

	.coupon-area .title-bg {
		display: block;
		width: 331rpx;
		height: 47rpx;
		margin: 0 auto;
	}

	.coupon-list {
		margin-top: 24rpx;
		padding-bottom: 24rpx;
	}
</style>
