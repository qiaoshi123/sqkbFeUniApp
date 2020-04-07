import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'
//扩展 
import {requestSqkb} from '@/util/requestUtil.js';
import apis from '@/util/apis.js';
uni.requestSqkb = requestSqkb;
uni.apis = apis;
const app = new Vue({
	...App
})
app.$mount()
