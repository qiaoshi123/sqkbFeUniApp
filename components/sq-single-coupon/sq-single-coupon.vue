<template>
	<view class="coupon-item clearfix" @click="clickCoupon">
		<image :src="coupon.thumbnail_pic" class="coupon-pic" lazy-load="true"></image>
		<view class="coupon-info">
			<view class="coupon-title">
				<image class="jdpg-icon" src="/static/image/common/jdpg.png" v-if="coupon.platform_id==3 &&coupon.jd_activity_type ==1"></image>
				<image class="jdms-icon" src="/static/image/common/jdms.png" v-if="coupon.platform_id==3 &&coupon.jd_activity_type ==2"></image>
				<image class="jd-icon" src="/static/image/common/jd.png" v-if="coupon.platform_id==3 && coupon.jd_activity_type==0"></image>
				<image class="pdd-icon" src="/static/image/common/pdd.png" v-if="coupon.platform_id==4"></image>
				<image class="kl-icon icon" src="/static/image/common/kl.png" v-if="coupon.platform_id==6"></image>
				<image class="wph-icon icon" src="/static/image/common/wph.png" v-if="coupon.platform_id==7"></image>{{coupon.title}}
			</view>
			<view class="coupon-fee-group">
				<view class="fee-quan" v-if="coupon.ticket && coupon.ticket.coupon_price>0">
					<view class="quan">券</view>
					<view class="quan-money">{{coupon.ticket.coupon_price}}元</view>
				</view>
			</view>
			<view class="coupon-price-area">
				<view class="final-price">
					<text class="rmb">￥</text>
					<text class="price">{{coupon.zk_price}}</text>
				</view>
				<view class="origin-price" v-if="coupon.zk_price!=coupon.raw_price">
					<!-- <text class="yuanjia">原价</text> -->
					<text class="price">{{coupon.raw_price}}</text>
				</view>
			</view>
			<block v-if="coupon.month_sales">
				<view class="sale-num" v-if="coupon.month_sales=='新品上新'">
					{{coupon.month_sales}}
				</view>
				<view class="sale-num" v-else>
					{{coupon.month_sales}}人付款
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'SqSingleCoupon',
		data() {
			return {

			};
		},
		props: {
			coupon: {
				type: Object,
				value: {}
			},
			searchWord: {
				type: String,
				value: ''
			}
		},
		methods: {
			/**
			 * 点击商品
			 */
			clickCoupon() {
				uni.navigateTo({
					url:`/pages/detail/detail?coupon_id=${this.coupon.coupon_id}&platform_id=${this.coupon.platform_id}`
				})
			}
		}
	}
</script>

<style lang="less">
	.clearfix:after {
		visibility: hidden;
		display: block;
		font-size: 0;
		content: " ";
		clear: both;
		height: 0;
	}

	.coupon-item {
		margin: 0 24rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 24rpx;
		overflow: hidden;
		margin-bottom: 20rpx;

		>.coupon-pic {
			width: 260rpx;
			height: 260rpx;
			border-radius: 16rpx 0 0 16rpx;
			float: left;
		}

		>.coupon-info {
			width: 402rpx;
			margin-left: 284rpx;
			position: relative;

			>.coupon-title {
				height: 80rpx;
				font-size: 30rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(49, 49, 52, 1);
				line-height: 40rpx;
				overflow: hidden;
				margin-top: 8rpx;
				text-overflow: -o-ellipsis-lastline;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;

				>image {
					position: relative;
					top: 5rpx;
					margin-right: 6rpx;

					&.jd-icon {
						width: 52rpx;
						height: 30rpx;
					}

					&.jdpg-icon,
					.jdms-icon,
					.kl-icon {
						width: 90rpx;
						height: 30rpx;
					}

					&.pdd-icon {
						width: 64rpx;
						height: 30rpx;
					}

					&.wph-icon {
						width: 86rpx;
						height: 30rpx;
					}
				}
			}

			>.coupon-fee-group {
				margin-top: 62rpx;
				display: flex;
				min-height: 36rpx;

				>.fee-quan {
					padding: 0 8rpx;
					height: 36rpx;
					line-height: 36rpx;
					background: linear-gradient(133deg, rgba(255, 104, 48, 1) 0%, rgba(255, 8, 1, 1) 100%);
					border-radius: 7rpx;
					display: flex;
					position: relative;
					margin-right: 7rpx;

					>.quan {
						width: 37rpx;
						height: 36rpx;
						line-height: 36rpx;
						font-size: 22rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
					}

					>.quan-money {
						height: 36rpx;
						line-height: 36rpx;
						font-size: 22rpx;
						font-family: PingFangSC-Medium, PingFang SC;
						font-weight: 500;
						color: rgba(255, 255, 255, 1);
					}

					&::after {
						content: "";
						display: block;
						height: 36rpx;
						position: absolute;
						top: 0;
						left: 36rpx;
						border-left: 2rpx #fff dotted;
					}
				}
			}
			>.coupon-price-area {
				margin-top: 24rpx;
				margin-left: -8rpx;
				display: flex;
				>.final-price{
					>.rmb {
						display: inline-block;
						width: 20rpx;
						font-size: 20rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: bold;
						color: rgba(255, 34, 32, 1);
						line-height: 20rpx;
						position: relative;
						bottom: 2rpx;
					}
					>.price {
						font-size: 34rpx;
						font-family: PingFangSC-Semibold, PingFang SC;
						font-weight: bold;
						color: rgba(255, 34, 32, 1);
						line-height: 34rpx;
						margin-left: 2rpx;
					}
					
				}
				>.origin-price {
					height: 28rpx;
					font-size: 20rpx;
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
					color: rgba(145, 145, 154, 1);
					line-height: 28rpx;
					margin-top: 10rpx;
					margin-left: 10rpx;
					>.price {
						text-decoration: line-through;
						max-width: 105rpx;
						overflow: hidden;
						white-space: nowrap
					}
				}
			}
			>.sale-num {
				position: absolute;
				right: 8rpx;
				bottom: 8rpx;
				font-size: 22rpx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(132, 141, 148, 1);
			}
		}
	}




	
</style>
