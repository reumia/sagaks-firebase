<template>
  <div class="introduction">
    <div class="introduction-image" v-if="imageUrl" :style="{ backgroundImage: `url(${imageUrl})`}"></div>
    <div class="introduction-body">
      <div class="introduction-title">{{ title }}</div>
      <div class="introduction-descriptions">{{ descriptions }}</div>
      <div class="introduction-functions">
        <slot></slot>
      </div>
    </div>
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
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    filter: grayscale(50%);
    @media screen and (min-width: 640px) {
      max-width: $site-width;
      margin: $space-unit ($space-unit / 2);
      flex-direction: row;
      justify-content: center;
    }
    @media screen and (min-width: 960px) {
      margin: $space-unit auto;
    }
  }
  .introduction-image {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 33.333vw;
    background-position: center center;
    background-size: cover;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: 1px solid rgba(0,0,0,.1);
    }
    @media screen and (min-width: 640px) {
      margin: 0 ($space-unit / 2);
      width: 50%;
      height: auto;
    }
  }
  .introduction-body {
    position: relative;
    padding: $space-unit;
    text-align: center;
    @media screen and (min-width: 640px) {
      padding: ($space-unit / 2) $space-unit;
      width: 50%;
      text-align: left;
    }
  }
  .introduction-title {
    color: $color-text-light;
  }
  .introduction-descriptions {
    margin-top: ($space-unit / 4);
    color: $color-text-lighter;
    font-size: $font-size-small;
    word-break: break-all;
  }
  .introduction-functions {
    margin-top: $space-unit;
    @media screen and (min-width: 640px) {
      margin-top: ($space-unit * 0.5);
    }
  }
</style>
