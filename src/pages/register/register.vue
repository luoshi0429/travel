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
import { getSmsCode, registerPhone } from '@/api';
export default {
  data() {
    return {
      phone: '',
      smsCode: '',
      countdown: 60,
      isCounting: false
    };
  },
  mounted() {
    console.info(this.$route);
  },
  methods: {
    isArray(t) {
      return Object.prototype.toString.call(t) === '[object Array]';
    },
    tapGetSmsCdoe() {
      if (!this.phone) {
        this.$toast('手机号不能为空');
        return;
      }
      // 判断是否为手机号
      if (!this.isPhone(this.phone)) {
        // 提示输入正确的手机号码
        this.$toast('手机号格式不正确');
        return;
      }
      getSmsCode(this.phone).then(r => {
        console.info(r);
        if (!this.isArray(r)) throw Error('请求失败');
        r = r[0];
        if (r.status === 'ok') {
          this.$toast('验证码发送成功');
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
        } else {
          throw Error('请求失败');
        }
      }).catch(err => {
        console.error(err);
        this.$toast('验证码发送失败');
      });
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
      if (!this.phone) {
        this.$toast('手机号码不能为空');
        return;
      }
      if (!this.smsCode) {
        this.$toast('验证码不能为空');
        return;
      }
      registerPhone({
        phone: this.phone,
        code: this.smsCode
      }).then(r => {
        if (!this.isArray(r)) return;
        r = r[0];
        if (r.status === 'ok') {
          this.$toast('注册成功', {
            duration: 1500
          });
          setTimeout(() => {
            // 跳转到
            const path = this.$route.query.from;
            this.$router.push(path || '/');
          }, 1500);
        }
      }).catch(err => {
        console.error(err);
      });
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
    border: none;
    outline: none;
    font-size: 15px;
  }
}

.p-register-countdown {
  padding-right: 20px;
  color: #999;
  font-size: 13px;
}

.p-register-code {
  width: 80px;
  font-size: 13px;
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
