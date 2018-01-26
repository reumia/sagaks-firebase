<template>
  <div class="owner-buttons">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'owner-buttons'
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import 'init';

  .owner-buttons {
    position: fixed;
    bottom: $space-unit * 2;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    text-align: center;
    .button {
      width: auto;
    }
  }
</style>
