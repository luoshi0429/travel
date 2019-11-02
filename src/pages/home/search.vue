<template>
  <div class="c-search-panel" ref="searchPage">
    <div class="c-search-header">
      <button class="back-btn" @click="tapCloseSearch">返回</button>
      <div class="c-search-input">
        <i class="iconfont icon-sousuo1"></i>
        <input placeholder="搜索" v-model="productName" />
        <i v-show="productName.length" class="iconfont icon-close1" @click="tapCleanInput"></i>
      </div>
      <button class="search-btn" @click="handleSearch">搜索</button>
    </div>
    <div class="c-search-list" v-if="searchList.length" ref="searchList">
      <div
        v-for="(search, index) in searchList"
        :key="index"
        class="c-search-product"
        @click="tapProduct(search)"
      >
        <div class="c-search-product__img" :style="{ backgroundImage: 'url(' + search.img_main + ')' }"></div>
        <div class="c-search-product__info">
          <p class="g-multiline title">{{ search.name }}</p>
          <p class="price"><span>¥{{ search.price }}</span>起</p>
        </div>
      </div>
      <div v-show="totalCount !== searchList.length" class="g-loadmore">正在加载更多...</div>
    </div>
    <div class="c-search-list-none" v-else>请输入商品搜索</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getProductList } from '@/api';

export default {
  data() {
    return {
      productName: '',
      searchList: [],
      totalCount: 0,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState({
      selectedAddress: state => state.user.selectedAddress
    })
  },
  mounted() {
    this.$searchPage = this.$refs.searchPage;
    this.$searchPage.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll(e) {
      if (this.totalCount === this.searchList.length) return;
      const list = this.$refs.searchList;

      if (!list) return;
      if (list.offsetHeight - (this.$searchPage.scrollTop + this.$searchPage.offsetHeight - 48) < 100) {
        if (this.isLoadMore) return;
        console.log('next page');
        this.isLoadMore = true;
        this.currentPage += 1;
        this.requestProductList().then(() => {
          this.isLoadMore = false;
        }).catch(() => {
          this.isLoadMore = false;
        });
      }
    },
    tapCloseSearch() {
      this.$router.back();
    },
    handleSearch() {
      if (!this.productName) {
        this.searchList = [];
        return;
      }
      this.currentPage = 1;
      this.requestProductList();
    },
    requestProductList(data) {
      if (this.loading) return;
      this.loading = true;
      return getProductList({
        province: this.selectedAddress.province,
        city: this.selectedAddress.city,
        product_name: this.productName,
        pagenumber: 10,
        pagesize: this.currentPage,
      }).then(r => {
        this.loading = false;
        if (r.result) {
          const { rows, totalcount } = r.result;
          if (this.currentPage === 1) {
            const $searchList = this.$refs.searchList;
            $searchList && $searchList.scrollIntoView({
              behavior: 'instant'
            });
          }
          this.searchList = this.currentPage === 1 ? rows : this.searchList.concat(rows);
          this.totalcount = totalcount;
        } else {
          throw r;
        }
      }).catch(err => {
        console.error(err);
        this.loading = false;
      });
    },
    tapProduct(product) {
      this.$router.push({ name: 'detail', params: { id: product.id } });
    },
    tapCleanInput() {
      this.productName = '';
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

// 搜索
.c-search-panel {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 99999;
  overflow-y: scroll;
  .c-search-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 48px;
    background: #eee;
    overflow: hidden;
    display: flex;
    align-items: center;
    button {
      outline: none;
      background: transparent;
      margin: 0 10px;
      font-size: 14px;
      font-weight: bold;
    }
    .back-btn {
      color: #72a921;
    }
    .search-btn {
      background: $main_color;
      color: #fff;
      padding: 4px;
      border-radius: 4px;
    }
  }
  .c-search-input {
    flex: 1;
    position: relative;
    input {
      font-size: 14px;
      height: 28px;
      border: none;
      padding: 0 30px;
      background: #fff;
      width: 100%;
      border-radius: 4px;
    }
    .iconfont {
      position: absolute;
      top: 6px;
    }
    .icon-sousuo1 {
      left: 5px;
    }
    .icon-close1 {
      right: 5px;
      color: #999;
    }
  }
  .c-search-list {
    padding-top: 50px;
    // height: 100%;
    // overflow-y: auto;
  }
  .c-search-list-none {
    padding-top: 100px;
    text-align: center;
  }
  .c-search-product {
    display: flex;
    padding: 15px;
    border-bottom: 1px solid #eee;
    img {
      height: 110px;
      width: 110px;
      border-bottom: 4px;
    }
    &__img {
      height: 110px;
      width: 110px;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 4px;
    }
    &__info {
      margin-left: 15px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        font-size: 12px;
        color: #999;
        span {
          color: $main_color;
          font-size: 16px;
        }
      }
    }
  }
}

.c-order-none {
  padding-top: 30%;
  text-align: center;
  .iconfont {
    display: inline-block;
    font-size: 80px;
    margin-bottom: 10px;
  }
}
</style>
