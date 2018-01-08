<template>
  <div class="index">
    <div class="item-wrap">
      <IndexItem
        v-for="(item, index) in items"
        :key="index"
        :id="index"
        :title="item.title"
        :createdAt="item.createdAt"
        :imageUrl="item.imageUrl"
      ></IndexItem>
    </div>
  </div>
</template>

<script>
  import IndexItem from '@/components/partials/IndexItem'

  export default {
    name: 'index',
    components: { IndexItem },
    props: [ 'items' ]
  }
</script>

<style lang="scss" scoped>
  @import 'init';

  .item-wrap {
    display: flex;
    flex-wrap: wrap;
    margin: $space-unit / -2;
  }
</style>
