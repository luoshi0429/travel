<template>
  <div class="p-city">
    <div class="p-city-input">
      <i class="iconfont icon-sousuo1"></i>
      <input placeholder="城市名" @input="handleSearchCity" />
    </div>
    <div class="p-city-panel">
      <div class="p-city-current">
        <p>当前所选：{{ selectedAddress.name || ' - ' }}</p>
      </div>
      <div class="p-city-top">
        <div class="p-city-location">
          <p>当前定位/最近访问城市</p>
          <p class="p-city-item" @click="tapCity(address)"><i class="iconfont icon-location1"></i> <span>{{ address.name || ' - '}}</span></p>
        </div>
        <div class="p-city-hot">
          <p>热门城市</p>
          <div class="p-city-hot__list">
            <div
              class="p-city-hot__item"
              v-for="hot in hotCities"
              :key="hot.name"
              @click="tapCity(hot)"
            >
              <span class="p-city-item">{{ hot.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="p-city-list">
        <div
          v-for="letteyCity in letterCities"
          :key="letteyCity.letter"
          class="p-city-letter-wrap"
          :id="letteyCity.letter"
        >
          <h1>{{ letteyCity.letter }}</h1>
          <div
            v-for="city in letteyCity.cities"
            :key="city.name"
            class="p-city-letter-cell"
            @click="tapCity(city)"
          >{{ city.name }}</div>
        </div>
      </div>
    </div>
    <div class="p-city-letter-list">
      <a
        v-for="(city) in letterCities"
        class="p-city-letter"
        :key="city.letter"
        @click="tapLetter(city.letter)"
      >{{ city.letter }}</a>
    </div>
    <div class="c-search-panel" v-if="searchCities.length">
      <div class="c-search-panel__inner">
        <p class="c-search-panel__title">搜索结果</p>
        <div class="c-search-list">
          <p class="c-search-row" v-for="(city, index) in searchCities" :key="index">{{ city.name }}</p>
        </div>
      </div>
    </div>
    <div class="c-letter-toast" v-if="currentLetter.length">{{ currentLetter }}</div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import cities from '@/assets/cities';
export default {
  data() {
    return {
      hotCities: [
        { name: '北京', cityId: '10', pvovinceId: '10' },
        { name: '上海', cityId: '11', pvovinceId: '11' },
        { name: '广州', cityId: '1292', pvovinceId: '29' },
        { name: '成都', cityId: '1348', pvovinceId: '32' },
        { name: '佛山', cityId: '1297', pvovinceId: '29' },
        { name: '深圳', cityId: '1293', pvovinceId: '29' },
        { name: '杭州', cityId: '1178', pvovinceId: '21' }
      ],
      letterCities: cities,
      currentLetter: '',
      searchCities: []
    };
  },
  computed: {
    ...mapState({
      address: state => state.user.address,
      selectedAddress: state => state.user.selectedAddress
    })
  },
  methods: {
    ...mapActions(['setSelectedAddress']),
    tapLetter(letter) {
      const $ele = document.querySelector('#' + letter);
      window.scrollTo(0, $ele.offsetTop - 50);
      this.currentLetter = letter;
      if (this.letterTimer) {
        clearTimeout(this.letterTimer);
        this.letterTimer = null;
      }
      this.letterTimer = setTimeout(() => {
        this.currentLetter = '';
      }, 1000);
    },
    tapCity(city) {
      console.info(city);
      this.setSelectedAddress(city);
      this.$router.replace('/');
    },
    handleSearchCity(e) {
      const val = e.target.value;

      if (this.searchTimer) {
        clearTimeout(this.searchTimer);
        this.searchTimer = null;
      }

      if (!val) {
        this.searchCities = [];
        return;
      }
      this.searchTimer = setTimeout(() => {
        const resultCities = [];
        // 搜索cities
        console.log(cities.length);
        for (let i = 0; i < cities.length; i++) {
          const letterCity = cities[i];
          const inLetterCities = letterCity.cities;
          console.log(inLetterCities.length);
          for (let j = 0; j < inLetterCities.length; j++) {
            const city = inLetterCities[j];
            const { name, pingying } = city;
            if (name.indexOf(val) === 0 || pingying.indexOf(val) === 0) {
              resultCities.push(city);
            }
          }
        }
        this.searchCities = resultCities;
      }, 600);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';
.p-city {
  font-size: 16px;
}

@media screen and (max-width: 320px){
  .p-city {
    font-size: 14px;
  }
  .p-city-letter-list {
   .p-city-letter {
     margin: 3px 0;
   }
  }
}

.c-letter-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 10px 20px;
  border-radius: 20px;
}

.p-city-input {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    margin: 0 20px;
    width: 100%;
    background: #f2f2f2;
    border: none;
    height: 32px;
    border-radius: 4px;
    padding-left: 34px;
  }
  .iconfont {
    position: absolute;
    left: 30px;
    color: #bbb;
  }
}

.p-city-panel {
  padding-top: 50px;
}

.p-city-current {
  color: #000;
  font-weight: bold;
  padding: 15px;
}

.p-city-top {
  background: #f2f2f2;
  color: #777;
  padding: 20px 15px 0;
}
.p-city-location {
  .p-city-item {
    background: $main_color;
    color: #fff;
    position: relative;
    padding: 0 18px 0 26px;
    margin-top: 15px;
    .iconfont {
      color: #fff;
      position: absolute;
      top: 1px;
      left: 6px;
      font-size: 15px;
    }
  }
}

.p-city-item {
  display: inline-block;
  color: #333;
  padding: 0 22px;
  // margin: 15px 0;
  margin-bottom: 15px;
  height: 26px;
  line-height: 26px;
  border-radius: 12px;
  background: #fff;
  // margin-right: 10px;
}

.p-city-item-current {
  display: inline-block;
  background: $main_color;
  color: #fff;
  padding: 0 16px;
  height: 26px;
  line-height: 26px;
  border-radius: 10px;
}

.p-city-hot__list {
  margin-top: 15px;
}
.p-city-hot__item {
  display: inline-block;
  width: 25%;
  text-align: center;
}

.p-city-letter-list {
  position: fixed;
  // top: 50%;
  // transform: translateY(-50%);
  top: 58px;
  right: 0;
  padding: 0 10px;
  background: #f2f2f2;
}
.p-city-letter {
  display: block;
  margin: 8px 0;
  color: $main_color;
  font-weight: bold;
}

.p-city-letter-wrap {
  h1 {
    padding: 15px;
    background: #f2f2f2;
    color: #999;
  }
}
.p-city-letter-cell {
  border-bottom: 1px solid #eee;
  padding: 15px;
  &:last-of-type {
    border-bottom: none;
  }
}

.c-search-panel {
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
  &__inner {
    height: 100%;
  }
  &__title {
    background: #fff;
    color: #999;
    // font-weight: bold;
    padding: 14px;
    font-size: 16px;
  }
}
.c-search-list {
  background: #fff;
  padding: 0 14px;
  max-height: 70%;
  overflow-y: auto;
  font-size: 14px;
}
.c-search-row {
  border-bottom: 1px solid #eee;
  padding: 12px;
  &:last-of-type {
    border-bottom: none;
  }
}
</style>
