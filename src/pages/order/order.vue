<template>
  <div class="p-order">
    <div class="p-order-list" v-if="orderList.length">
      <order-item
        v-for="(item, index) in orderList"
        :key="index"
        :order="item"
        @click.native="tapOrder(item)"
      />
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
        // TODO:测试代码
        // getOrderList('69dd4f79d42addd3').then(r => {
        getOrderList(this.uid).then(r => {
          console.info(r);
          // r.result.orderInfo = [
          //   {
          //     'gmt_create': '2019-10-28 19:50:47',
          //     'dcount': 1,
          //     'customer_mobile': '18141913200',
          //     'customized': [{ 'name': '订单信息', 'customizeds': [{ 'control': '1', 'name': '姓名', 'value': '韦纯光' }, { 'control': '2', 'name': '手机', 'value': '18141913200' }] }],
          //     'booking_url': 'https://mt.lhs11.com/booking/page/booking/booking2-1.jsp?pid=101787',
          //     'total_price': 0.01,
          //     'mcount': 1,
          //     'customer_note': '',
          //     'rebate_money': 1.15,
          //     'product_code': '49YS8Y',
          //     'product_name': '拼团1',
          //     'pay_way': '3.0',
          //     'product_clazz': 'dzm',
          //     'product_sku': '$买一送一:$9元',
          //     'price': 0.01,
          //     'product_id': 3423,
          //     'distributor_id': 10107804,
          //     'id': '2019102819500879003',
          //     'portal_id': 3001,
          //     'customer_name': '韦纯光',
          //     'odo': '300823256691',
          //     'customer_id': 10107804,
          //     'status': 3
          //   }
          // ];
          this.orderList = r.result.orderInfo;
        }).catch(err => {
          console.error(err);
        });
      }
    }
  },
  mounted() {

  },
  methods: {
    tapOrder(order) {
      this.$router.push({ name: 'detail', params: { id: order.id } });
    }
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
