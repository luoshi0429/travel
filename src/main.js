import Vue from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';

import '@/styles/basic.scss';
import 'swiper/dist/css/swiper.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

// 判断是否为微信内
Vue.$isWeixin = /micromessenger/i.test(navigator.userAgent);
console.info('in wechat: ', Vue.$isWeixin);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
