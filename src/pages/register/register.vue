<template>
  <div class="p-register">
    <h1>手机快捷登录</h1>
    <div class="p-register-row">
      <input
        type="number"
        v-model="phone"
        placeholder="请输入手机号"
        @input="handleInput" />
      <p class="p-register-countdown" v-if="isCounting">{{ countdown }}s</p>
      <button v-else class="p-register-code" @click="tapGetSmsCdoe">获取验证码</button>
    </div>
    <div class="p-register-row">
      <input v-model="smsCode" placeholder="请输入验证码" />
    </div>
    <button class="p-register-submit" @click="tapSubmit">登录/注册</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      smsCode: '',
      countdown: 60,
      isCounting: false
    };
  },
  methods: {
    tapGetSmsCdoe() {
      // 判断是否为手机号
      if (!this.isPhone(this.phone)) {
        // 提示输入正确的手机号码
        return;
      }
      this.isCounting = true;
      this.countTimer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1;
        } else {
          clearInterval(this.countTimer);
          this.isCounting = false;
          this.countdown = 60;
        }
      }, 1000);
    },
    handleInput() {
      if (this.phone.length > 11) {
        this.phone = this.phone.slice(0, 11);
      }
    },
    isPhone(str) {
      return /^1[3456789]\d{9}$/.test(str);
    },
    tapSubmit() {

    }
  }
};
</script>

<style lang="scss" scoped>
.p-register {
  padding: 40px 16px;
  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
}

.p-register-row {
  margin-top: 20px;
  display: flex;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid #eee;
  input {
    flex: 1;
  }
}

.p-register-countdown {
  padding-right: 20px;
  color: #999;
}

.p-register-code {
  width: 80px;
}

.p-register-submit {
  width: 100%;
  height: 42px;
  text-align: center;
  background: #409EFF;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  margin-top: 30px;
}
</style>
