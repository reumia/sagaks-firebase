<template>
  <header class="app__header">
    <div class="header">
      <div class="header-logo">
        <router-link :to="{name: 'Home'}" class="header-logo-link">
          <i class="material-icons icon">widgets</i> 사각사각
        </router-link>
      </div>
      <div class="header-menu">
        <button v-if="hasComicId" class="button button-small button-success" @click="$router.push({ name: 'AddCut', params: { comicId: comicId } })">
          <i class="material-icons icon">add</i> {{ hasCuts ? '새 컷' : '첫 컷' }}
        </button>
        <button class="button button-small button-brand" @click="$router.push({ name: 'AddComic' })">
          <i class="material-icons icon">add</i> 새 코믹
        </button>
        <button class="button button-small button-invert" type="button" @click="TOGGLE_GLOBAL_NAVIGATION">
          <i class="material-icons icon">menu</i>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'app-header',
    methods: mapMutations([ 'TOGGLE_GLOBAL_NAVIGATION' ]),
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    computed: {
      ...mapState([ 'comicId', 'cuts' ]),
      hasComicId () {
        return Boolean(this.comicId)
      },
      hasCuts () {
        return this.cuts.length > 0
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import 'init';

  .app__header {
    background-color: $color-background;
  }

  .header {
    position: relative;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    max-width: $site-width;
    padding: 0 $space-unit;
    margin: 0 auto;
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
    font-weight: bold;
    text-align: left;
    vertical-align: bottom;
    white-space: nowrap;
    .icon {
      font-size: $font-size-large;
      vertical-align: -6px;
    }
  }
</style>
