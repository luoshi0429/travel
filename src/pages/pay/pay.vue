<template>
  <div class="p-pay">
    <div class="p-pay-panel">
      <div class="p-pay-section p-pay-desc">
        <p class="title">订单描述</p>
        <h2>{{ detail.name }}</h2>
        <p class="sku">
          <span>规格</span> {{ skuTitle }}:{{ sku.sku_text }}
        </p>
      </div>
      <div class="p-pay-section p-pay-contact">
        <p class="title">订单联系人</p>
        <div>
          <div class="p-pay-formcontrol">
            <p><span class="asterisk">*</span>姓名</p>
            <input v-model="name" placeholder="请输入姓名" />
          </div>
          <div class="p-pay-formcontrol">
            <p><span class="asterisk">*</span>手机</p>
            <input v-model="phoneNumber" type="number" placeholder="请输入手机号码" />
          </div>
        </div>
      </div>
      <div class="p-pay-section p-pay-count">
        <div class="p-pay-count-cell">
          <p>购买数量</p>
          <div class="p-pay-count-cell__right p-pay-count-input">
            <button @click="tapMinus"><i class="iconfont icon-minus1"></i></button>
            <input v-model="buyCount" placeholder="数量" />
            <button @click="tapPlus"><i class="iconfont icon-cc-plus-crude"></i></button>
          </div>
        </div>
        <div class="p-pay-count-cell">
          <p>备注</p>
          <div class="p-pay-count-cell__right">
            <input placeholder="输入备注" />
          </div>
        </div>
      </div>
      <div class="p-pay-section p-pay-payments">
        <div class="p-pay-payment-cell">
          <p>支付方式</p>
          <p>微信支付 <i class="iconfont icon-icon-test3"></i></p>
        </div>
        <!-- <div class="p-pay-payment-cell">
          <p>优惠券</p>
          <p>没有可以使用的优惠券哦~ <i class="iconfont icon-icon-test3"></i></p>
        </div> -->
      </div>
    </div>
    <div class="p-pay-footer">
      <div class="p-pay-footer-total">合计：<em v-if="sku.price">{{ sku.price * buyCount }}</em></div>
      <button class="p-pay-footer-btn" @click="tapWechatPay">微信支付</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getProductDetail, getProductSku, confirmOrder } from '@/api';

export default {
  data() {
    const { id, skuId } = this.$route.query;
    return {
      buyCount: 1,
      detail: {},
      productId: id,
      skuId,
      sku: {},
      skuTitle: '',
      name: '',
      phoneNumber: ''
    };
  },
  computed: {
    ...mapState({
      uid: state => state.user.uid
    })
  },
  mounted() {
    Promise.all([getProductDetail(this.productId), getProductSku({
      product_id: this.productId,
      sku_id: this.skuId
    })]).then(r => {
      console.log(r);
      const detail = r[0].result;
      if (!detail) {
        throw detail;
      }
      this.detail = detail;
      // this.sku = r[1];
      // TODO: 利用接口数据
      this.skuTitle = detail.skugrups[0].text;
      const sku = detail.skugrups[0].skus.filter(s => {
        return s.sku_id === this.skuId;
      });
      this.sku = sku[0];
    }).catch(err => {
      console.error(err);
    });
  },
  methods: {
    tapMinus() {
      if (this.buyCount <= 1) {
        return;
      }
      this.buyCount -= 1;
    },
    tapPlus() {
      // 大于库存
      if (this.buyCount >= this.sku.quantity) {
        return;
      }
      this.buyCount += 1;
    },
    tapWechatPay() {
      // 判断是否在微信内 同时微信版本 超过5
      if (this.$isWechat && this.$wxVersion > 5) {
        confirmOrder({
          product_id: this.productId,
          sku_id: this.skuId,
          buy_count: this.buyCount,
          uid: this.uid,
          customer_name: this.name,
          customer_mobile: this.phoneNumber
        }).then(res => {
          console.info(res);
          const invodeWechatPay = () => {
            //   {"timestamp":"1572227537","result_code":"SUCCESS","sign":"5660768E2E33565F0AE000BB1FBE9846","mch_id":"1481612142","prepay_id":"wx28095217311817958f09a9ef1197993500","return_msg":"OK","package":"WXPay","appid":"wxa8f514537d6829d0","nonce_str":"hvNrk3mwyNi3DoSM","return_code":"SUCCESS","trade_type":"JSAPI"}
            window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
              ...res
            }, function(res) {
              console.info(res);
              if (res.err_msg === 'get_brand_wcpay_request:ok') {
                alert('支付成功');
              } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                alert('支付失败');
              }
            });
          };
          if (typeof WeixinJSBridge == 'undefined') {
            document.addEventListener('WeixinJSBridgeReady', () => {
              invodeWechatPay();
            }, false);
          } else {
            invodeWechatPay();
          }
        }, (err) => {
          console.error(err);
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.asterisk {
  color: red;
}
.p-pay {
  background: #f2f2ff;
  padding: 10px;
  height: 100%;
  padding-bottom: 48px;
}

.p-pay-section {
  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 16px;
  .title {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
  }
}

.p-pay-desc {
  padding: 15px;
  h2 {
    font-size: 16px;
  }
  .sku {
    margin-top: 15px;
    color: #777;
    font-size: 14px;
    span {
      display: inline-block;
      background: #f2f2ff;
      // color: #999;
      padding: 4px 12px;
      border-radius: 20px;
      margin-right: 4px;
    }
  }
}

.p-pay-contact {
  padding-bottom: 0;
  .title {
    padding: 15px 15px 0;
    margin-bottom: 10px;
  }
}
.p-pay-formcontrol {
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 10px;
  input {
    font-size: 16px;
    margin-left: 30px;
    flex: 1;
    height: 28px;
  }

  &:last-of-type {
    border-bottom: none;
  }
}

.p-pay-count-cell {
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  &__right {
    margin-left: 20px;
    flex: 1;
    input {
      font-size: 16px;
    }
  }
  .p-pay-count-input {
    display: flex;
    align-items: center;
    height: 40px;
    border-radius: 4px;
    button {
      border-radius: 4px;
      width: 40px;
      height: 100%;
      outline: none;
      background: none;
      border: 1px solid #eee;
      &:first-of-type {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &:last-of-type {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    input {
      font-size: 18px;
      width: 60px;
      height: 100%;
      border: 1px solid #eee;
      border-left: none;
      border-right: none;
      text-align: center;
      color: $main_color;
    }
  }
  &:last-of-type {
    border-bottom: none;
  }
}

.p-pay-payment-cell {
  display: flex;
  justify-content: space-between;
  padding: 15px;
}

.p-pay-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 48px;
  background: #272727;
  display: flex;
}
.p-pay-footer-total {
  flex: 1;
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 48px;
  em {
    font-style: normal;
    font-weight: bold;
  }
}
.p-pay-footer-btn {
  width: 110px;
  background: $main_color;
  color: #fff;
  font-size: 16px;
}
</style>
