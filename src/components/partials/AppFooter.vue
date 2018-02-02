<template>
  <Page class="page-grey">
    <Card>
      <footer class="app__footer">
        @ 사각사각 2018 Allright reserved by zzoman.
      </footer>
    </Card>
  </Page>
</template>

<script>
  import Page from '@/components/partials/Page'
  import Card from '@/components/partials/Card'

  export default {
    name: 'app-footer',
    components: { Page, Card }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  @import 'init';

  .app__footer {
    color: $color-text-lighter;
    font-size: $font-size-small;
  }
</style>
