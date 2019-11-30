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
        <template v-for="(phone, index) in phoneList">
          <div :class="phone.vip_type === 'zs' ? 'diamond' : 'gold'" :key="index">
            <div
              class="price-item"
              :class="{'actived': phone.id === selectedCostPriceItemId}"
              @click="selectCostPriceItem(phone.id)">
              <span class="price-title">{{ phone.text }}</span>
              <p class="discount">{{ phone.back_bv }}%</p>
              <p class="discount-text">{{ phone.msg }}</p>
              <strong class="price">￥{{ phone.price }}/{{ phone.month }}月</strong>
            </div>
          </div>
          <!-- <div v-else class="gold" :key="index">
            <div
              class="price-item"
              :class="{'actived': 'c-g-1' === selectedCostPriceItemId}"
              @click="selectCostPriceItem('c-g-1')">
              <span class="price-title">黄金会员</span>
              <p class="discount">5%</p>
              <p class="discount-text">全场返现</p>
              <strong class="price">￥10/月</strong>
            </div>
          </div> -->
        </template>
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

            <span class="price-title">{{ item.text }}</span>
            <p class="discount">{{ item.back_bv }}%</p>
            <p class="discount-text">{{ item.msg }}</p>
            <strong class="price">{{ item.price }}/{{item.month}}月</strong>
          </div>
        </div>
        <div class="gold">
          <div
            class="price-item"
            v-for="item in goldPriceList"
            :key="item.title"
            :class="{'actived': item.id === selectedWechatPriceItemId}"
            @click="selectWechatPriceItem(item)">

            <span class="price-title">{{ item.text }}</span>
            <p class="discount">{{ item.back_bv }}%</p>
            <p class="discount-text">{{ item.msg }}</p>
            <strong class="price">{{ item.price}}/{{ item.month }}月</strong>
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
    <div class="vip-policy-dialog-wrapper" v-show="vipPolicyDialogVisible">
      <div class="mask"></div>
      <div class="dialog-content">
        <span class="close" @click="hideVipPolicyDialog">关闭</span>
        <div class="scroll-wrapper">
          <p class="dialog-title">会员协议</p>
          <div class="policy-content">
            <h6>平等原则</h6>
            <p>根据《中华人民共和国合同法》第三条:“合同当事人的法律地位平等,一方不得将自己的意志强加给另一方”的规定,平等原则是指地位平等的合同当事人,在充分协商达成一致意思表示的前提下订立合同的原则。这一原则包括三方面内容:④合同当事人的法律地位一律平等。不论所有制性质,也不问单位大小和经济实力的强弱,其地位都是平等的。②合同中的权利义务对等。当事人所取得财产、劳务或工作成果与其履行的义务大体相当要求一方不得无偿占有另一方的财产,侵犯他人权益;要求禁止平调和无偿调拨。③合同当事人必须就合同条款充分协商,取得一致,合同才能成立。任何一方都不得凌驾于另一方之上,不得把自己的意志强加给另一方,更不得以强迫命令、胁迫等手段签订合同</p>
            <h6>自愿原则</h6>
            <p>根据《中华人民共和国合同法》第四条:“当事人依法享有自愿订立合同的权利,任何单位和个人不得非法干预”的规定,民事活动除法律强制性的规定外,由当事人自愿约定。包括:第一订不订立合同自愿;第二,与谁订合同自愿,;第三,合同内容由当事人在不违法的情况下自愿约定;第四,当事人可以协议补充、变更有关内容;第五,双方也可以协议解除合同;第六,可以自由约定违约责任,在发生争议时,当事人可以自愿选择解决争议的方式。</p>
            <h6>公平原则</h6>
            <p>根据《中华人民共和国合同法》第五条:“当事人应当遵循公平原则确定各方的权利和义务”的规定,公平原则要求合同双方当事人之间的权利义务要公平合理具体包括:第一,在订立合同时,要根据公平原则确定双方的权利和义务;第二,根据公平原则确定风险的合理分配;第三,根据公平原则确定违约责任。</p>
            <h6>诚实信用原则</h6>
            <p>根据《中华人民共和国合同法》第六条:“当事人行使权利、履行义务应当遵循诚实信用原则”的规定,诚实信用原则要求当事人在订立合同的全过程中,都要诚实,讲信用,不得有欺诈或其他违背诚实信用的行为。</p>
            <h6>会员细则</h6>
            <ol class="policy-list">
              <li><span class="label">合约期限：</span><span class="value">点击同意此协议，视为知晓并同意购买会员服务，支付成功之后，从当日算至购买时间结束为止。</span></li>
              <li><span class="label">会员支付方式：</span><span class="value">共有连续包月和买断包月两种方式，连续包月只支持话费支付沟通，买断包月支持微信支付。</span></li>
              <li><span class="label">会员特权：</span><span class="value">"黄金会员"享受有效订单支付金额5%的返现!   "钻石会员"享受有效订单支付金额7%的返现! 注：会员有效期内的订单为有效返现订单,且每个有效订单只返现一次</span></li>
              <li><span class="label">会员返现规则：</span><span class="value">开通会员后，会员账号必须绑定微信号,用绑定账号的微信号,关注公众号:"涅槃课堂",发送有效订单编号截图以及微信收款二维码或支付宝账号，返现审核时间为3-5个工作日,审核成功则直接打款,失败则查看我司回复。</span></li>
              <li><span class="label">会员退订：</span><span class="value">普通买断包月一经购买不可退订,使用话费支付的连续包月用户可随时终止会员服务，可直接拨打运营商客服电话进行退订，也可关注我司公众号“涅槃课堂”反馈退订，且操作退订后下个月不会继续扣费。</span></li>
              <li><span class="label">服务支持：</span><span class="value">自用户点击同意此协议并支付成功后，我司将按照会员细则竭诚为每一位会员提供服务，如遇突发状况及未尽事宜，我司有权在不损失会员的利益之下提前结束会员服务。如有投诉或好的建议，可以关注公众号“涅槃课堂”直接反馈，或拨打我司电话“020-38289960”。</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <label class="rule-label" for="rule">
        <input id="rule" type="checkbox" v-model="agreed" />
        <p>同意<span @click.prevent="showVipPolicyDialog">《会员协议》</span></p>
      </label>
      <button class="buy-button" @click="buy">购买</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getVipList, buyVip } from '@/api';

export default {
  data() {
    return {
      agreed: false,
      currentTab: 'gold',
      phoneList: [],
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
      ruleDialogVisible: false,
      vipPolicyDialogVisible: false
    };
  },
  computed: {
    ...mapState({
      uid: state => state.user.uid
    })
  },
  filters: {
    dateUnit(val) {
      if (val === 1) return '月';
      switch (val) {
        case 1:
          return '月';
        case 3:
          return '季';
        case 6:
          return '半年';
        case 12:
          return '年';
        default:
          return '';
      }
    }
  },
  mounted() {
    getVipList().then(r => {
      console.info('R');
      r = r[0];
      if (r.status === 'ok') {
        r = r.data;
        this.phoneList = r.phone;
        const goldPriceList = [];
        const diamondPriceList = [];
        r.wexin.forEach(item => {
          if (item.vip_type === 'zs') {
            diamondPriceList.push(item);
          } else {
            goldPriceList.push(item);
          }
        });
        this.diamondPriceList = diamondPriceList;
        this.goldPriceList = goldPriceList;
      }
    });
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
    showVipPolicyDialog() {
      this.vipPolicyDialogVisible = true;
      document.body.style.overflow = 'hidden';
    },
    hideVipPolicyDialog() {
      this.vipPolicyDialogVisible = false;
      document.body.style.overflow = 'auto';
    },
    hideVipRuleDialog() {
      this.ruleDialogVisible = false;
      document.body.style.overflow = 'auto';
    },
    buy() {
      if (!this.agreed) {
        this.$toast('请先同意会员协议');
        return;
      }
      if (!this.selectedWechatPriceItemId) {
        this.$toast('请先选择购买类型');
        return;
      }
      buyVip({
        uid: this.uid,
        vip_id: this.selectedWechatPriceItemId
      }).then(r => {
        console.info(r);
        r = r[0];
        const invodeWechatPay = () => {
          window.WeixinJSBridge.invoke('getBrandWCPayRequest', {
            'appId': r.appid,
            'timeStamp': r.timestamp,
            'nonceStr': r.nonce_str,
            'package': 'prepay_id=' + r.prepay_id,
            'signType': 'MD5',
            'paySign': r.sign
          }, (res) => {
            console.info('getBrandWCPayRequest: ', res);
            this.isPaying = false;
            if (res.err_msg === 'get_brand_wcpay_request:ok') {
              this.$toast('支付成功');

              this.$router.push({
                name: 'vipSuccess'
              });
            } else {
              this.$toast('支付失败');
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
      margin: 30px 0 0;
    }
    .vip-desc {
      color: #676767;
      font-size: 12px;
      margin: 16px 0 12px;
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
      border-radius: 5px;
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
  .vip-policy-dialog-wrapper {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    position: fixed;
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
      padding: 30px 0;
      border-radius: 5px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .scroll-wrapper {
        height: 500px;
        overflow-y: scroll;
        padding: 0 20px;
      }
      .dialog-title {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        margin-bottom: 12px;
      }
      .close {
        position: absolute;
        top: -20px;
        right: 5px;
        color: #fff;
        font-size: 12px;
      }
      .policy-content {
        h6 {
          font-size: 16px;
          margin: 10px 0;
        }
        p {
          font-size: 14px;
          line-height: 1.5;
          text-indent: 2em;
        }
      }
      .policy-list {
        list-style-type: decimal;
        padding: 0 20px;
        li {
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 5px;
          .label {
            color: #676767;
            font-weight: bold;
          }
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
