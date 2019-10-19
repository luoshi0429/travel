<template>
  <div class="p-city">
    <div class="p-city-input">
      <i class="iconfont icon-sousuo1"></i>
      <input placeholder="城市名" />
    </div>
    <div class="p-city-panel">
      <div class="p-city-current">
        <p>当前所选：{{ currentCity.name }}</p>
      </div>
      <div class="p-city-top">
        <div class="p-city-location">
          <p>当前定位/最近访问城市</p>
          <p class="p-city-item"><i class="iconfont icon-location1"></i> <span>{{ currentCity.name }}</span></p>
        </div>
        <div class="p-city-hot">
          <p>热门城市</p>
          <div class="p-city-hot__list">
            <span v-for="hot in hotCities" :key="hot.name" class="p-city-item">{{ hot.name }}</span>
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
          <div v-for="city in letteyCity.cities" :key="city.name" class="p-city-letter-cell">{{ city.name }}</div>
        </div>
      </div>
    </div>
    <div class="p-city-letter-list">
      <a
        v-for="city in letterCities"
        class="p-city-letter"
        :href="'#'+city.letter"
        :key="city.letter"
      >{{ city.letter }}</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentCity: { name: '广州' },
      hotCities: [
        { name: '北京' },
        { name: '上海' },
        { name: '广州' },
        { name: '成都' },
        { name: '重庆' },
        { name: '佛山' },
        { name: '深圳' },
        { name: '珠海' },
        { name: '东莞' }
      ],
      letterCities: [
        {
          letter: 'A',
          cities: [
            { name: '安庆' },
            { name: '安顺' }
          ]
        },
        {
          letter: 'B',
          cities: [
            { name: '宝鸡' },
            { name: '北海' },
            { name: '北京' },
            { name: '保定' }
          ]
        },
        {
          letter: 'C',
          cities: [
            { name: '赤峰' },
            { name: '长春' },
            { name: '潮州' },
            { name: '成都' },
            { name: '重庆' },
            { name: '长沙' },
            { name: '郴州' },
            { name: '常德' }
          ]
        },
        {
          letter: 'D',
          cities: [
            { name: '大理' },
            { name: '大连' },
            { name: '东莞' }
          ]
        },
        {
          letter: 'F',
          cities: [
            { name: '阜阳' },
            { name: '福州' },
            { name: '佛山' }
          ]
        },
        {
          letter: 'G',
          cities: [
            { name: '广州' },
            { name: '大连' },
            { name: '东莞' }
          ]
        },
        {
          letter: 'H',
          cities: [
            { name: '合肥' },
            { name: '海口' },
            { name: '杭州' },
            { name: '哈尔滨' },
            { name: '黄石' },
            { name: '衡阳' }
          ]
        },
        {
          letter: 'J',
          cities: [
            { name: '嘉兴' },
            { name: '金华' },
            { name: '荆州' },
            { name: '济南' }
          ]
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';
.p-city {
  font-size: 16px;
}

.p-city-input {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
  padding: 20px 15px;
}
.p-city-location {
  .p-city-item {
    background: $main_color;
    color: #fff;
    position: relative;
    padding: 0 18px 0 26px;
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
  margin: 15px 0;
  height: 26px;
  line-height: 26px;
  border-radius: 12px;
  background: #fff;
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
}

.p-city-letter-list {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  padding: 10px;
  background: #f2f2f2;
}
.p-city-letter {
  display: block;
  margin: 10px 0;
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
</style>
