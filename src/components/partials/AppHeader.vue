<template>
  <header class="app__header">
    <div class="header-logo">
      <router-link :to="{name: 'Home'}" class="header-logo-link">
        <i class="material-icons icon">widgets</i> 사각사각
      </router-link>
    </div>
    <div class="header-menu">
      <button class="button button-small button-brand" @click="$router.push({ name: 'AddComic' })">
        <i class="material-icons icon">add</i> 새 코믹 만들기
      </button>
      <button class="button button-small button-invert" type="button" @click="TOGGLE_GLOBAL_NAVIGATION">
        <i class="material-icons icon">menu</i>
      </button>
    </div>
  </header>
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    name: 'app-header',
    methods: mapMutations([ 'TOGGLE_GLOBAL_NAVIGATION' ]),
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import 'init';

  .app__header {
    position: relative;
    display: flex;
    justify-content: space-between;
    max-width: $site-width;
    padding: 0 $space-unit;
    margin: 0 auto;
    background-color: $color-background;
    @media screen and (min-width: 640px) {
      padding: 0 ($space-unit * 2);
    }
  }

  .header-menu {
    display: flex;
    align-items: center;
    > .button ~ .button {
      margin-left: $space-unit / 2;
    }
  }

  .header-logo-link {
    @extend %form-init;
    display: inline-block;
    width: auto;
    color: $color-brand;
    line-height: $header-height;
    text-align: left;
    vertical-align: bottom;
    white-space: nowrap;
    .icon {
      font-size: $font-size-large;
      vertical-align: -6px;
    }
  }
</style>
