<template>
  <div class="c-order-item">
    <!-- <img /> -->
    <div class="c-order-item__content">
      <div class="c-order-item__content__left">
        <p>{{ order.product_name }}</p>
        <p class="desc">订单号：{{ order.id }}</p>
        <p class="desc">下单时间：{{ order.gmt_create }}</p>
        <p class="desc">手机号码：{{ order.customer_mobile }}</p>
        <p class="price">¥<span>{{ order.price }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

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
