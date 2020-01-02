<template>
  <div class="p-home" :class="{ fixed: showSearch }">
    <div class="c-home-nav">
      <div class="c-home-vip" @click="tapBeVip">
        <i class="iconfont icon-vip1"></i> 立即成为会员
      </div>
      <div class="c-home-nav__right">
        <router-link to="/search" class="c-home-nav__search"><i class="c-icon iconfont icon-sousuo1"></i>搜索</router-link>
        <router-link to="/city" class="c-home-nav__location">{{ selectedAddress.name }}<i class="c-icon iconfont icon-icon-test2"></i></router-link>
      </div>
    </div>
    <div class="spinner" v-if="firstIn"></div>
    <div class="c-home-main" v-else>
      <div class="c-home-carousel">
        <!-- 图片轮播图预留位置 -->
        <swiper v-if="bannerList.length > 0" :options="swiperOption" ref="mySwiper">
          <!-- slides -->
          <swiper-slide v-for="(banner, index) in bannerList" :key="index">
            <div @click="tapBanner(banner)" class="p-home-banner__img" :style="{ 'background-image': 'url(' + banner.img_main + ')' }"></div>
          </swiper-slide>
        </swiper>
      </div>
      <div class="c-home-type">
        <div class="c-home-item" @click="tapType('new')">
          <img src="../../assets/images/zuixin.jpg" />
          <p>最新</p>
        </div>
        <div class="c-home-item" @click="tapType('food')">
          <img src="../../assets/images/meishi.jpg" />
          <p>美食</p>
        </div>
        <div class="c-home-item" @click="tapType('scenic')">
          <img src="../../assets/images/jingqu.jpg" />
          <p>景区</p>
        </div>
        <div class="c-home-item" @click="tapType('hotel')">
          <img src="../../assets/images/jiudian.jpg" />
          <p>酒店</p>
        </div>
      </div>
      <template v-if="!loading">
        <div class="c-home-product__list" v-if="productList.length > 0" @scroll="handleScroll">
          <product-item
            @tapItem="tapProduct"
            v-for="(product, index) in productList"
            :key="index"
            :product="product"
            @tapPoster="handleShowPoster"
          />
        </div>
        <div class="c-home-product__none" v-else>
          <i class="iconfont icon-zanwushuju"></i>
          <p>暂无数据</p>
        </div>
        <div v-show="totalCount !== productList.length" class="g-loadmore">正在加载更多...</div>
      </template>
      <div class="c-home-loading"></div>
    </div>
    <poster :imgSrc="posterImg" :show="showPoster" @tapPoster="handleTapPoster" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getProductList, getBannerInfo, getHomeType } from '@/api';
import ProductItem from '@/components/product-item/product-item';
import Poster from '@/components/poster/poster';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  components: { ProductItem, Poster, swiper, swiperSlide },

  data() {
    return {
      productList: [],
      loading: true,
      showSearch: false,
      productName: '',
      searchList: [],
      nextpage: 1,
      totalCount: 0,
      firstIn: true,
      posterImg: '',
      showPoster: false,
      bannerList: [], // 轮播图
      swiperOption: {
        notNextTick: true,
        // 循环
        loop: true,
        // 设定初始化时slide的索引
        initialSlide: 0,
        // 自动播放
        autoplay: true,
        // 设置轮播
        effect: 'slide',
        // 滑动速度
        speed: 500,
        // 滑动方向
        direction: 'horizontal',
        // 小手掌抓取滑动
        grabCursor: true,
        // 滑动之后回调函数
        on: {
          slideChangeTransitionEnd: function() {
            // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
          },
        }
      },
    };
  },

  computed: {
    ...mapState({
      selectedAddress: state => state.user.selectedAddress
    })
  },

  watch: {
    selectedAddress: {
      deep: true,
      immediate: true,
      handler(val) {
        if (val.pvovinceId) {
          this.requestHomeInfo();
        }
      }
    }
  },
  mounted() {
    const scrollView = document.querySelector('.l-tabbar-layout');
    scrollView.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    const scrollView = document.querySelector('.l-tabbar-layout');
    scrollView && scrollView.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions(['updateAddress']),
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
    requestHomeInfo() {
      return Promise.all([this.requestProductList(), this.requestBanner()]).then(r => {
        this.firstIn = false;
        this.loading = false;
      }).catch(err => {
        console.error(err);
        this.firstIn = false;
        this.loading = false;
      });
    },
    requestBanner() {
      return getBannerInfo({
        province: this.selectedAddress.pvovinceId,
        city: this.selectedAddress.cityId,
      }).then(r => {
        console.info('banner info: ', r);
        if (r.status === 'ok') {
          this.bannerList = r.data.result.result.rows;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    requestType() {
      return getHomeType({
        province: this.selectedAddress.pvovinceId,
        city: this.selectedAddress.cityId,
      }).then(r => {
        console.info('type info: ', r);
        if (r.status === 'ok') {
          this.bannerList = r.data.result.result.rows;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    requestProductList(data) {
      return getProductList({
        province: this.selectedAddress.pvovinceId,
        city: this.selectedAddress.cityId,
        // pagenumber: this.currentPage,
        // pagesize: 10,
        pagenumber: 10,
        pagesize: this.nextpage,
        ...data
      }).then(r => {
        // this.firstIn = false;
        console.info(r);
        this.totalCount = r.result.totalcount;
        this.productList = [...this.productList, ...r.result.rows];
        // this.loading = false;
      }).catch(err => {
        // this.firstIn = false;
        // this.loading = false;
      });
    },
    tapBanner(banner) {
      this.$router.push({ name: 'detail', params: { id: banner.id } });
    },
    tapProduct(product) {
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
    },
    tapBeVip() {
      console.info('成为会员');
      this.$router.push('/vip');
    },
    handleShowPoster(posterImg) {
      this.posterImg = posterImg;
      this.showPoster = true;
    },
    handleTapPoster() {
      this.showPoster = false;
    },
    tapType(type) {
      this.$router.push(`/product-list?type=${type}`);
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

.c-home-vip {
  color: $main_color;
  height: 100%;
  display: flex;
  align-items: center;
  .iconfont {
    font-size: 26px;
    margin-right: 10px;
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

.p-home-banner__img {
  width: 100%;
  height: 170px;
  background-repeat: no-repeat;
  background-size: cover;
}
@media screen and (min-width: 320px) {
  .p-home-banner__img {
    height: 160px;
  }
}
@media screen and (min-width: 375px) {
  .p-home-banner__img {
    height: 170px;
  }
}

@media screen and (min-width: 414px) {
  .p-home-banner__img {
    height: 200px;
  }
}

@media screen and (min-width: 500px) {
  .p-home-banner__img {
    height: 220px;
  }
}

@media screen and (min-width: 580px) {
  .p-home-banner__img {
    height: 240px;
  }
}

@media screen and (min-width: 680px) {
  .p-home-banner__img {
    height: 280px;
  }
}
.c-home-type {
  padding: 16px 0;
  width: 100%;
  display: flex;
  .c-home-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 46%;
      margin-bottom: 10px;
    }
    p {
      font-size: 13px;
    }
  }
}
.c-home-product__list {
  border-top: 10px solid #eee;
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

</style>
