<template>
  <div class="p-order">
    订单列表
    <order-item />
  </div>
</template>

<script>
import { getOrderList } from '@/api';
import OrderItem from '@/components/order-item/order-item';

export default {
  components: { OrderItem },
  mounted() {
    getOrderList().then(r => {
      console.info(r);
    }).catch(err => {
      console.error(err);
    });
  }
};
</script>
