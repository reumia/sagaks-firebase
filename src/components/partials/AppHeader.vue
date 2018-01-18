<template>
  <header class="app__header">
    <div class="header-logo">
      <router-link :to="{name: 'Home'}" class="header-logo-link">SAGAKSAGAK</router-link>
    </div>
    <div class="header-menu">
      <button class="header-menu-button" type="button" @click="TOGGLE_GLOBAL_NAVIGATION">
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
    justify-content: center;
    margin: 0 auto;
    padding: 0 $space-unit / 4;
    max-width: $site-width;
  }

  .header-logo,
  .header-menu {
    padding-left: $space-unit / 2;
  }

  .header-menu-button,
  .header-logo-link {
    @extend %form-init;
    display: inline-block;
    width: auto;
    line-height: $header-height;
    text-align: left;
    white-space: nowrap;
    color: transparentize($color-text, .4);
  }

  .header-logo-link {
    font-weight: bold;
  }
</style>
