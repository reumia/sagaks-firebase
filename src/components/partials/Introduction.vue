<template>
  <div class="introduction" @click="handleClick" :class="{ 'active': isTreeWorking }">
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
  import { mapState } from 'vuex'

  export default {
    name: 'introduction',
    props: [ 'imageUrl', 'title', 'status', 'descriptions', 'imageUrl' ],
    computed: {
      ...mapState([ 'isTreeWorking' ])
    },
    mounted () {
      console.log(this.$el.offsetTop, this.$el.offsetHeight)
    },
    methods: {
      handleClick () {
        console.log('aaa')
        this.isActive = this.isActive === false
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import 'init';

  .introduction {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    transition: filter 0.3s ease;
    &.active {
      filter: blur(3px) opacity(50%) grayscale(100%);
    }
    @media screen and (min-width: 640px) {
      flex-direction: row;
      justify-content: center;
    }
  }
  .introduction-image {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 25vw;
    background-position: center center;
    background-size: cover;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: linear-gradient(transparentize($color-background-dark, .1), $color-background-dark);
    }
    @media screen and (min-width: 640px) {
    }
  }
  .introduction-body {
    position: relative;
    padding: $space-unit;
    text-align: center;
    @media screen and (min-width: 640px) {
      padding: ($space-unit / 2) $space-unit;
      width: 50%;
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
  }
</style>
