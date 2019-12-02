import VConsole from 'vconsole';
import Vue from 'vue';
import router from './router';
import App from './App.vue';
import store from './store';
import { getCookieByKey } from '@/utils/utils';
import { getUserInfo } from '@/api';

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

new VConsole();
console.info('hello vconsole');

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
// const isWeixin = true;
// Vue.prototype.$isWeixin = isWeixin;
// Vue.prototype.$wxVersion = 7.04;

console.info('in wechat: ', Vue.prototype.$isWeixin, Vue.prototype.$wxVersion);
Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  // const uid = getCookieByKey('uid');
  // TODO: 测试代码
  const uid = getCookieByKey('uid'); // || 'abda333dc62a6cfc';
  console.info('---------uid', uid);
  if (store.state.user.uid === uid) {
    next();
    return;
  }
  if (!uid) {
    if (isWeixin) {
      // 跳去授权
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa8f514537d6829d0&redirect_uri=http%3A%2F%2Fshop.npnet66.com%2Fshop%2Fapi%2Fweixin%2FgetUserInfo%3Furl%3Dhttp%3A%2F%2Fshop.npnet66.com%2F&response_type=code&scope=snsapi_userinfo&state=';
    }
  } else {
    // 获取用户信息
    getUserInfo(uid).then(r => {
      console.info(router);
      if (!r.status !== 'error') {
        store.commit('setUserInfo', r.data);
      } else {
        throw r;
      }
    }).catch(err => {
      console.error(err);
    });
  }
  store.dispatch('saveUid', uid);
  next();
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');
