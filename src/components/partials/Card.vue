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
    margin: $space-unit 0;
  }

  .card-title {
    margin-bottom: $space-unit;
    color: $color-text-lighter;
    font-size: $font-size-small;
  }
</style>
