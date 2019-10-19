<template>
  <div class="p-attention">
    <template v-if="hasTags">
      <div class="p-attention-tags">
        <div class="p-attention-tag-list"></div>
        <div class="p-attention-add-btn">关注管理</div>
      </div>
      <div class="p-attention-list">
        <attention-item />
      </div>
    </template>
    <div class="p-attention-none">
      <i class="iconfont icon-zanwushuju"></i>
      <p>您可以设置您的关注内容</p>
      <p class="subtitle">这里暂时没有相关内容</p>
      <router-link to="/tag" class="btn btn-main">设置关注</router-link>
    </div>
  </div>
</template>

<script>
import AttentionItem from '@/components/attention-item';
export default {
  components: { AttentionItem },
  data() {
    return {
      hasTags: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.p-attention-tags {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.p-attention-tag-list {
  flex: 1;
  overflow-x: auto;
  height: 100%;
  box-shadow: 3px 0px 6px -3px #ccc;
}
.p-attention-add-btn {
  color: $main_color;
  padding: 0 10px;
}

.p-attention-list {
  padding-top: 50px;
}

.p-attention-none {
  padding: 80px;
  text-align: center;
  color: #666;
  font-size: 16px;
  .iconfont {
    display: inline-block;
    color: #999;
    font-size: 100px;
    margin-bottom: 20px;
  }
  .subtitle {
    margin-top: 20px;
    color: #999;
    font-size: 14px;
  }
  .btn-main {
    margin-top: 30px;
    width: 100%;
    line-height: 28px;
    font-size: 16px;
  }
}
</style>
