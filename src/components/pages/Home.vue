<template>
  <div>
    <Page class="home">

    </Page>
    <Page class="page-home page-grey">
      <Card title="인기 코믹">
        <Index :items="$store.state.comicsLatest"></Index>
      </Card>
      <Card title="최근 코믹">
        <Index :items="$store.state.comicsLatest"></Index>
      </Card>
    </Page>
  </div>
</template>

<script>
  import Carousel from '@/components/partials/Carousel'
  import Index from '@/components/partials/Index'
  import Card from '@/components/partials/Card'
  import Page from '@/components/partials/Page'

  export default {
    name: 'home',
    components: { Carousel, Card, Index, Page },
    created () {
      this.$store.dispatch('GET_COMICS')
        .catch((err) => {
          console.warn(err.response.data)
        })
    },
    data () {
      return {
        title: '사각사각 소개'
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'init';
</style>
