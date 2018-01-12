<template>
  <div class="introduction">
    <div class="introduction-image" v-if="imageUrl" :style="{ backgroundImage: `url(${imageUrl})`}">
      <slot></slot>
    </div>
    <div class="introduction-title">
      {{ title }}
    </div>
    <div class="introduction-descriptions">{{ descriptions }}</div>
  </div>
</template>

<script>
  export default {
    name: 'introduction',
    props: [ 'imageUrl', 'title', 'status', 'descriptions', 'imageUrl' ],
    mounted () {
      console.log(this.$el.offsetTop, this.$el.offsetHeight)
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import 'init';

  .introduction {
    overflow: hidden;
    max-width: $intro-width;
  }
  .introduction-image {
    position: relative;
    width: 100%;
    height: 33.333vw;
    background-position: center center;
    background-size: cover;
  }
  .introduction-title {
    margin: $space-unit $space-unit 0;
    font-weight: bold;
  }
  .introduction-descriptions {
    margin: ($space-unit / 2) $space-unit 0;
    color: $color-text-light;
    font-size: $font-size-small;
    word-break: break-all;
  }
  .introduction-button-wrap {
  }
</style>
