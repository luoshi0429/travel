<template>
  <div class="c-poster" @click="tapPoster" v-if="show">
    <img :src="imgSrc" />
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    tapPoster() {
      this.$emit('tapPoster');
    }
  }
};
</script>

<style lang="scss" scoped>
.c-poster {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.45);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
