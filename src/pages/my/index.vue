<template>
  <div class="p-my">
    <div class="p-my-header">
      <img src="../../assets/images/default-avatar.png" />
      <p>张三</p>
    </div>
    <div class="p-my-cells">
      <div class="p-my-cell" v-for="(cell, index) in cells" :key="index">
        <div class="p-my-cell__left">
          <i class="iconfont" :class="cell.icon"></i> {{ cell.title }}
        </div>
        <i class="iconfont icon-icon-test3" ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cells: [
        { title: '我的订单', icon: 'icon-icon-test3', path: '' },
        { title: '我的会员', icon: 'icon-vip', path: '' },
        { title: '设置', icon: 'icon-shezhi', path: '' },
        // { title: '售后服务', icon: 'icon-rili', path: '' }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';
.p-my {
  height: 100%;
  background: #f2f2f2;
}

.p-my-header {
  height: 160px;
  background: $main_color;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    margin-bottom: 10px;
    // box-shadow: 0 1px 10px #f2f2f2;
  }
}

.p-my-cells {
  margin-top: 15px;
  background: #fff;
}

.p-my-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  border-bottom: 1px solid #eee;
  &:last-of-type {
    border-bottom: none;
  }
  &__left {
    .iconfont {
      margin-right: 6px;
    }
  }
}
</style>
