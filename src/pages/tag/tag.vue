<template>
  <div class="p-tag">
    <div class="p-tag-section">
      <h1>关注内容</h1>
      <div class="p-tag-list">
        <span v-for="(tag, index) in watchedTags" :key="index" class="p-tag-item">{{ tag.name }}</span>
      </div>
    </div>
    <div class="p-tag-section p-tag-section-tags">
      <h1>更多内容</h1>
      <div class="p-tag-list">
        <span
          @click="tapTag(tag)"
          v-for="(tag, index) in tags"
          :key="index"
          class="p-tag-item"
        >{{ tag.name }}</span>
      </div>
    </div>
    <div class="p-tag-confirm-btn">
      <button class="btn btn-main ">确认</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      tags: [
        { name: '酒店' },
        { name: '跟团游' },
        { name: '长隆' },
        { name: '儿童乐园' },
        { name: '海边' },
        { name: '别墅' },
        { name: '温泉' },
        { name: '亲子游' },
        { name: '运动健身' },
        { name: 'KTV' },
        { name: '按摩/足疗' },
        { name: '食品' },
        { name: '网红地' },
      ]
    };
  },
  computed: {
    ...mapState({
      watchedTags: state => state.tag.watchedTags
    })
  },
  methods: {
    ...mapActions(['toggleTag']),
    tapTag(tag) {
      console.log(tag);
      this.toggleTag(tag);
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';
.p-tag {
  height: 100%;
  background: #f2f2f2;
}
.p-tag-section {
  padding: 15px 0;
  border-bottom: 1px solid #e8e6e6;
  h1 {
    font-size: 18px;
    font-weight: bold;
    color: #000;
    padding-left: 15px;
  }
}

.p-tag-item {
  display: inline-block;
  line-height: 26px;
  padding: 0 14px;
  border: 1px solid #e8e6e6;
  border-radius:32px;
  margin-top: 15px;
  margin-left: 15px;
}

.p-tag-confirm-btn {
  position: fixed;
  left: 10px;
  right: 10px;
  bottom: 10px;
  .btn {
    width: 100%;
    line-height: 26px;
    font-size: 16px;
  }
}
</style>
