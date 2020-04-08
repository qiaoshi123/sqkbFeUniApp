<template>
	<view>
		<view v-if="couponInfo">
			<view class="header" :style="{top:headerFixeTop}">
				<view class="search-area">
					<view class="input-area">
						<image src="/static/image/common/search-icon.png"></image>
						<input class="input" placeholder="在此输入你想要的商品" v-model="inputDefaultText" disabled="true" maxlength="-1"></input>
					</view>
					<view class="btn search-btn">搜索</view>
					<view class="btn cancel-btn" style="display:none">取消</view>
				</view>
			</view>
			<!-- 商品头图  -->
			<view class="swiper-area" v-if="couponInfo.cover_pics && couponInfo.cover_pics.length>0">
				<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" class="swiper-outer"
				 @change="swiperChange">
					<swiper-item class="swiper-inner" v-for="(item,index) in couponInfo.cover_pics" :key="item">
						<view class="swiper-view">
							<image :src="item" lazy-load="true"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="page-area">
					<view class="pages-gation">
						<view :class="['page-item',{'active':swiperCurIndex == index}]" v-for="(item,index) in couponInfo.cover_pics"
						 :key="item"></view>
					</view>
				</view>
			</view>
			<!-- 商品价格 -->
			<view class="price-area">
				<view class="final-text" v-if="ticketInfo.hasTicket">券后价</view>
				<view class="final-price">
					<view class="unit">¥</view>
					<view class="num">{{couponInfo.final_price}}</view>
				</view>
				<view class="origin-price" v-if="couponInfo.final_price!=couponInfo.origin_price">¥{{couponInfo.origin_price}}</view>
				<view class="sales">月销 {{couponInfo.month_sales}}</view>
			</view>
			<!-- 商品标题 -->
			<view class="title-area">
				<view class='title'>
					<image class="jdpg-icon icon" src="/static/image/common/jdpg.png" v-if="couponInfo.platform_id==3 &&couponInfo.jd_activity_type ==1"></image>
					<image class="jdms-icon icon" src="/static/image/common/jdms.png" v-if="couponInfo.platform_id==3 &&couponInfo.jd_activity_type ==2"></image>
					<image class="jd-icon icon" src="/static/image/common/jd.png" v-if="couponInfo.platform_id==3 && couponInfo.jd_activity_type==0"></image>
					<image class="pdd-icon icon" src="/static/image/common/pdd.png" v-if="couponInfo.platform_id==4"></image>
					<image class="kl-icon icon" src="/static/image/common/kl.png" v-if="couponInfo.platform_id==6"></image>
					<image class="wph-icon icon" src="/static/image/common/wph.png" v-if="couponInfo.platform_id==7"></image>{{couponInfo.title}}
				</view>
				<button class="share-btn" size="mini" open-type="share">分享</button>
			</view>
			<!-- 券卡片 -->
			<view class="ticket-card-area" v-if="ticketInfo.hasTicket">
				<view class="ticket-card">
					<view class="info">
						<view class="ticket-price">
							<view class="price">{{ticketInfo.ticketPrice}}</view>
							<view :class="['text',{'android':isAndroid}]">元优惠券</view>
						</view>
						<view class="ticket-time">
							使用时间：{{ticketInfo.startTime}}-{{ticketInfo.endTime}}
						</view>
					</view>
					<view class="text">立即领取</view>
				</view>
			</view>
			<!--详情tips -->
			<view class="detail-tips">
				<image src="/static/image/coupon/detail-tips.png" lazy-load="true"></image>
			</view>
			<!-- 悬浮小把手去app购买 -->
			<view class="go-app-btn" :class="goAppClass" v-if="showBackApp">
				去App购买
				<!-- <button open-type="launchApp" app-parameter="{{backAppParams}}" binderror="launchAppError" bindlaunchapp="launchAppSuccess"></button> -->
			</view>
			<!-- 相似推荐和详情 -->
			<view class="other-content">
				<!-- 相似推荐有数据  && 详情有数据 -->
				<view class="tabs" v-if="recommendList.length>0 && descPics.length>0">
					<view class="item">
						<view :class="['text',{'active':activeIndex==0}]" @click="clickChangeTab(0)">相似推荐</view>
					</view>
					<view class="item">
						<view :class="['text',{'active':activeIndex==1}]" @click="clickChangeTab(1)">商品详情</view>
					</view>
				</view>
				<!-- 相似推荐有数据 && 详情没数据 -->
				<view class="tabs-one" v-if="recommendList.length>0 && descPics.length<=0">
					<view class="item">
						<view class="text active" @click="clickChangeTab(0)">相似推荐</view>
					</view>
				</view>
				<!-- 相似推荐无数据 && 详情有数据 -->
				<view class="tabs-one" v-if="recommendList.length<=0 && descPics.length>0">
					<view class="item">
						<view class="text active" @click.stop="clickChangeTab(1)">商品详情</view>
					</view>
				</view>

				<view class="content">
					<view class="recommed-list" v-show="activeIndex==0">
						<SqSingleCoupon v-for="(item,key) in recommendList" :key="item.coupon_id" :coupon="item"></SqSingleCoupon>
					</view>
					<view class="detail-desc" v-show="activeIndex==1">
						<image v-for="(item,index) in descPics" :key="item.url" :src="item.url" mode="widthFix" lazy-load="true"></image>
					</view>
				</view>
			</view>
			<!-- 底部购买 -->
			<view class="footer">
				<view class="wxshare">
					<image src="/static/image/coupon/wx-icon.png"></image>
					<view class="share-text">分享</view>
					<button open-type="share"></button>
				</view>
				<view class="buy-btn">{{ticketInfo.hasTicket?'领券购买':'立即购买'}}</view>
			</view>
		</view>
		</block>


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
				// #ifndef H5
				headerFixeTop:0,
				// #endif
				// #ifdef H5
				headerFixeTop:uni.getSystemInfoSync().windowTop+'px',
				// #endif
				isAndroid: false, //wx.util.getDeviceInfo().android,
				goAppClass: '',
				couponId: '',
				platformId: '',
				from_page: '', //页面涞源
				word: '', //通过哪个搜索词进入
				showBackApp: false,
				backAppParams: '', //返回app回传参数
				indicatorDots: false,
				vertical: false,
				autoplay: false,
				interval: 2000,
				duration: 1000,
				swiperCurIndex: 0,
				apis: { //商品详情接口池子
					3: uni.apis.jdDetail,
					4: uni.apis.pddDetail,
					6: uni.apis.klDetail,
					7: uni.apis.wphDetail,
				},
				channelIds: { //跳回app 携带channelId 池子
					3: {
						android: 54635,
						ios: 54634
					},
					4: {
						android: 54636,
						ios: 54637
					},
					6: {
						android: '',
						ios: ''
					},
					7: {
						android: '',
						ios: ''
					},
				},
				onlyDetailPlatforms: [6, 7], //仅支持详情页的
				//商品信息
				couponInfo: '',
				ticketInfo: { //券信息
					hasTicket: false,
					endTime: '',
					startTime: '',
					ticketPrice: '',
				}, //是否有券
				inputDefaultText: '', //input 默认文案
				recommendList: [],
				activeIndex: -1, //相似推荐和商品详情所选中索引
				descPics: []
			}
		},
		onLoad(option) {
			this.couponId = option.coupon_id;
			this.platformId = option.platform_id;
			this.getDetail();

			this.setTitleBar();
		},
		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage() {
			let couponInfo = this.couponInfo;
			let query = {
				coupon_id: couponInfo.coupon_id,
				platform_id: couponInfo.platform_id,
				from_page: 'wxmp_share_card',
				word: ''
			}
			let path = `${this.getCurPageRoute()}${uni.commonUtil.queryToString(query)}`;
			return {
				title: couponInfo.title,
				path: path,
				imageurl: couponInfo.cover_pics[0]
			}
		},
		methods: {
			/**
			 * 获取当前路径
			 */
			getCurPageRoute() {
				let pages = getCurrentPages();
				let curPage = pages[pages.length - 1];
				return curPage.route;
			},
			/**
			 * 设置标题栏
			 */
			setTitleBar() {
				// #ifdef MP-WEIXIN || H5
				uni.setNavigationBarColor({
					backgroundColor: '#FF512E',
					frontColor: '#ffffff'
				})
				// #endif
				// #ifdef MP-ALIPAY
				uni.setNavigationBarColor({
					backgroundColor: '#ffd21c'
				})
				// #endif
			},
			/**
			 * 获取详情信息
			 */
			getDetail() {
				let url = this.apis[this.platformId];
				let options = {
					url,
					data: {
						coupon_id: this.couponId
					},
					loading: true
				}
				uni.requestSqkb(options).then(res => {
					if (res.status_code == 1) {
						let couponInfo = res.data.coupon_info;
						//处理第三方h5地址
						couponInfo.url = couponInfo.url && couponInfo.url.includes('http') ? couponInfo.url : 'https://' + couponInfo.url;
						//生成input默认文案
						let inputDefaultText = this.getInputDetaultText(couponInfo);
						//生成券信息
						let ticketInfo = this.getTicketInfo(couponInfo);

						this.couponInfo = couponInfo;
						this.ticketInfo = ticketInfo;
						this.inputDefaultText = inputDefaultText;

						this.getRecommendList();
					} else {
						uni.showToast({
							title: res.message
						})
					}
				}).catch(e => {
					console.log(e);
					uni.showToast({
						title: '网络异常'
					})
				})
			},
			/**
			 * 切换相似推荐和商品详
			 * @param {Object} type 0推荐 1商品详情
			 */
			clickChangeTab(type) {
				this.activeIndex = type
			},
			/**
			 * swiper 滑动事件
			 * @param {Object} e
			 */
			swiperChange(e) {
				let swiperCurIndex = e.detail.current;
				this.swiperCurIndex = swiperCurIndex;
			},
			/**
			 * js处理券信息
			 */
			getTicketInfo(couponInfo) {
				let ticketInfo = this.ticketInfo;
				if (couponInfo.platform_id == 3) {
					//京东
					if (couponInfo.ticket && couponInfo.ticket.status == 1 && couponInfo.ticket.coupon_price) {
						let ticket = couponInfo.ticket;
						ticketInfo.hasTicket = true;
						ticketInfo.ticketPrice = ticket.coupon_price;
						ticketInfo.startTime = uni.commonUtil.formatDate(new Date(ticket.coupon_start_time * 1000), 'yyyy.MM.dd')
						ticketInfo.endTime = uni.commonUtil.formatDate(new Date(ticket.coupon_end_time * 1000), 'yyyy.MM.dd')
					}
				}
				if (couponInfo.platform_id == 4) {
					//拼多多
					if (couponInfo.ticket && couponInfo.ticket.ticket_status == 1 && couponInfo.ticket.coupon_price) {
						let ticket = couponInfo.ticket;
						ticketInfo.hasTicket = true;
						ticketInfo.ticketPrice = ticket.coupon_price;
						ticketInfo.startTime = uni.commonUtil.formatDate(new Date(ticket.coupon_start_time * 1000), 'yyyy.MM.dd')
						ticketInfo.endTime = uni.commonUtil.formatDate(new Date(ticket.coupon_end_time * 1000), 'yyyy.MM.dd')
					}
				}
				if (couponInfo.platform_id == 6) {
					//考拉商品没有券,数据默认就没有券，此处不处理
				}
				if (couponInfo.platform_id == 7) {
					//todo  唯品会商品没有券，,数据默认就没有券，此处不处理
				}
				return ticketInfo;
			},
			/**
			 * 生成顶部input 默认文案
			 */
			getInputDetaultText(couponInfo) {
				if (this.onlyDetailPlatforms.indexOf(couponInfo.platform_id) > -1) {
					return couponInfo.title;
				} else {
					return couponInfo.url;
				}
			},
			/**
			 * 获取相似推荐商品
			 */
			getRecommendList() {
				let options = {
					url: uni.apis.similarRecommend,
					data: {
						coupon_id: this.couponInfo.coupon_id,
						platform_id: this.couponInfo.platform_id,
						title: this.couponInfo.title
					},
					method: "GET"
				}
				uni.requestSqkb(options).then(res => {
					if (res.status_code == 1) {
						let recommendList = res.data.coupon_list || [];
						let descPics = this.couponInfo.desc_pics || [];
						let activeIndex;
						if (recommendList.length == 0 && descPics.length == 0) {
							activeIndex = -1;
						} else if (recommendList.length > 0 && descPics.length == 0) {
							activeIndex = 0;
						} else if (recommendList.length == 0 && descPics.length > 0) {
							activeIndex = 1;
						} else if (recommendList.length > 0 && descPics.length > 0) {
							activeIndex = 0;
						}

						this.recommendList = recommendList;
						this.descPics = descPics;
						this.activeIndex = activeIndex;
					} else {
						uni.showToast({
							title: res.message
						})
					}
				}).catch(e => {
					console.log(e);
					uni.showToast({
						title: res.message
					})
				})
			},
		}
	}
</script>

<style lang="less">
	.header {
		overflow: hidden;
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 100;
		background: rgba(246, 246, 246, 1);
	}

	// 头部搜索区域
	.search-area {
		margin: 16rpx 24rpx;
		display: flex;
		flex-direction: row;
	}

	.search-area .input-area {
		width: 622rpx;
		height: 60rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 30rpx;
		margin-right: 16rpx;
		box-shadow: 0rpx 2rpx 6rpx 0 rgba(231, 231, 231, 0.32);
	}

	.input-area .input {
		width: 500rpx;
		min-height: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-family: PingFangSC-Regular;
		font-size: 28rpx;
		color: #000;
		letter-spacing: 0;
		margin-top: 10rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.input-area image {
		width: 24rpx;
		height: 24rpx;
		float: left;
		margin: 19rpx 12rpx 0 32rpx;
	}

	.search-area .btn {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
	}

	.search-area .search-btn {
		color: rgba(255, 77, 1, 1);
	}

	.search-area .cancel-btn {
		color: #616168;
	}

	// 轮播

	.swiper-area {
		width: 750rpx;
		height: 750rpx;
		margin-top: 84rpx;
		position: relative;
	}

	.swiper-area>.swiper-outer {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.swiper-inner,
	.swiper-view,
	.swiper-inner image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.swiper-area>.page-area {
		width: 750rpx;
		position: absolute;
		bottom: 32rpx;
		left: 0;
		display: flex;
		justify-content: center;
	}

	.page-area>.pages-gation {
		display: flex;
		justify-content: center;
	}

	.page-area>.pages-gation>.page-item {
		width: 7rpx;
		height: 7rpx;
		background: #DAD6D4;
		border-radius: 7rpx;
		margin: 0 7rpx;
	}

	.page-area>.pages-gation>.page-item.active {
		width: 23rpx;
		height: 7rpx;
		background: #ffffff;
		border-radius: 3.5rpx;
		margin: 0 7rpx;
	}

	// 价格区域
	.price-area {
		height: 66rpx;
		padding: 15rpx 0;
		display: flex;
		justify-content: flex-start;
		background: #fff;
	}

	.final-text {
		width: 76rpx;
		height: 30rpx;
		background: linear-gradient(104deg, rgba(255, 78, 78, 1) 4%, rgba(255, 44, 57, 1) 100%);
		border-radius: 8rpx 8rpx 0px 8rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		line-height: 32rpx;
		text-align: center;
		margin-top: 22rpx;
		margin-left: 20rpx;
	}

	.final-price {
		margin-left: 10rpx;
		display: flex;
	}

	.final-price>.unit {
		width: 30rpx;
		height: 56rpx;
		font-size: 40rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: rgba(255, 1, 1, 1);
		line-height: 56rpx;
		margin-top: 8rpx;
		text-align: right;
	}

	.final-price>.num {
		height: 66rpx;
		font-size: 48rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: rgba(255, 31, 31, 1);
		line-height: 66rpx;
		margin-left: 10rpx;
	}

	.origin-price {
		height: 37rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 37rpx;
		text-decoration: line-through;
		margin-left: 10rpx;
		margin-top: 19rpx;
	}

	.sales {
		flex: 1;
		text-align: right;
		margin-right: 20rpx;
		margin-top: 22rpx;
		height: 33rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 33rpx;
	}

	// 标题区域
	.title-area {
		margin-left: 20rpx;
		margin-right: 0;
		height: 84rpx;
		background: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: space-between;
	}

	.title-area>.title {
		width: 604rpx;
		height: 84rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 42rpx;
		overflow: hidden;
	}

	.title-area>.title>.icon {
		margin-top: 5rpx;
		margin-right: 10rpx;
		float: left;
	}

	.title-area>.title>.jd-icon {
		width: 52rpx;
		height: 30rpx;
	}

	.title-area>.title>.jdpg-icon,
	.title-area>.title>.jdms-icon,
	.title-area>.title>.kl-icon {
		width: 90rpx;
		height: 30rpx;
	}

	.title>.wph-icon {
		width: 86rpx;
		height: 30rpx;
	}

	.title-area>.title>.pdd-icon {
		width: 64rpx;
		height: 30rpx;
	}

	.title-area>.share-btn {
		width: 106rpx;
		height: 52rpx;
		line-height: 52rpx;
		background: rgba(238, 238, 238, 1);
		border-radius: 100rpx 0rpx 0rpx 100rpx;
		text-align: center;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		padding: 0;
		margin-right: 0;
		margin-top: 5rpx;
	}

	// 券信息
	.ticket-card-area {
		width: 750rpx;
		height: 185rpx;
		background: #fff;
		padding-top: 20rpx;
		overflow: hidden;
	}

	.ticket-card {
		width: 690rpx;
		height: 185rpx;
		background: url('http://file.17gwx.com/sqkb/page/2020/2/26/_1582691762118184607') no-repeat center;
		background-size: 100% 100%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
	}

	.ticket-card>.info {
		width: 467rpx;
	}

	.info>.ticket-price {
		height: 67rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		display: flex;
		justify-content: center;
		margin-top: 25rpx;
	}

	.info>.ticket-price>.price {
		font-size: 48rpx;
		line-height: 67rpx;
	}

	.info>.ticket-price>.text {
		font-size: 36rpx;
		line-height: 67rpx;
		margin-top: 2rpx;
	}

	.info>.ticket-price>.text.android {
		margin-top: 6rpx;
	}

	.info>.ticket-time {
		height: 33rpx;
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(255, 255, 255, 0.9);
		line-height: 33rpx;
		margin-top: 13rpx;
		text-align: center;
	}

	.ticket-card>.text {
		flex: 1;
		text-align: center;
		height: 42rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
		line-height: 42rpx;
		margin-top: 58rpx;
	}

	// tips
	.detail-tips {
		width: 750rpx;
		height: 75rpx;
		margin-top: 10rpx;
	}

	.detail-tips>image {
		display: block;
		width: 100%;
		height: 100%;
	}

	// 去app购买
	.go-app-btn {
		display: block;
		padding: 0 24rpx 0 32rpx;
		height: 77rpx;
		line-height: 77rpx;
		text-align: center;
		background: linear-gradient(270deg, rgba(255, 215, 0, 1) 0%, rgba(255, 222, 113, 1) 100%);
		border-radius: 100rpx 0rpx 0rpx 100rpx;
		position: fixed;
		right: 0;
		z-index: 100;
		bottom: 160rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: bold;
		color: rgba(49, 49, 52, 1);
		box-shadow: 0 2rpx 8rpx 0 rgba(255, 215, 3, 0.3);
	}

	.go-app-btn.go-app-btn-in {
		animation: goAppBtnIn 0.4s linear forwards;
	}

	.go-app-btn.go-app-btn-out {
		animation: goAppBtnOut 0.4s linear forwards;
	}

	@keyframes goAppBtnOut {
		0% {
			right: 0;
		}

		100% {
			right: -160rpx;
		}
	}

	@keyframes goAppBtnIn {
		0% {
			right: -160rpx;
		}

		100% {
			right: 0rpx;
		}
	}



	.go-app-btn>button {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: transparent;
		opacity: 0;
	}


	// 相似推荐和 详情
	.other-content {
		margin-top: 10rpx;
		background: #fff;
	}

	.tabs {
		width: 750rpx;
		height: 88rpx;
		display: flex;
		background: rgba(255, 255, 255, 1);
	}

	.tabs>.item {
		flex: 1;
	}

	.tabs>.item>.text {
		height: 34rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(49, 49, 52, 1);
		line-height: 34rpx;
		text-align: center;
		margin-top: 32rpx;
	}

	.tabs>.item>.text.active {
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		position: relative;
	}

	.tabs>.item>.text.active::after {
		content: '';
		display: block;
		width: 64rpx;
		height: 5rpx;
		background: linear-gradient(135deg, rgba(255, 116, 56, 1) 0%, rgba(255, 31, 31, 1) 100%);
		border-radius: 3rpx;
		position: absolute;
		bottom: -13rpx;
		left: 50%;
		margin-left: -32rpx;
	}

	.tabs-one {
		width: 750rpx;
		height: 88rpx;
		display: flex;
		background: rgba(255, 255, 255, 1);
	}

	.tabs-one>.item {
		flex: 1;
	}

	.tabs-one>.item>.text {
		height: 34rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(49, 49, 52, 1);
		line-height: 34rpx;
		text-align: center;
		margin-top: 32rpx;
	}

	.tabs-one>.item>.text.active {
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		position: relative;
	}


	.content {
		margin-top: 10rpx;
		padding-bottom: 100rpx;
		min-height: 100rpx;
	}

	.content>.recommend-list {}

	.content>.detail-desc {}

	.content>.detail-desc>image {
		width: 100%;
		display: block;
	}

	// 底部购买和分享
	.footer {
		width: 750rpx;
		height: 110rpx;
		display: flex;
		position: fixed;
		bottom: 0;
		z-index: 100;
	}

	.footer>.buy-btn {
		flex: 1;
		height: 110rpx;
		line-height: 110rpx;
		background: linear-gradient(90deg, rgba(255, 109, 9, 1) 1%, rgba(255, 37, 31, 1) 100%);
		text-align: center;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: rgba(255, 255, 255, 1);
	}

	.footer>.wxshare {
		width: 174rpx;
		background: #fff;
		position: relative
	}

	.footer>.wxshare>button {
		position: absolute;
		top: 0;
		left: 0;
		width: 174rpx;
		height: 120rpx;
		background: transparent;
		opacity: 0;
	}

	.footer>.wxshare>image {
		display: block;
		width: 58rpx;
		height: 48rpx;
		margin: 18rpx auto 0;
	}

	.footer>.wxshare .share-text {
		height: 28rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(49, 49, 52, 1);
		line-height: 28rpx;
		text-align: center;
		margin-top: 8rpx;
	}
</style>
