<template>
  <div class="c-attention">
    <div class="c-attention-top">
      <img />
      <span class="c-attention-top__sale"></span>
      <div class="c-attention-top__tags">
        <span>景点门票</span>
        <span>儿童乐园</span>
      </div>
    </div>
    <div class="c-attention-bottom">
      <h3>【广州融创雪世界门票】打卡广州新坐标~滑转融创雪世界~世界先进的第四代室内滑雪~220远起</h3>
      <p class="sale-price"><span class="unit">¥</span><span class="price">228</span>起</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.c-attention {

}

.c-attention-top {
  position: relative;
  img {
    width: 100%;
  }
  &__sale {
    position: absolute;
  }
  &__tags {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px;
  }
}

.c-attention-tag {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  border-radius: 18px;
  padding: 0 6px;
}

.c-attention-bottom {
  padding: 10px;
  h3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 16px;
    margin-bottom: 15px;
  }
  .sale-price {
    color: #999;
    span {
      color: $main_color;
    }
    .price {
      font-size: 18px;
    }
  }
}
</style>
