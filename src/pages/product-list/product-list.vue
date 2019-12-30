<template>
  <div class="p-product-list-wrap">
    <div class="c-home-product__list" v-if="productList.length > 0">
      <product-item
        @tapItem="tapProduct"
        v-for="(product, index) in productList"
        :key="index"
        :product="product"
        @tapPoster="handleShowPoster"
      />
    </div>
    <div class="c-home-product__none" v-else>
      <i class="iconfont icon-zanwushuju"></i>
      <p>暂无数据</p>
    </div>
    <poster :imgSrc="posterImg" :show="showPoster" @tapPoster="handleTapPoster" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getHomeType } from '@/api';
import ProductItem from '@/components/product-item/product-item';
import Poster from '@/components/poster/poster';
const TYPES = {
  new: 'zui_xin',
  food: 'mei_shi',
  hotel: 'jiu_dian',
  scenic: 'jing_qu'
};

export default {
  components: { Poster, ProductItem },
  data() {
    return {
      productList: [],
      posterImg: '',
      showPoster: false,
      type: this.$route.query.type
    };
  },
  computed: {
    ...mapState({
      selectedAddress: state => state.user.selectedAddress
    })
  },
  mounted() {
    // 获取type
    this.getHomeTypeData();
  },
  methods: {
    getHomeTypeData() {
      getHomeType({
        province: this.selectedAddress.pvovinceId,
        city: this.selectedAddress.cityId,
      }).then(r => {
        if (r.status === 'ok') {
          this.productList = r.data[TYPES[this.type]];
        }
      }).catch(err => {
        this.$toast('获取数据失败');
      });
    },
    handleShowPoster(posterImg) {
      this.posterImg = posterImg;
      this.showPoster = true;
    },
    handleTapPoster() {
      this.showPoster = false;
    },
    tapProduct(product) {
      this.$router.push({ name: 'detail', params: { id: product.id } });
    },
  }
};
</script>

<style lang="scss" scoped>
.p-product-list-wrap {

}

.c-home-product__none {
  padding-top: 30%;
  text-align: center;
  .iconfont {
    display: inline-block;
    font-size: 80px;
    margin-bottom: 10px;
  }
}
</style>
