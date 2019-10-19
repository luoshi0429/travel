<template>
  <div class="p-pay">
    <div class="p-pay-panel">
      <div class="p-pay-section p-pay-desc">
        <p class="title">订单描述</p>
        <h2>【长隆】1票玩2远~</h2>
        <p class="sku">
          <span>规格</span> 长隆水路万圣节:129=1人
        </p>
      </div>
      <div class="p-pay-section p-pay-contact">
        <p class="title">订单联系人</p>
        <div>
          <div class="p-pay-formcontrol">
            <p><span class="asterisk">*</span>姓名</p>
            <input placeholder="请输入姓名" />
          </div>
          <div class="p-pay-formcontrol">
            <p><span class="asterisk">*</span>手机</p>
            <input type="number" placeholder="请输入手机号码" />
          </div>
        </div>
      </div>
      <div class="p-pay-section p-pay-count">
        <div class="p-pay-count-cell">
          <p>购买数量</p>
          <div class="p-pay-count-cell__right p-pay-count-input">
            <button><i class="iconfont icon-minus1"></i></button><input v-model="buyCount" placeholder="数量" /><button><i class="iconfont icon-cc-plus-crude"></i></button>
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
      <div class="p-pay-footer-total">合计：<em>129.00</em></div>
      <button class="p-pay-footer-btn">微信支付</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buyCount: 1
    };
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
