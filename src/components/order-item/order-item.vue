<template>
  <div class="c-order-item">
    <img />
    <div class="c-order-item__content">
      <div class="c-order-item__content__left">
        <p>商品名称</p>
        <p class="desc">订单号</p>
      </div>
      <p class="price">¥<span>12</span></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.c-order-item {
  padding: 10px 12px;
  border-bottom: 10px solid #efefef;
  background: #fff;
  display: flex;
  align-items: center;
  &:last-of-type {
    border-bottom: none;
  }
  img {
    width: 60px;
    min-height: 60px;
    margin-right: 12px;
  }
  .c-order-item__content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .c-order-item__content__left {
    line-height: 1.5;
    .desc {
      color: #999;
      font-size: 12px;
    }
  }
  .price {
    color: $main_color;
    span {
      font-size: 18px;
    }
  }
}
</style>
