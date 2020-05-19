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
            <input
              v-model="phoneNumber"
              @input="onPhoneInput"
              type="number"
              placeholder="请输入手机号码"
            />
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
    <div class="p-pay-loading" v-if="isPaying">
      <div class="loading-spinner">
      </div>
      <p>支付中...</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable quotes */
import { mapState } from 'vuex';
import { getProductDetail, getProductSku, confirmOrder, weixinJsapi, h5Pay } from '@/api';
import { isPhone } from '@/utils/utils';

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
      phoneNumber: '',
      isPaying: false
    };
  },
  computed: {
    ...mapState({
      uid: state => state.user.uid,
      openid: state => state.user.info.openid
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
    onPhoneInput() {
      if (this.phoneNumber.length > 11) {
        this.phoneNumber = this.phoneNumber.slice(0, 11);
      }
    },
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
      // 判断是否输入姓名 手机
      if (!this.name) {
        this.$toast('请输入姓名');
        return;
      }
      if (!this.phoneNumber) {
        this.$toast('请输入手机号码');
        return;
      }
      // 判断是否为手机号
      if (!isPhone) {
        this.$toast('请输入正确的手机号码');
        return;
      }
      // 判断是否在微信内 同时微信版本 超过5
      console.info(this.$isWeixin, this.$wxVersion);
      this.isPaying = true;
      confirmOrder({
        product_id: this.productId,
        sku_id: this.skuId,
        buy_count: this.buyCount,
        uid: this.uid,
        customer_name: this.name,
        customer_mobile: this.phoneNumber
      }).then(res => {
        console.info(res, this.openid);
        if (res.result && res.result.status) {
          if (this.$isWeixin) {
            if (!this.$wxVersion > 5) {
              this.$toast('微信版本太低，请升级');
              return;
            }
            weixinJsapi({ openid: this.openid, orderId: res.result.orderId }).then(r => {
              r = r.data;
              // const that = this;
              const invodeWechatPay = () => {
                window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
                  "appId": r.appid,
                  "timeStamp": r.timestamp,
                  "nonceStr": r.nonce_str,
                  "package": 'prepay_id=' + r.prepay_id,
                  "signType": "MD5",
                  "paySign": r.sign
                }, (res) => {
                  console.info('getBrandWCPayRequest: ', res);
                  if (res.err_msg === 'get_brand_wcpay_request:ok') {
                    this.$toast('支付成功');
                    setTimeout(() => {
                      this.$router.push({
                        path: '/order'
                      });
                      this.isPaying = false;
                    }, 1000);
                  } else {
                    this.$toast('支付失败');
                    this.isPaying = false;
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
            }).catch(err => {
              this.isPaying = false;
              throw err;
            });
          } else {
            h5Pay(res.result.orderId).then(r => {
              console.log(r);
              if (r.result_code === 'SUCCESS') {
                window.location.href = r.mweb_url;
              } else {
                throw r;
              }
            }).catch(err => {
              throw err;
            });
          }
        } else {
          throw res.error;
        }
      }).catch((err) => {
        this.isPaying = false;
        console.error(err);
        err = err || {};
        this.$toast(err.message || '支付失败');
      });
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
  font-size: 15px;
}

.p-pay-section {
  background: #fff;
  border-radius: 4px;
  margin-bottom: 10px;
  .title {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
  }
}

.p-pay-desc {
  padding: 15px;
  h2 {
    font-size: 15px;
    line-height: 1.4;
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
  font-size: 15px;
  padding: 10px;
  input {
    font-size: 15px;
    margin-left: 30px;
    flex: 1;
    height: 28px;
    outline: none;
    border: none;
    background: none;
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
      font-size: 14px;
      outline: none;
      border: none;
      background: none;
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
  font-size: 15px;
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
  font-size: 15px;
}

.p-pay-loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    color: #fff;
    font-size: 14px;
    text-align: center;
    margin-top: 18px;
  }
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #eee;
  animation: loading .8s linear infinite;
}
@keyframes loading {
  from {
      transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
