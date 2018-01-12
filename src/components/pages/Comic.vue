<template>
  <div class="page-comic" v-if="id">
    <Introduction
            :imageUrl="imageUrl"
            :title="title"
            :descriptions="descriptions"
            :status="status"
    >
      <Functions>
        <Sticker :code="status"></Sticker>
        <span class="function"><i class="icon material-icons">access_time</i> {{ createAt | formatDate }}</span>
        <span class="function"><i class="icon material-icons">person</i> {{ email }}</span>
        <span class="function"><i class="icon material-icons">crop_din</i> {{ cuts.length | formatCurrency }}</span>
      </Functions>
    </Introduction>
    <Tree v-if="hasCuts"></Tree>
    <OwnerButtons>
      <router-link :to="{ name: 'AddCut', query: { comicId: this.id } }" class="button button-small button-success">
        <i class="icon material-icons">add</i>
        {{ hasCuts ? '새 컷' : '첫 컷' }}
      </router-link>
    </OwnerButtons>
  </div>
</template>

<script>
  import Card from '@/components/partials/Card'
  import Functions from '@/components/partials/Functions'
  import OwnerButtons from '@/components/partials/OwnerButtons'
  import Introduction from '@/components/partials/Introduction'
  import Tree from '@/components/partials/Tree'
  import Sticker from '@/components/partials/Sticker'
  import filters from '@/utils/filters'

  export default {
    name: 'comic',
    props: [ 'id' ],
    filters: filters,
    components: { Card, Functions, OwnerButtons, Introduction, Tree, Sticker },
    data () {
      return {
        createAt: null,
        title: null,
        descriptions: null,
        email: null,
        imageUrl: null,
        status: null,
        cuts: []
      }
    },
    beforeMount () {
      this.$store.dispatch('GET_COMIC_BY_ID', { id: this.id })
        .then(response => {
          this.status = response.status
          this.createAt = response.createAt
          this.title = response.title
          this.descriptions = response.descriptions
          this.email = response.email
          this.imageUrl = response.imageUrl
          this.cuts = response.cuts
        })
        .catch(err => new Error(err))
    },
    computed: {
      hasCuts () {
        return this.cuts.length > 0
      }
    }
  }
</script>

<style lang="scss">
  @import 'init';

  .page-comic {
    overflow: hidden;
  }
</style>
