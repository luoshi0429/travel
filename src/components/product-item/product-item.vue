<template>
  <div class="c-product-item" @click="tapItem">
    <div class="c-product-item__top">
      <img :src="product.img_main || product.img_main_small" />
      <span class="c-product-item__top__sale">已售{{ product.saled_num }}</span>
      <div class="c-product-item__top__countdown" v-if="product.end_time">
        距结束仅剩<span>{{ leftInfo.day }}</span>天<span>{{ leftInfo.hour }}</span>:<span>{{ leftInfo.minute }}</span>:<span>{{ leftInfo.second }}</span>
      </div>
    </div>
    <div class="c-product-item__bottom">
      <h4>{{ product.name }}</h4>
      <div class="c-product-item__bottom__price">
        <p>¥<span>{{ product.price }}</span></p>
        <button v-if="product.img_poster" class="btn" @click.stop="tapPoster">海报</button>
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

  watch: {
    product: {
      handler(val) {
        if (!val.end_time) return;
        const endDate = new Date(val.end_time.replace(/-/g, '/')).getTime();
        if (this.countTimer) {
          clearInterval(this.countTimer);
          this.countTimer = null;
        }
        this.countTimer = setInterval(() => {
          const now = Date.now();
          const leftSec = (endDate - now) / 1000;
          if (leftSec <= 0) {
            clearInterval(this.countTimer);
            this.countTimer = null;
            this.buyEnd = true;
            return;
          }
          const day = this.appendZero(Math.floor(leftSec / 60 / 60 / 60 % 60));
          this.leftInfo = {
            day: day > 99 ? '99+' : day,
            hour: this.appendZero(Math.floor(leftSec / 60 / 60 % 60)),
            minute: this.appendZero(Math.floor(leftSec / 60 % 60)),
            second: this.appendZero(Math.floor(leftSec % 60))
          };
        }, 1000);
      },
      deep: true,
      immediate: true
    }
  },

  data() {
    return {
      buyEnd: false,
      leftInfo: {}
    };
  },

  methods: {
    tapItem() {
      this.$emit('tapItem', this.product);
    },
    tapPoster() {
      this.$emit('tapPoster', this.product.img_poster);
    },
    appendZero(num) {
      return num < 10 ? ('0' + num) : num;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.c-product-item {
  border: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  &:last-of-type {
    margin-bottom: 0;
  }
}

.c-product-item__top {
  position: relative;
  // padding: 4px 6px 0;
  img {
    width: 100%;
    min-height: 120px;
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
      line-height: 16px;
      width: 22px;
      text-align: center;
      margin: 0 3px;
      background: $main_color;
      border-radius: 2px;
    }
  }
}

.c-product-item__bottom {
  padding: 8px 10px 0;
  h4 {
    font-size: 14px;
    margin-bottom: 16px;
    line-height: 1.4;
  }
  &__price {
    display: flex;
    justify-content: space-between;
    color: $main_color;
    p {
      span {
        font-size: 20px;
        font-weight: 500;
        margin-left: 1px;
      }
    }
    .btn {
      color: $main_color;
      border: 1px solid $main_color;
      font-size: 14px;
      padding: 0 18px;
      height: 24px;
      border-radius: 22px;
    }
  }
}
</style>
