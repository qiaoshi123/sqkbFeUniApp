import md5 from 'md5';
let appSecrets = {
	'20': '7fbfb8f3634c94b81f55d5c3e0d94e7a',
	'21': '7c8bef179771cb6771111d69d9da1d44'
};
export let requestSqkb = ({
	url='',
	data = {},
	method = 'GET',
	header = {},
	loading = false}) => {
	if (method == 'POST') {
		header['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
	}
	header['Access-Control-Allow-Origin'] = '*'
	if(!url){
		let error = new Error('缺少参数');
		return Promise.reject(error);
	}
	if(loading){
		uni.showLoading();
	}
	let params = addCommonParams(data);
	let appSecret = appSecrets[params.client_id];
	params.sign = setSign(params,appSecret);
	return uni.request({
		url, 
		data:{
			...params
		},
		header,
	}).then(data=>{
		if(loading){
			uni.hideLoading()
		}
		let [error,res] = data;
		if(error){
			return Promise.reject(error);
		}else{
			return res.data;
		}
	});
}
//增加公共参数
let addCommonParams = (data) => {
  let isIos = uni.getSystemInfoSync().platform == 'ios' ? true:false;
  let client_id = isIos ? 20:21;
  return {
    ...data,
    client_id
  }
}
//生成签名
let setSign = (qs, app_secret) => {
  let qsArr = [];
  for (let p in qs) {
    if (qs[p] === undefined || qs[p] === '') {
      delete qs[p];
    } else {
      qsArr.push(p + '=' + qs[p]);
    }
  }
  qsArr.sort();
  qsArr = qsArr.join('&');
  let signStr = qsArr + app_secret;
  let sign = md5(signStr);
  return sign;
}