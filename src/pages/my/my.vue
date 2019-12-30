<template>
  <div class="p-my">
    <div class="p-my-header">
      <div class="p-my-header__inner" @click="tapHeader">
        <img :src="userInfo.headimgurl || defaultAvatar" />
        <p>{{ userInfo.nickname || userInfo.phone }} <i v-if="!!userInfo.vip" class="icon iconfont icon-vip1"></i></p>
        <p v-if="!!userInfo.vip">{{ userInfo.vip_type === 'hj' ? '黄金会员' : '钻石会员' }}至：{{ userInfo.vip_date }}</p>
      </div>
    </div>
    <div class="p-my-cells">
      <router-link
        :to="cell.path"
        class="p-my-cell"
        v-for="(cell, index) in cells"
        :key="index"
      >
        <div class="p-my-cell__left">
          <i class="iconfont" :class="cell.icon"></i> {{ cell.title }}
        </div>
        <div class="p-my-cell__right">
          <span>{{ cell.desc }}</span>
          <i class="iconfont icon-icon-test3" ></i>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import defaultAvatar from '@/assets/images/default-avatar.png';

export default {
  data() {
    return {
      cells: [
        { title: '成为会员', icon: 'icon-vip1', path: '/vip', desc: '开通就省钱，下单就返现' },
        { title: '我的订单', icon: 'icon-rili', path: '/order', desc: '查看全部订单' },
        // { title: '设置', icon: 'icon-shezhi', path: '' },
        // { title: '售后服务', icon: 'icon-rili', path: '' }
      ],
      defaultAvatar
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.info || {}
    })
  },
  mounted() {
    console.info(this.$route, this.$router);
  },
  methods: {
    tapHeader() {
      // 判断是否在微信
      if (this.$isWeixin) {
        // 是否有uid
        if (!this.userInfo.uid) {
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa8f514537d6829d0&redirect_uri=http%3A%2F%2Fshop.npnet66.com%2Fshop%2Fapi%2Fweixin%2FgetUserInfo%3Furl%3Dhttp%3A%2F%2Fshop.npnet66.com%2F&response_type=code&scope=snsapi_userinfo&state=';
        }
        return;
        // 先授权
      }
      if (this.userInfo.phone) return;
      const path = encodeURIComponent(this.$route.fullPath);
      this.$router.push(`/register?from=${path}`);
    }
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

.p-my-header__inner {
  text-align: center;
  .icon-vip1 {
    font-size: 18px;
  }
}

.p-my-vip {
  display: flex;
  height: 40px;
  align-items: center;
  color: #333;
  background: #fff;
  margin-top: 10px;
  padding-left: 30px;
  span {
    color: #777;
    margin-left: 20px;
  }
}

.p-my-cells {
  margin-top: 10px;
  background: #fff;
}

.p-my-cell {
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 10px;
  border-bottom: 1px solid #eee;
  &:last-of-type {
    border-bottom: none;
  }
  &__left {
    .iconfont {
      margin-right: 6px;
      font-size: 18px;
    }
  }
  &__right {
    color: #999;
    span {
      margin-right: 4px;
      font-size: 12px;
      vertical-align: middle;
    }
    i {
      vertical-align: middle;
    }
  }
}
</style>
