<template>
  <div class="nav" :class="{active: $store.state.isGlobalNavigationVisible}" role="navigation">
    <!-- 네비게이션 버튼 -->
    <nav class="nav-list">
      <router-link :to="{ name: 'Home' }" class="nav-list-item">About SAGAKSAGAK</router-link>
    </nav>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'global-navigation',
    methods: {
      ...mapMutations([ 'HIDE_GLOBAL_NAVIGATION' ])
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import 'init';

  .nav {
    @include transition (transform);
    box-sizing: border-box;
    overflow: hidden;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    width: $aside-width;
    background-color: $color-background;
    transform: translateX($aside-width + 2px);
    box-shadow: -2px 0 0 rgba(0,0,0,.07);
    &.active {
      transform: translateX(0);
    }
  }

  .nav-list {
    padding: $space-unit 0;
  }

  .nav-list-item {
    display: block;
    text-decoration: none;
    padding: $space-unit ($space-unit * 2);
    color: $color-text;
    text-transform: uppercase;
    &.active {
      color: $color-brand;
    }
  }
</style>
