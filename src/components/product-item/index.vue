<template>
  <div class="c-product-item">
    <div class="c-product-item__top">
      <img :src="product.img_main || product.img_main_small" />
      <span class="c-product-item__top__sale">已售{{ product.saled_num }}</span>
      <div class="c-product-item__top__countdown">
        距结束仅剩<span></span>天<span></span>:<span></span>:<span></span>
      </div>
    </div>
    <div class="c-product-item__bottom">
      <h4>{{ product.name }}</h4>
      <div class="c-product-item__bottom__price">
        <p>¥<span>{{ product.price }}</span></p>
        <button class="btn" @tap="tapPoster">海报</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  methods: {
    tapPoster() {
      this.$emit('tapPoster', this.product.img_poster);
    }
  }
};
</script>

<style lang="scss" scoped>
.c-product-item {
  border: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
}

.c-product-item__top {
  position: relative;
  // padding: 4px 6px 0;
  img {
    width: 100%;
  }
  &__sale {
    position: absolute;
    left: 0;
    top: 10px;
    height: 18px;
    line-height: 18px;
    padding: 0 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
  }
  &__countdown {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 20px;
    line-height: 20px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    span {
      display: inline-block;
      padding: 3px 2px;
    }
  }
}

.c-product-item__bottom {
  padding: 8px 10px 0;
  h4 {
    font-size: 16px;
    margin-bottom: 16px;
  }
  &__price {
    display: flex;
    justify-content: space-between;
    color: #d25226;
    p {
      span {
        font-size: 22px;
      }
    }
    .btn {
      color: #d25226;
      border: 1px solid #d25226;;
      font-size: 14px;
      padding: 0 18px;
      height: 24px;
      border-radius: 22px;
    }
  }
}
</style>
