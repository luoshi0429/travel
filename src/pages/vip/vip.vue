<template>
  <div class="p-vip">
    <div class="tab-wrapper">
      <div class="tab-header">
        <div class="tab-item" @click="changeTab('gold')" :class="{'actived': currentTab === 'gold'}">黄金会员</div>
        <div class="tab-item" @click="changeTab('diamond')" :class="{'actived': currentTab === 'diamond'}">钻石会员</div>
      </div>
      <div class="tab-content">
        <!-- <p class="desc">享受商城支付金额7%的返现!</p> -->
        <div class="price-block">
          <div
            class="price-item"
            v-for="item in currentPriceList"
            :key="item.title"
            :class="{'actived': item.id === selectedPriceItemId}"
            @click="selectPriceItem(item)">

            <span class="price-title">{{ item.title }}</span>
            <strong class="price">{{ item.price }}</strong>
            <p class="tips">{{ item.tips }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="buy-tips-wrapper">
      <p class="buy-title">订购须知:</p>
      <ol class="buy-tips-list">
        <li>会员有效期内的订单为有效返现订单,且每个订单只返现一次.</li>
        <li>返现规则:会员账号必须绑定微信号,用绑定账号的微信号,关注公众号:"涅槃课堂",提供有效订单编号截图以及微信收款二维码或支付宝账号</li>
        <li>返现审核时间为3-5个工作日,审核成功则直接打款,失败则查看我司回复.</li>
        <li>退订方式:普通买断包月一经购买不可退订,连续自动包月用户可退订</li>
        <li>服务支持:如有投诉或好的建议,可关注我司公众号"涅槃课堂"进行反馈,在收到信息后5个工作日内回复.</li>
      </ol>
    </div>
    <div class="buy-button" @click="buy">立即购买</div>
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
      selectedPriceItemId: 0
    };
  },
  mounted() {
    this.currentPriceList = this.goldPriceList;
    this.selectedPriceItemId = this.currentPriceList[0].id;
  },
  methods: {
    changeTab(name) {
      this.currentTab = name;
      this.currentPriceList = this[name + 'PriceList'];
      this.selectedPriceItemId = this.currentPriceList[0].id;
    },
    selectPriceItem(item) {
      this.selectedPriceItemId = item.id;
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
  padding: 0 12px 60px 12px;
  .tab-wrapper {
    width: 100%;
    .tab-header {
      display: flex;
    }
    .tab-item {
      width: 50%;
      text-align: center;
      height: 60px;
      line-height: 60px;
      font-size: 20px;
      color: #999;
      padding-bottom: 12px;
      border-bottom: 3px solid transparent;
      &.actived {
        color: $main_color;
        border-bottom: 3px solid $main_color;
      }
    }
  }
  .tab-content {
    .desc {
      font-size: 14px;
      color: #333;
      margin: 20px 0 12px;
    }
    .price-block {
      display: flex;
      margin-top: 12px;
      overflow-x: scroll;
      .price-item {
        padding: 12px;
        margin-right: 8px;
        border: 1px solid #cdcdcd;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        width: 130px;
        flex-shrink: 0;
        align-items: center;
        &.actived {
          border: 1px solid $main_color;
        }
        .price-title {
          font-size: 16px;
          color: #333;
        }
        .price {
          font-size: 24px;
          margin: 12px 0;
          color: $main_color;
        }
        .tips {
          font-size: 12px;
          line-height: 1.5;
          color: #999;
        }
      }
    }
  }
  .buy-tips-wrapper {
    margin-top: 20px;
    .buy-title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 12px;
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
  .buy-button {
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: $main_color;
    color: #fff;
    font-size: 18px;
    border-radius: 2px;
    position: fixed;
    left: 0;
    bottom: 0px;
  }
}

</style>
