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
          <!-- 图片轮播图预留位置 -->
          <div class="p-detail-img-list"><img style="width: 100%;" :src="detail.img_main" />图片轮播图预留位置</div>
          <div class="p-detail-product__info">
            <h1>{{ detail.name }}</h1>
            <p class="price">¥<span>{{ currentSku.price }}</span></p>
            <!-- 所有规格的库存 -->
            <p class="sale"><span>已售：{{ currentSku.saled_num }}</span><span>库存：{{ currentSku.quantity }}</span></p>
          </div>
        </div>
        <div class="p-detail-location">
          <div><i class="iconfont icon-location1"></i> <span>{{ detail.product_addr }}</span></div>
          <i class="iconfont icon-icon-test3"></i>
        </div>
        <div class="p-detail-sku">
          <div class="p-detail-sku__left">选择规格</div>
          <div class="p-detail-sku__right">
            <p class="p-detail-sku__right__text">{{ skugrup.text }}：</p>
            <div class="p-detail-sku__right__skus">
              <span
                class="p-detail-sku__right__sku"
                :class="{ selected: index === skuIndex }"
                v-for="(sku, index) in skugrup.skus"
                :key="index"
                @click="tapSku(index)"
              >{{ sku.sku_text }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showTab === 0" class="p-detail-section p-detail-info">
        <p>图文介绍</p>
        <div v-html="detail.detailHtml"></div>
      </div>
      <div v-if="showTab === 1" class="p-detail-section p-detail-instruction">
        <div class="p-detail-instruction-item">
          <h2>产品</h2>
          <p>{{ detail.name }}</p>
        </div>
        <div class="p-detail-instruction-item">
          <h2>规格</h2>
          <template v-if="skugrup.skus.length">
            <p v-for="(sku, index) in skugrup.skus" :key="index">{{ sku.sku_text }}</p>
          </template>
        </div>
      </div>
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
      detail: { skugrups: [] },
      showTab: 0,
      skuIndex: 0,
      skugrup: {},
      currentSku: {},
      productId: this.$route.params.id
    };
  },
  mounted() {
    // this.productId = this.$route.params.id;
    this.requestDetail();
  },
  methods: {
    requestDetail() {
      // const id = this.$route.params.id;
      getProductDetail(this.productId)
        .then(r => {
          console.log(r);
          this.detail = r.result;
          const skugrup = r.result.skugrups[0] || {};
          this.skugrup = skugrup;
          this.currentSku = skugrup.skus[0];
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
      // this.$router.push(`/pay/${this.$route.params.id}`);
      this.$router.push({
        path: '/pay',
        query: {
          id: this.$route.params.id,
          skuId: this.currentSku.sku_id
        }
      });
    },
    // 分享海报
    tapShowPoster() {
      console.log('分享海报');
    },
    // 选择规格
    tapSku(index) {
      this.skuIndex = index;
      this.currentSku = this.skugrup.skus[index];
      // TODO: 接口bug
      // const skuId = this.skugrup.skus[index].sku_id;
      // getProductSku({
      //   product_id: this.productId,
      //   sku_id: skuId
      // }).then(r => {
      //   console.info(r);
      // }).catch(err => {
      //   console.error(err);
      // });
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

.p-detail-img-list {
  height: 250px;
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
  // padding: 10px 15px 20px;
  border-bottom: 1px solid #eee;
  &__info {
    padding: 10px 15px 20px;
  }
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
    vertical-align: middle;
  }
  span {
    display: inline-block;
    vertical-align: middle;
    line-height: 16px;
    margin-left: 3px;
    font-size: 13px;
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

.p-detail-sku__right__text {
  color: #333;
  margin-bottom: 8px;
}
// .p-detail-sku__right__skus {

// }
.p-detail-sku__right__sku {
  display: inline-block;
  border-radius: 3px;
  margin-right: 6px;
  margin-bottom: 6px;
  color: #555;
  padding: 6px 8px;
  background: #eee;
  &.selected {
    color: $main_color;
    border: 1px solid $main_color;
    background: rgba(252, 109, 69, 0.15);
  }
}

.p-detail-instruction-item {
  font-size: 14px;
  color: #777;
  border-bottom: 1xp dashed #eee;
  margin-bottom: 10px;
  h2 {
    font-size: 16px;
    color: #000;
    font-weight: bold;
    margin-bottom: 10px;
  }
  p {
    padding-left: 1em;
    line-height: 20px;
  }
  &:last-of-type {
    border-bottom: none;
  }
}
</style>
