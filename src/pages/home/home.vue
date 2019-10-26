<template>
  <div class="p-home" :class="{ fixed: showSearch }">
    <div class="c-home-nav">
      <div></div>
      <div class="c-home-nav__right">
        <!-- <div class="c-home-nav__search" @click="tapShowSearch"><i class="c-icon iconfont icon-sousuo1"></i>搜索</div> -->
        <router-link to="/search" class="c-home-nav__search"><i class="c-icon iconfont icon-sousuo1"></i>搜索</router-link>
        <router-link to="/city" class="c-home-nav__location">{{ address.cityName }}<i class="c-icon iconfont icon-icon-test2"></i></router-link>
      </div>
    </div>
    <div class="c-home-main">
      <div class="c-home-carousel"></div>
      <template v-if="!loading">
        <div class="c-home-product__list" v-if="productList.length > 0" @scroll="handleScroll">
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
        <div v-show="totalCount !== productList.length" class="c-loadmore">正在加载更多...</div>
      </template>
      <div class="c-home-loading"></div>
    </div>
    <!-- <div class="c-search-panel" v-if="showSearch">
      <div class="c-search-header">
        <button class="back-btn" @click="tapCloseSearch">返回</button>
        <div class="c-search-input">
          <i class="iconfont icon-sousuo1"></i>
          <input placeholder="搜索" v-model="productName" />
          <i class="iconfont icon-close1"></i>
        </div>
        <button class="search-btn" @click="handleSearch">搜索</button>
      </div>
      <div class="c-search-list" v-if="searchList.length">
        <div
          v-for="(search, index) in searchList"
          :key="index"
          class="c-search-product"
          @click="tapProduct(search)"
        >
          <div class="c-search-product__img" :style="{ backgroundImage: 'url(' + search.img_main_small + ')' }"></div>
          <div class="c-search-product__info">
            <p class="g-multiline title">{{ search.name }}</p>
            <p class="price"><span>¥{{ search.price }}</span>起</p>
          </div>
        </div>
      </div>
      <div class="c-search-list-none" v-else>请输入商品搜索</div>
    </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getProductList } from '@/api';
import ProductItem from '@/components/product-item/product-item';

export default {
  components: { ProductItem },

  data() {
    return {
      productList: [],
      loading: true,
      showSearch: false,
      productName: '',
      searchList: [],
      nextpage: 1,
      totalCount: 0
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
        this.requestProductList();
      }
    }
  },
  mounted() {
    // 获取当前城市
    this.getCurrentLocation();
    const scrollView = document.querySelector('.l-tabbar-layout');
    scrollView.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll(e) {
      if (this.totalCount === this.productList.length) return;
      const list = document.querySelector('.c-home-product__list');
      const scrollView = document.querySelector('.l-tabbar-layout');
      if (!list) return;
      if (list.offsetHeight - (scrollView.scrollTop + scrollView.offsetHeight - 48) < 100) {
        if (this.isLoadMore) return;
        console.log('next page');
        this.isLoadMore = true;
        this.nextpage += 1;
        this.requestProductList().then(() => {
          this.isLoadMore = false;
        }).catch(() => {
          this.isLoadMore = false;
        });
      }
    },
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
    requestProductList(data) {
      return getProductList({
        province: this.address.province,
        city: this.address.city,
        // pagenumber: this.currentPage,
        // pagesize: 10,
        pagenumber: 10,
        pagesize: this.nextpage,
        ...data
      }).then(r => {
        console.info(r);
        this.totalCount = r.result.totalcount;
        this.productList = [...this.productList, ...r.result.rows];
        this.loading = false;
      }).catch(err => {
        this.loading = false;
      });
    },
    tapProduct(product) {
      // this.$router.push(`/detail/${product.id}`);
      this.$router.push({ name: 'detail', params: { id: product.id } });
    },

    tapShowSearch() {
      this.showSearch = true;
    },
    tapCloseSearch() {
      this.showSearch = false;
    },
    handleSearch() {
      if (!this.productName) return;
      getProductList({
        province: this.address.province,
        city: this.address.city,
        product_name: this.productName
      }).then(r => {
        console.info(r);
        this.searchList = r.result.rows;
      }).catch(err => {
        console.error(err);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.p-home {
  padding-top: 48px;
  &.fixed {
    position: fixed;
  }
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
  padding: 20px 20px 0;
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

.c-loadmore {
  line-height: 44px;
  text-align: center;
  color: #999;
  font-size: 12px;
}
// // 搜索
// .c-search-panel {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background: #fff;
//   z-index: 99999;
//   .c-search-header {
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 48px;
//     background: #eee;
//     overflow: hidden;
//     display: flex;
//     align-items: center;
//     button {
//       outline: none;
//       background: transparent;
//       margin: 0 10px;
//       font-size: 14px;
//       font-weight: bold;
//     }
//     .back-btn {
//       color: #72a921;
//     }
//     .search-btn {
//       background: $main_color;
//       color: #fff;
//       padding: 4px;
//       border-radius: 4px;
//     }
//   }
//   .c-search-input {
//     flex: 1;
//     position: relative;
//     input {
//       font-size: 14px;
//       height: 28px;
//       border: none;
//       padding: 0 30px;
//       background: #fff;
//       width: 100%;
//       border-radius: 4px;
//     }
//     .iconfont {
//       position: absolute;
//       top: 6px;
//     }
//     .icon-sousuo1 {
//       left: 5px;
//     }
//     .icon-close1 {
//       right: 5px;
//       color: #999;
//     }
//   }
//   .c-search-list {
//     padding-top: 50px;
//     height: 100%;
//     overflow-y: auto;
//   }
//   .c-search-list-none {
//     padding-top: 100px;
//     text-align: center;
//   }
//   .c-search-product {
//     display: flex;
//     padding: 15px;
//     border-bottom: 1px solid #eee;
//     img {
//       height: 110px;
//       width: 110px;
//       border-bottom: 4px;
//     }
//     &__img {
//       height: 110px;
//       width: 110px;
//       background-repeat: no-repeat;
//       background-size: contain;
//       border-radius: 4px;
//     }
//     &__info {
//       margin-left: 15px;
//       flex: 1;
//       display: flex;
//       flex-direction: column;
//       justify-content: space-between;
//       .price {
//         font-size: 12px;
//         color: #999;
//         span {
//           color: $main_color;
//           font-size: 16px;
//         }
//       }
//     }
//   }
// }
</style>
