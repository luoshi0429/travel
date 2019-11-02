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
      <div class="c-home-carousel"></div>
      <template v-if="!loading">
        <div class="c-home-product__list" v-if="productList.length > 0" @scroll="handleScroll">
          <product-item
            @click.native="tapProduct(product)"
            v-for="(product, index) in productList"
            :key="index"
            :product="product"
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
      totalCount: 0,
      firstIn: true
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
        if (val.cityId) {
          this.requestProductList();
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
        this.firstIn = false;
        console.info(r);
        this.totalCount = r.result.totalcount;
        this.productList = [...this.productList, ...r.result.rows];
        this.loading = false;
      }).catch(err => {
        this.firstIn = false;
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
    },
    tapBeVip() {
      console.info('成为会员');
      this.$router.push('/vip');
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

</style>
