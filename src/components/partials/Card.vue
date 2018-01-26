<template>
  <div class="card">
    <div class="card-title" v-if="title">{{title}}</div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'card',
    props: ['title']
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import 'init';

  .card {
    box-sizing: border-box;
    max-width: $site-width;
    margin: 0 auto;
  }

  .card ~ .card {
    margin-top: $space-unit * 2;
  }

  .card-title {
    margin-bottom: $space-unit / 2;
    color: $color-text-lighter;
    font-size: $font-size-small;
  }
</style>
