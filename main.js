import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'
//扩展 
import {requestSqkb} from '@/util/requestUtil.js';
import apis from '@/util/apis.js';
import commonUtil from '@/util/commonUtil.js';
uni.requestSqkb = requestSqkb;
uni.apis = apis;
uni.commonUtil = commonUtil;

const app = new Vue({
	...App
})
app.$mount()
