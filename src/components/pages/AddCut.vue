<template>
  <div class="add-cut">
    <Card title="새 컷">
      <!-- 부모 컷 선택하기 -->
      <div class="select">
        <i class="select-icon icon material-icons" :disabled="isInitial">keyboard_arrow_down</i>
        <select class="select-input input" v-model="computedParentId" @change="handleChange" :disabled="isInitial">
          <option :value="null" disabled>부모 컷을 선택해 주세요.</option>
          <option v-for="item in siblings" :value="item.id">{{ item.title }}</option>
        </select>
      </div>
      <!-- // 부모 컷 선택하기 -->
      <!-- 현재 부모 컷 -->
      <div class="parent-cut" v-if="parentCut">
        <div class="parent-cut-image">
          <img :src="parentCut.imageUrl" class="image">
        </div>
        <div class="parent-cut-text">
          <div class="title">#{{ parentCut.id }}</div>
          <div class="descriptions">{{ parentCut.title }}</div>
        </div>
      </div>
      <!-- // 현재 부모 컷 -->
      <FileUploader
              :ratio="1 / 1"
              :exists = "imageUrl"
              @onSuccess="addFile"
      ></FileUploader>
      <form @submit.prevent="add">
        <input class="input" v-model="title" type="text" placeholder="제목" required/>
        <input class="input" v-model="email" type="email" placeholder="이메일" required/>
        <input class="input" v-model="password" type="password" placeholder="비밀번호" required/>
        <div class="button-flex">
          <button class="button button-primary" type="submit"><i class="icon material-icons">check</i> {{ isInitial ? '첫 컷 만들기' : '다음 컷 만들기' }}</button>
          <button class="button" type="button" @click="handleCancel"><i class="icon material-icons">close</i> 취소</button>
        </div>
      </form>
    </Card>
  </div>
</template>

<script>
  import Card from '@/components/partials/Card'
  import FileUploader from '@/components/partials/FileUploader'
  import { mapActions } from 'vuex'

  export default {
    name: 'add-cut',
    components: { Card, FileUploader },
    props: [ 'parentId', 'comicId' ],
    data () {
      return {
        comic: null,
        parentCut: null,
        title: null,
        createAt: null,
        imageUrl: null,
        email: null,
        password: null
      }
    },
    beforeMount () {
      this.init()
    },
    watch: {
      computedParentId () {
        this.init()
      }
    },
    computed: {
      isInitial () {
        return this.comic && this.comic.cuts.length <= 0
      },
      computedParentId: {
        get () {
          return this.parentId ? this.parentId : null
        },
        set (value) {
          this.$router.push({ name: 'AddCut', query: { comicId: this.comicId, parentId: value } })
        }
      },
      siblings () {
        return this.isInitial === false ? this.comic.cuts : []
      }
    },
    methods: {
      ...mapActions([ 'INIT_ADD_CUT', 'ADD_CUT' ]),
      handleChange (event) {
        this.computedParentId = event.target.value
      },
      handleCancel () {
        this.$router.push({ name: 'Comic', params: { id: this.comicId } })
      },
      init () {
        this.INIT_ADD_CUT({
          comicId: this.comicId,
          parentId: this.computedParentId
        })
          .then(({ comic, parentCut }) => {
            this.comic = comic
            this.parentCut = parentCut
          })
          .catch(err => {
            throw err
          })
      },
      add () {
        this.ADD_CUT({
          comicId: this.comicId,
          parentId: this.parentId ? this.parentId : null,
          title: this.title,
          createAt: new Date(),
          imageUrl: this.imageUrl,
          email: this.email,
          password: this.password
        })
          .then(response => this.$router.push({ name: 'Cut', params: { id: response.id } }))
          .catch(err => {
            throw err
          })
      },
      addFile (url) {
        this.imageUrl = url
      }
    }
  }
</script>

<style lang="scss">
  @import 'init';

  .add-cut {
    margin: 0 auto;
    max-width: $site-width-narrow;
  }

  .parent-cut {
    display: flex;
    border-radius: $radius-unit;
    margin: ($space-unit / 2) auto;
    background-color: $color-background;
    align-items: center;
    border: 2px solid $color-border;
  }
  .parent-cut-image {
    position: relative;
    margin: ($space-unit / 2);
    .image {
      display: block;
      width: 80px;
      height: 80px;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border: 1px solid rgba(0,0,0,.1);
    }
  }
  .parent-cut-text {
    margin-left: $space-unit;
    .title {
      font-weight: bold;
    }
    .descriptions {
      color: $color-text-light;
      font-size: $font-size-small;
    }
  }
</style>
