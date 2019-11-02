import Vue from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';

import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';

import '@/styles/basic.scss';
import 'swiper/dist/css/swiper.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

Vue.use(Toast, {
  type: 'center',
  duration: 3000,
  wordWrap: true,
  width: '150px'
});

// 判断是否为微信内
const isWeixin = /micromessenger/i.test(navigator.userAgent);
Vue.prototype.$isWeixin = isWeixin;
if (isWeixin) {
  let version = navigator.userAgent.match(/MicroMessenger\/([\d.]+)/i)[1];
  version = version.replace(/\./g, '');
  version = Number(version) / 100;
  Vue.prototype.$wxVersion = version;
}

// TODO: 测试代码
// Vue.prototype.$isWeixin = true;
// Vue.prototype.$wxVersion = 7.04;

console.info('in wechat: ', Vue.$isWeixin);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
