<template>
  <div class="comic">
    <Page v-if="id" class="page-comic" :class="{ 'active': isTreeWorking }">
      <Introduction
        :imageUrl="imageUrl"
        :title="title"
        :descriptions="descriptions"
        :status="status"
      >
        <Functions>
          <span class="function"><Sticker :code="status"></Sticker></span>
          <span class="function"><i class="icon material-icons">access_time</i> {{ createAt | formatDate }}</span>
          <span class="function"><i class="icon material-icons">person</i> {{ email }}</span>
          <span class="function"><i class="icon material-icons">crop_din</i> {{ cuts.length | formatCurrency }}</span>
        </Functions>
      </Introduction>
    </Page>
    <Tree v-if="hasCuts"></Tree>
    <OwnerButtons>
      <router-link :to="{ name: 'AddCut', params: { comicId: this.id } }" class="button button-small button-success">
        <i class="icon material-icons">add</i>
        {{ hasCuts ? '새 컷' : '첫 컷' }}
      </router-link>
    </OwnerButtons>
  </div>
</template>

<script>
  import Page from '@/components/partials/Page'
  import Card from '@/components/partials/Card'
  import Functions from '@/components/partials/Functions'
  import OwnerButtons from '@/components/partials/OwnerButtons'
  import Introduction from '@/components/partials/Introduction'
  import Tree from '@/components/partials/Tree'
  import Sticker from '@/components/partials/Sticker'
  import filters from '@/utils/filters'
  import { mapState } from 'vuex'

  export default {
    name: 'comic',
    props: [ 'id' ],
    filters: filters,
    components: { Page, Card, Functions, OwnerButtons, Introduction, Tree, Sticker },
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
        .catch(err => err)
    },
    computed: {
      ...mapState([ 'isTreeWorking' ]),
      hasCuts () {
        return this.cuts.length > 0
      }
    }
  }
</script>

<style lang="scss">
  @import 'init';

  .comic {
    background-image: linear-gradient(#fff, transparent);
  }

  .page-comic {
    transition: filter 0.3s ease;
    &.active {
      filter: blur(3px) grayscale(100%);
    }
  }
</style>
