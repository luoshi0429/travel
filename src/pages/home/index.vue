<template>
  <div class="p-home">
    <div class="c-home-nav">
      <div></div>
      <div class="c-home-nav__right">
        <div class="c-home-nav__search"><i class="c-icon iconfont icon-sousuo1"></i>搜索</div>
        <div class="c-home-nav__location">广州<i class="c-icon iconfont icon-icon-test2"></i></div>
      </div>
    </div>
    <div class="c-home-main">
      <div class="c-home-carousel"></div>
      <div class="c-home-"></div>
      <div class="c-home-"></div>
      <div class="c-home-product__list">
        <product-item v-for="product in productList" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { getProductList } from '@/api';
import ProductItem from '@/components/product-item';

export default {
  components: { ProductItem },

  data() {
    return {
      productList: []
    };
  },
  mounted() {
    this.requestProductList();
  },
  methods: {
    requestProductList() {
      getProductList()
        .then(r => {
          console.info(r);
          this.productList = r.result.rows;
        });
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
    margin-left: 12px;
  }
}

.c-home-product__list {
  padding: 20px;
}
</style>
