<template>
  <div class="introduction">
    <div class="introduction-image" v-if="imageUrl" :style="{ backgroundImage: `url(${imageUrl})`}"></div>
    <div class="introduction-title">
      {{ title }}
      <Sticker :code="status"></Sticker>
    </div>
    <div class="introduction-descriptions">{{ descriptions }}</div>
    <div class="introduction-button-wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Sticker from '@/components/partials/Sticker'

  export default {
    name: 'introduction',
    props: [ 'title', 'status', 'descriptions', 'imageUrl' ],
    components: { Sticker },
    mounted () {
      console.log(this.$el.offsetTop, this.$el.offsetHeight)
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import 'init';

  .introduction {
    overflow: hidden;
    position: relative;
    z-index: 100;
    border-radius: $radius-unit;
    margin: ($space-unit * .5) ($space-unit * 1.5);
    max-width: $intro-width;
    padding: ($space-unit);
    background-color: $color-background;
    box-shadow: $box-shadow-unit;
    box-sizing: border-box;
  }
  .introduction-image {
    padding-top: 33.333%;
    width: 100%;
    height: 0;
    background-position: center center;
    background-size: cover;
  }
  .introduction-title {
    font-weight: bold;
  }
  .introduction-descriptions {
    margin-top: $space-unit / 4;
    color: $color-text-light;
    font-size: $font-size-small;
    word-break: break-all;
  }
  .introduction-button-wrap {
  }
</style>
