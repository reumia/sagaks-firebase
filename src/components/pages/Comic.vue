<template>
  <div class="page-comic" v-if="id">
    <div class="comic-background" v-if="imageUrl" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
    <Introduction
      :title="title"
      :descriptions="descriptions"
      :status="status"
    >
      <Functions>
        <span class="function"><i class="icon material-icons">access_time</i> {{ createAt | formatDate }}</span>
        <span class="function"><i class="icon material-icons">person</i> {{ email }}</span>
        <span class="function"><i class="icon material-icons">crop_din</i> {{ cuts.length | formatCurrency }}</span>
      </Functions>
      <OwnerButtons>
        <router-link :to="{ name: 'AddCut', query: { comicId: this.id } }" class="button button-success">{{ hasCuts ? '새 컷' : '첫번째 컷' }}</router-link>
      </OwnerButtons>
    </Introduction>
    <Tree v-if="hasCuts"></Tree>
  </div>
</template>

<script>
  import Card from '@/components/partials/Card'
  import Functions from '@/components/partials/Functions'
  import OwnerButtons from '@/components/partials/OwnerButtons'
  import Introduction from '@/components/partials/Introduction'
  import Tree from '@/components/partials/Tree'
  import filters from '@/utils/filters'

  export default {
    name: 'comic',
    props: [ 'id' ],
    filters: filters,
    components: { Card, Functions, OwnerButtons, Introduction, Tree },
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
  .comic-background {
    position: absolute;
    top: $header-height;
    left: 0;
    right: 0;
    height: $space-unit * 24;
    background-size: cover;
    background-position: center center;
    filter: blur(2px);
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparentize($color-background-dark, .2), $color-background-dark);
    }
  }
</style>
