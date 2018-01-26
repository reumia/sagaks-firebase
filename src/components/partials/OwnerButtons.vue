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
    display: flex;
    right: 0;
    margin: $space-unit;
    justify-content: center;
    box-sizing: border-box;
    text-align: center;
    @media screen and (min-width: 640px) {
      margin: $space-unit ($space-unit * 2);
    }
    .button {
      width: auto;
    }
  }
</style>
