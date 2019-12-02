<template>
  <router-view class="g-page" />
</template>

<script>
import { mapState, mapActions } from 'vuex';
// import { getCookieByKey } from '@/utils/utils';
// import { getUserInfo } from '@/api';
import cities from '@/assets/cities.js';

export default {
  name: 'app',
  components: {
  },
  computed: {
    ...mapState({
      selectedAddress: state => state.user.selectedAddress,
      uid: state => state.user.uid
    })
  },
  mounted() {
    // const uid = getCookieByKey('uid');
    // // TODO: 测试代码
    // // const uid = '69dd4f79d42addd3';
    // if (!uid) {
    //   if (this.$isWeixin) {
    //     // 跳去授权
    //     window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa8f514537d6829d0&redirect_uri=http%3A%2F%2Fshop.npnet66.com%2Fshop%2Fapi%2Fweixin%2FgetUserInfo%3Furl%3Dhttp%3A%2F%2Fshop.npnet66.com%2F&response_type=code&scope=snsapi_userinfo&state=';
    //   }
    // } else {
    //   // 获取用户信息
    //   getUserInfo(uid).then(r => {
    //     console.info(r);
    //     if (!r.status !== 'error') {
    //       this.$store.commit('setUserInfo', r.data);
    //     } else {
    //       throw r;
    //     }
    //   }).catch(err => {
    //     console.error(err);
    //   });
    // }
    // // 保存uid
    // this.$store.dispatch('saveUid', uid);

    if (!this.selectedAddress.city) {
      // 获取当前城市
      this.getCurrentLocation();
    }
  },
  methods: {
    ...mapActions(['updateAddress']),
    configWx(data) {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonceStr, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名，见附录1
        jsApiList: ['hideMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });

      // 微信分享
      wx.ready(function() {
        const shareData = {
          title: '',
          desc: '',
          imgUrl: '',
          link: '',
          success: function() {

          },
          cancel: function() {

          }
        };
        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareAppMessage(shareData);
      });
    },
    // 获取当前城市
    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.getLocationSuccessCallback, this.getLocationFailedCallback, {
          // 指示浏览器获取高精度的位置，默认为false
          enableHighAccuracy: true,
          // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
          timeout: 5000,
          // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
          maximumAge: 100000
        });
      } else {
        // 设置默认为广东 广州
        this.setDefaultCity();
      }
    },
    getLocationSuccessCallback(position) {
      // 经度
      const lng = position.coords.longitude || '';
      // 纬度
      const lat = position.coords.latitude || '';
      // TODO: 测试代码
      // const lng = 116.404;
      // const lat = 39.915;
      // 创建地理编码实例
      const myGeo = new window.BMap.Geocoder();
      // 根据坐标得到地址描述
      myGeo.getLocation(new window.BMap.Point(lng, lat), (result) => {
        // 如果解析成功，则回调函数的参数为GeocoderResult对象，否则为null。
        if (result) {
          const addrComp = result.addressComponents;
          const address = this.parseCityInfo(addrComp.province, addrComp.city);
          if (address) {
            this.updateAddress(address);
          } else {
            this.setDefaultCity();
          }
        } else {
          // 解析失败
          this.setDefaultCity();
        }
      });
    },

    parseCityInfo(province, curCity) {
      // 获取首字母
      const letter = window.pinyinUtil.getFirstLetter(curCity)[0];
      let inLetterCities = [];
      for (let i = 0; i < cities.length; i++) {
        const letterCity = cities[i];
        if (letterCity.letter === letter) {
          inLetterCities = letterCity.cities;
          break;
        }
      }

      if (inLetterCities.length) {
        for (let i = 0; i < inLetterCities.length; i++) {
          const city = inLetterCities[i];
          if (curCity.indexOf(city.name) >= 0) {
            return {
              name: city.name,
              cityId: city.cityId,
              pvovinceId: city.pvovinceId
            };
          }
        }
      }
      return null;
      // 找到对应省份 城市的id
    },
    getLocationFailedCallback(err) {
      // 设置默认为广东 广州
      this.setDefaultCity();
    },
    setDefaultCity() {
      this.updateAddress({
        name: '广州',
        cityId: 1292,
        pvovinceId: 29
      });
    },
  }
};
</script>

<style>
html, body {
  height: 100%;
}
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #555;
  max-width: 680px;
  margin: 0 auto;
}
</style>
