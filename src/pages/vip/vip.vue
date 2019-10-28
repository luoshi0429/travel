<template>
  <div class="p-vip">
    <div class="vip-header">
      <h1>开通就省钱，下单就返现。 </h1>
      <p class="vip-desc">"钻石"会员全场<span class="highlight">返现7%</span>！"⻩⾦"会员全场<span class="highlight">返现5%</span>！</p>
      <span class="rule" @click="showVipRuleDialog">会员使⽤规则</span>
    </div>
    <div class="content">
      <!-- <p class="desc">享受商城支付金额7%的返现!</p> -->
      <h3 class="title">话费支付</h3>
      <div class="price-block">
        <div class="diamond">
          <div
            class="price-item"
            :class="{'actived': 'c-d-1' === selectedCostPriceItemId}"
            @click="selectCostPriceItem('c-d-1')">
            <span class="price-title">钻石会员</span>
            <p class="discount">7%</p>
            <p class="discount-text">全场返现</p>
            <strong class="price">￥20/月</strong>
          </div>
        </div>
        <div class="gold">
          <div
            class="price-item"
            :class="{'actived': 'c-g-1' === selectedCostPriceItemId}"
            @click="selectCostPriceItem('c-g-1')">
            <span class="price-title">黄金会员</span>
            <p class="discount">5%</p>
            <p class="discount-text">全场返现</p>
            <strong class="price">￥10/月</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <!-- <p class="desc">享受商城支付金额7%的返现!</p> -->
      <h3 class="title">微信支付</h3>
      <div class="price-block wechat">
        <div class="diamond">
          <div
            class="price-item"
            v-for="item in diamondPriceList"
            :key="item.title"
            :class="{'actived': item.id === selectedWechatPriceItemId}"
            @click="selectWechatPriceItem(item)">

            <span class="price-title">钻石会员</span>
            <p class="discount">7%</p>
            <p class="discount-text">全场返现</p>
            <strong class="price">{{ item.price }}/月</strong>
          </div>
        </div>
        <div class="gold">
          <div
            class="price-item"
            v-for="item in goldPriceList"
            :key="item.title"
            :class="{'actived': item.id === selectedWechatPriceItemId}"
            @click="selectWechatPriceItem(item)">

            <span class="price-title">黄金会员</span>
            <p class="discount">5%</p>
            <p class="discount-text">全场返现</p>
            <strong class="price">{{ item.price }}/月</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="buy-tips-dialog-wrapper" v-show="ruleDialogVisible">
      <div class="mask"></div>
      <div class="dialog-content">
        <p class="buy-title">订购须知:</p>
        <span class="close" @click="hideVipRuleDialog">关闭</span>
        <ol class="buy-tips-list">
          <li>会员有效期内的订单为有效返现订单,且每个订单只返现一次.</li>
          <li>返现规则:会员账号必须绑定微信号,用绑定账号的微信号,关注公众号:"涅槃课堂",提供有效订单编号截图以及微信收款二维码或支付宝账号</li>
          <li>返现审核时间为3-5个工作日,审核成功则直接打款,失败则查看我司回复.</li>
          <li>退订方式:普通买断包月一经购买不可退订,连续自动包月用户可退订</li>
          <li>服务支持:如有投诉或好的建议,可关注我司公众号"涅槃课堂"进行反馈,在收到信息后5个工作日内回复.</li>
        </ol>
      </div>
    </div>
    <div class="footer">
      <label class="rule-label" for="rule">
        <input id="rule" type="checkbox" />
        <p>同意<span>《会员协议》</span></p>
      </label>
      <button class="buy-button" @click="buy">购买</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'gold',
      goldPriceList: [
        {
          id: 'g1',
          title: '连续包月',
          price: '￥10',
          tips: '享受商城支付金额5%的返现!'
        },
        {
          id: 'g2',
          title: '12个月',
          price: '￥105',
          tips: '享受商城支付金额5%的返现!'
        },
        {
          id: 'g3',
          title: '6个月',
          price: '￥55',
          tips: '享受商城支付金额5%的返现!'
        },
        {
          id: 'g4',
          title: '3个月',
          price: '￥30',
          tips: '享受商城支付金额5%的返现!'
        },
        {
          id: 'g5',
          title: '1个月',
          price: '￥10',
          tips: '享受商城支付金额5%的返现!'
        },
      ],
      diamondPriceList: [
        {
          id: 'd1',
          title: '连续包月',
          price: '￥20',
          tips: '享受商城支付金额7%的返现!'
        },
        {
          id: 'd2',
          title: '12个月',
          price: '￥210',
          tips: '享受商城支付金额7%的返现!'
        },
        {
          id: 'd3',
          title: '6个月',
          price: '￥110',
          tips: '享受商城支付金额7%的返现!'
        },
        {
          id: 'd4',
          title: '3个月',
          price: '￥60',
          tips: '享受商城支付金额7%的返现!'
        },
        {
          id: 'd5',
          title: '1个月',
          price: '￥20',
          tips: '享受商城支付金额7%的返现!'
        },
      ],
      currentPriceList: [],
      selectedWechatPriceItemId: 0,
      selectedCostPriceItemId: 0,
      ruleDialogVisible: false
    };
  },
  mounted() {
  },
  methods: {
    selectWechatPriceItem(item) {
      this.selectedWechatPriceItemId = item.id;
      this.selectedCostPriceItemId = '';
    },
    selectCostPriceItem(id) {
      this.selectedCostPriceItemId = id;
      this.selectedWechatPriceItemId = '';
    },
    showVipRuleDialog() {
      this.ruleDialogVisible = true;
      document.body.style.overflow = 'hidden';
    },
    hideVipRuleDialog() {
      this.ruleDialogVisible = false;
      document.body.style.overflow = 'auto';
    },
    buy() {
      // xx
      this.$router.push({
        name: 'vipSuccess'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';
.p-vip {
  font-size: 16px;
  padding: 0 12px 30px 12px;
  .vip-header {
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
    font-size: 0;
    color: #333;
    h1 {
      font-size: 16px;
      font-weight: bold;
      margin: 30px 0 0 0;
    }
    .vip-desc {
      color: #676767;
      font-size: 12px;
      margin: 8px 0;
      .highlight {
        color: $main_color;
      }
    }
    .rule {
      color: #0a8cfb;
      font-size: 12px;
      line-height: 1;
    }
  }
  .content {
    border-bottom: 1px solid #eee;
    padding-bottom: 20px;
    margin-bottom: 20px;
    color: #333;
    .desc {
      font-size: 14px;
      margin: 20px 0 12px;
    }
    .title {
      font-size: 14px;
      margin: 0 0 10px 0;
      font-weight: bold;
    }
    .price-block {
      display: flex;
      margin-top: 12px;
      display: flex;
      &.wechat {
        flex-direction: column;
        .diamond {
          margin-bottom: 15px;
          overflow-x: scroll;
          &::-webkit-scrollbar {
              display: none;
          }
        }
        .gold {
          overflow-x: scroll;
          &::-webkit-scrollbar {
              display: none;
          }
        }
      }
      .gold,
      .diamond {
        display: flex;
      }
      .gold {
        .discount {
          color: $main_color;
        }
        .price {
          color: $main_color;
        }
        .price-item {
          &.actived {
            border: 1px solid $main_color;
          }
        }
      }
      .diamond {
        .discount {
          color: #26d0c0;
        }
        .price {
          color: #26d0c0;
        }
        .price-item {
          &.actived {
            border: 1px solid #26d0c0;
          }
        }
      }
      .price-item {
        padding: 8px 10px;
        margin-right: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        display: inline-flex;
        flex-direction: column;
        width: 120px;
        flex-shrink: 0;
        align-items: center;
        .price-title {
          font-size: 14px;
          color: #333;
        }
        .discount-text {
          font-size: 12px;
          color: #999;
        }
        .tips {
          font-size: 12px;
          line-height: 1.5;
          color: #999;
        }
        .discount {
          font-size: 12px;
          margin: 5px 0;
          font-weight: bold;
        }
        .price {
          font-size: 16px;
          margin: 8px 0 0;
        }
      }
    }
  }
  .buy-tips-dialog-wrapper {
    margin-top: 20px;
    .mask {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      z-index: 1;
    }
    .dialog-content {
      position: absolute;
      z-index: 2;
      background: #fff;
      width: 80%;
      padding: 30px 20px;
      border-radius: 10px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .buy-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 12px;
      }
      .close {
        position: absolute;
        top: -20px;
        right: 5px;
        color: #fff;
        font-size: 12px;
      }
      .buy-tips-list {
        list-style-type: decimal;
        padding: 0 20px;
        li {
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 5px;
        }
      }
    }
  }
  .footer {
    .rule-label {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      input {
        margin-right: 5px;
      }
      p {
        font-size: 12px;
      }
      span {
        color: #0a8cfb;
      }
    }
    .buy-button {
      width: 100%;
      height: 44px;
      line-height: 44px;
      text-align: center;
      background: $main_color;
      color: #fff;
      font-size: 18px;
      border-radius: 2px;
      bottom: 0px;
    }
  }
}

</style>
