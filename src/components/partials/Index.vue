<template>
  <div class="index">
    <div class="item-wrap">
      <IndexItem
        v-for="(item, index) in items"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :createdAt="item.createAt"
        :imageUrl="item.imageUrl"
        :descriptions="item.descriptions"
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
  }
</style>
