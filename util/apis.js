let apiBaseUrls = {
  prod:'https://api.17gwx.com',
  // #ifdef H5
  dev:'/api',
  // #endif
  // #ifndef H5
  dev:'http://dev.17gwx.com',
  // #endif
  beta:'http://beta.17gwx.com'
}
//api值管理
let apis = {
  suggestWord: '/search/common/suggest-word',//联想词
  microHotWord:'/v2/search/micro/hotWord',//搜索发现
  microInit:"/v2/search/micro/init",//平台列表
  microSearch:"/v2/search/micro/search",//标搜
  microCompare:"/v2/search/micro/compare",//搜索
  microRecommend:"/v2/search/micro/recommend", //首页商品列表接口api
  pddTrans:'/v2/search/micro/pddTrackUrl',//拼多多转链
  jdTrans:'/v2/search/micro/jdTrackUrl',//京东转链
  jdDetail:'/v2/search/micro/jdDetail',//京东详情
  pddDetail:'/v2/search/micro/pddDetail',//拼多多详情
  similarRecommend: '/v2/search/micro/similarRecommend',//相似推荐
  klDetail:'/v2/search/micro/kaolaDetail',//考拉商品详情
  klTrans:'/v2/kaola/coupon/trackurl',//考拉商品转链
  wphDetail:'/v2/search/micro/vipshopDetail',//唯品会详情
  wphTrans:'/v2/vipshop/coupon/trackurl',//唯品会转链
}
let apiBaseUrl;
if(process.env.NODE_ENV === 'development'){
	 apiBaseUrl = apiBaseUrls.dev;
}else if(process.env.NODE_ENV === 'beta'){
     apiBaseUrl = apiBaseUrls.beta;
}else{
	apiBaseUrl = apiBaseUrls.prod;
}
Object.keys(apis).forEach(key => {
  apis[key] = `${apiBaseUrl}${apis[key]}`
})
export default apis;