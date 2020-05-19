<template>
  <div class="p-vip-success">
    <div class="wrapper">
      <div class="top">
        <i class="iconfont icon-checked success-icon"></i>
        <span class="text">购买成功</span>
        <router-link to="/">返回首页</router-link>
      </div>
      <div class="dashed-line"></div>
      <div class="bottom">
        <div class="qrcode-wrapper">
          <img src="../../assets/images/qrcode.jpg" alt="" />
        </div>
        <p class="tips">长按识别二维码，关注公众号旅合算，按提示进行返现操作。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';
.p-vip-success {
  font-size: 16px;
  padding: 60px 20px 0 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #eceaea;
  height: 100vh;
  .wrapper {
    padding: 20px 0;
    background: #fff;
    border-radius: 10px;
  }
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    .success-icon {
      font-size: 48px;
      color: pink;
      margin-bottom: 20px;
    }
    .text {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
  .dashed-line {
    width: 100%;
    border-top: 2px dashed #eceaea;
    margin: 40px 0;
    position: relative;
    &::before {
      position: absolute;
      top: -9px;
      left: -5px;
      content: '';
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #eceaea;
    }
    &::after {
      position: absolute;
      top: -9px;
      right: -5px;
      content: '';
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #eceaea;
    }
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    .qrcode-wrapper {
      margin-bottom: 20px;
      img {
        display: inline-block;
        width: 130px;
        height: 130px;
      }
    }
    .tips {
      font-size: 12px;
      color: #999;
      line-height: 1.5;
      text-align: center;
      padding: 0 12px;
    }
  }
}

</style>
