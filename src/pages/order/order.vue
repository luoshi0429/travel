<template>
  <div class="p-order">
    <div class="p-order-list" v-if="orderList.length">
      <order-item />
      <order-item />
      <order-item />
    </div>
    <div class="c-order-none" v-else>
      <i class="iconfont icon-zanwushuju"></i>
      <p>暂无订单数据</p>
    </div>
  </div>
</template>

<script>
import { getOrderList } from '@/api';
import OrderItem from '@/components/order-item/order-item';
import { mapState } from 'vuex';

export default {
  components: { OrderItem },
  data() {
    return {
      orderList: []
    };
  },
  computed: {
    ...mapState({
      uid: state => state.user.uid
    })
  },
  watch: {
    uid: {
      immediate: true,
      handler(uid) {
        if (!uid) return;
        getOrderList(this.uid).then(r => {
          console.info(r);
        }).catch(err => {
          console.error(err);
        });
      }
    }
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
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
