<template>
  <div class="maskLayer"
    v-show="open"
    @click.stop="onclose"></div>
</template>

<script>
export default {
  name: 'MaskLayer',
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  methods: {
    onclose() {
      this.$emit('on-close')
    }
  }
}
</script>

<style scoped>
.maskLayer {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  z-index: 30;
}
</style>

