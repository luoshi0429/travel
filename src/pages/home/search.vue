<template>
  <div class="c-search-panel">
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
        <!-- <img :src="search.img_main_small" /> -->
        <div class="c-search-product__img" :style="{ backgroundImage: 'url(' + search.img_main_small + ')' }"></div>
        <div class="c-search-product__info">
          <p class="g-multiline title">{{ search.name }}</p>
          <p class="price"><span>¥{{ search.price }}</span>起</p>
        </div>
      </div>
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
      searchList: []
    };
  },
  computed: {
    ...mapState({
      address: state => state.user.address
    })
  },
  methods: {
    tapCloseSearch() {
      this.$router.back();
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
    tapProduct(product) {
      this.$router.push({ name: 'detail', params: { id: product.id } });
    },
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
    height: 100%;
    overflow-y: auto;
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
      background-size: contain;
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
</style>
