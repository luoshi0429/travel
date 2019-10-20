<template>
  <div class="p-home">
    <div class="c-home-nav">
      <div></div>
      <div class="c-home-nav__right">
        <div class="c-home-nav__search"><i class="c-icon iconfont icon-sousuo1"></i>搜索</div>
        <router-link to="/city" class="c-home-nav__location">{{ address.cityName }}<i class="c-icon iconfont icon-icon-test2"></i></router-link>
      </div>
    </div>
    <div class="c-home-main">
      <div class="c-home-carousel"></div>
      <template v-if="!loading">
        <div class="c-home-product__list" v-if="productList.length > 0">
          <product-item
            @click.native="tapProduct(product)"
            v-for="product in productList"
            :key="product.id"
            :product="product"
          />
        </div>
        <div class="c-home-product__none" v-else>
          <i class="iconfont icon-zanwushuju"></i>
          <p>暂无数据</p>
        </div>
      </template>
      <div class="c-home-loading"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getProductList } from '@/api';
import ProductItem from '@/components/product-item';

export default {
  components: { ProductItem },

  data() {
    return {
      productList: [],
      loading: true
    };
  },

  computed: {
    ...mapState({
      address: state => state.user.address
    })
  },

  watch: {
    address: {
      deep: true,
      immediate: true,
      handler(val) {
        console.info('watch: ', val);
        this.requestProductList();
      }
    }
  },
  mounted() {
    // 获取当前城市
    this.getCurrentLocation();
  },
  methods: {
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
      }
    },
    getLocationSuccessCallback(position) {
      console.info('####', position);
      // 经度
      const lng = position.coords.longitude || '';
      // 纬度
      const lat = position.coords.latitude || '';
      // 经纬度到地名转换过程
      const geocoder = new window.qq.maps.Geocoder({
        complete(result) {
          console.info(result);
          if (result.detail && result.detail.addressComponents) {
            // 设置当前的地址

          }
        }
      });
      const coord = new window.qq.maps.LatLng(lat, lng);
      geocoder.getAddress(coord);
    },
    getLocationFailedCallback(err) {
      console.error(err);
      // 设置默认为广东 广州
    },
    requestProductList() {
      getProductList({
        province: this.address.province,
        city: this.address.city
      }).then(r => {
        console.info(r);
        this.productList = r.result.rows;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
      });
    },
    tapProduct(product) {
      // this.$router.push(`/detail/${product.id}`);
      this.$router.push({ name: 'detail', params: { id: product.id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.p-home {
  padding-top: 48px;
}

.c-home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  z-index: 9999;
  padding: 0 12px;
  display: flex;
  background: #fff;
  justify-content: space-between;
  box-shadow: 0 2px 5px #ddd;
  &__right {
    height: 100%;
    display: flex;
    align-items: center;
  }
  &__search {
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    border-radius: 30px;
    background: #f2f2f2;;
    padding: 0 8px;
    color: #999;
    .iconfont {
      font-size: 14px;
      margin-right: 4px;
    }
  }
  &__location {
    color: #333;
    margin-left: 12px;
  }
}

.c-home-product__list {
  padding: 20px;
}

.c-home-product__none {
  padding-top: 30%;
  text-align: center;
  .iconfont {
    display: inline-block;
    font-size: 80px;
    margin-bottom: 10px;
  }
}
</style>
