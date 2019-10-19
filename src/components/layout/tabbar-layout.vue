<template>
  <div class="l-main-page">
    <div class="l-tabbar-layout">
      <router-view :key="$route.path" />
    </div>
    <div class="c-tabbar">
      <router-link
        v-for="(tabbar, index) in tabbars"
        class="c-tabbar-item"
        :class="{ selected: $route.path === tabbar.path }"
        :to="tabbar.path"
        :key="index">
        <i :class="['c-tabbar-icon', 'iconfont', tabbar.ic]"></i>
        <p>{{ tabbar.title }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbars: [
        { title: '首页', ic: 'icon-shouye', path: '/' },
        { title: '关注', ic: 'icon-aixin', path: '/attention' },
        { title: '我的', ic: 'icon-wode', path: '/my' }
      ]
    };
  },
  watch: {
    $route(to) {
      console.info(to);
    }
  }
};
</script>

<style lang="scss" scoped>
.l-main-page {
  height: 100%;
}

.l-tabbar-layout {
  height: 100%;
  padding-bottom: 48px;
}

.c-tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 48px;
  display: flex;
  background: #fff;
  border-top: 1px solid #eee;
}
.c-tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333;
  p {
    margin-top: 4px;
    font-size: 12px;
  }
  &.selected {
    color: #d25226;
  }
}
.c-tabbar-icon {
  font-size: 24px;
}
</style>
