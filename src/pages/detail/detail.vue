<template>
  <div class="p-detail">
    <div class="p-detail-header-tab">
      <div class="p-detail-tab-item" :class="{ selected: showTab === 0 }" @click="tapTab(0)">产品详情</div>
      <div class="p-detail-tab-item" :class="{ selected: showTab === 1 }" @click="tapTab(1)">使用说明</div>
    </div>
    <div class="p-detail-content">
      <div class="p-detail-top">
        <div class="p-detail-carousel"></div>
        <div class="p-detail-product">
          <h1>【长隆】1票玩2远~</h1>
          <p class="price">¥<span>129</span></p>
          <p class="sale"><span>已售：6029</span><span>库存：412</span></p>
        </div>
        <div class="p-detail-location">
          <div><i class="iconfont icon-location1"></i> 广东省广州市番禺广州长隆欢乐世界</div>
          <i class="iconfont icon-icon-test3"></i>
        </div>
        <div class="p-detail-sku">
          <div class="p-detail-sku__left">选择规格</div>
          <div class="p-detail-sku__right"></div>
        </div>
      </div>
      <div v-if="showTab === 0" class="p-detail-section p-detail-info">产品详情</div>
      <div v-if="showTab === 1" class="p-detail-section p-detail-instruction">使用说明</div>
    </div>
    <div class="p-detail-buy-section">
      <div class="p-detail-icon-btn" @click="tapHome"><i class="iconfont icon-shouye"></i><p>首页</p></div>
      <div class="p-detail-icon-btn" @click="tapCustomerService"><i class="iconfont icon-kefu"></i><p>客服</p></div>
      <button @click="tapBuy" class="p-detail-buy-btn">立即抢购</button>
    </div>
    <button @click="tapShowPoster" class="p-detail-poster-btn">分享海报</button>
  </div>
</template>

<script>
import { getProductDetail, getProductSku } from '@/api';

export default {
  data() {
    return {
      detail: {},
      showTab: 0
    };
  },
  mounted() {
    // this.requestDetail();
  },
  methods: {
    requestDetail() {
      const id = this.$route.params.id;
      getProductDetail(id)
        .then(r => {
          console.log(r);
        }).catch(err => {
          console.error(err);
        });
    },
    requestProductSku() {
      getProductSku()
        .then(r => {
          console.log(r);
        }).catch(err => {
          console.error(err);
        });
    },
    // 切换tab
    tapTab(index) {
      this.showTab = index;
    },
    // 点击首页
    tapHome() {
      this.$router.back();
    },
    // 客服
    tapCustomerService() {
      console.log('客服');
    },
    // 立即抢购
    tapBuy() {
      console.log('立即抢购');
      // TODO: 第一次点击引导关注公众号 -> vip
      this.$router.push(`/pay/${this.$route.params.id}`);
    },
    // 分享海报
    tapShowPoster() {
      console.log('分享海报');
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';
.p-detail-header-tab {
  display: flex;
  height: 48px;
  background: #fff;
  z-index: 999;
}
.p-detail-tab-item {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &.selected:after {
    content: "";
    position: absolute;
    width: 24px;
    height: 3px;
    background: $main_color;
    bottom: 0;
  }
}

.p-detail-buy-section {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  display: flex;
}
.p-detail-icon-btn {
  width: 70px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f2f2f2;
  border-right: 1px solid #eee;
  &:last-of-type {
    border-right: none;
  }
  .iconfont {
    font-size: 20px;
    margin-bottom: 1px;
  }
}
.p-detail-buy-btn {
  flex: 1;
  background: $main_color;
  color: #fff;
  text-align: center;
  font-size: 16px;
}

.p-detail-poster-btn {
  position: fixed;
  top: 100px;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 4px 10px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.p-detail-product {
  padding: 10px 15px 20px;
  border-bottom: 1px solid #eee;
  h1 {
    font-size: 16px;
    margin-bottom: 15px;
  }
  .price {
    color: $main_color;
    span {
      font-size: 18px;
    }
  }
  .sale {
    margin-top: 15px;
    color: #999;
    display: flex;
    justify-content: space-between;
  }
}

.p-detail-location {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  .iconfont {
    color: #777;
  }
}

.p-detail-section {
  padding: 15px;
}

.p-detail-sku {
  border-top: 20px solid #eee;
  border-bottom: 20px solid #eee;
  display: flex;
  padding: 10px 15px;
  &__left {
    color: #777;
    margin-right: 15px;
  }
  &__right {
    flex: 1;
  }
}
</style>
