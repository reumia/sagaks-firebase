<template>
  <Page class="page-add-comic">
    <Card :title="id ? '코믹 수정' : '새 코믹'" class="card-narrow">
      <FileUploader
        :ratio="1"
        :exists="imageUrl"
        @onSuccess="addFile"
      ></FileUploader>
      <form @submit.prevent="handleSubmit">
        <input class="input" v-model="title" type="text" placeholder="제목" required/>
        <textarea class="input" v-model="descriptions" placeholder="설명" required></textarea>
        <input class="input" v-model="email" type="email" placeholder="이메일" required/>
        <input class="input" v-model="password" type="password" placeholder="비밀번호" required/>
        <div class="button-flex">
          <button class="button button-brand" type="submit"><i class="icon material-icons">check</i>새 코믹 만들기</button>
          <button class="button" type="button" @click="$router.go(-1)"><i class="icon material-icons">close</i> 취소
          </button>
        </div>
      </form>
    </Card>
  </Page>
</template>

<script>
  import Card from '@/components/partials/Card'
  import Page from '@/components/partials/Page'
  import FileUploader from '@/components/partials/FileUploader'
  import { mapActions } from 'vuex'

  export default {
    name: 'add-comic',
    components: { Card, FileUploader, Page },
    props: [ 'id' ],
    data () {
      return {
        title: null,
        descriptions: null,
        createAt: null,
        imageUrl: null,
        email: null,
        password: null
      }
    },
    methods: {
      ...mapActions([ 'ADD_COMIC' ]),
      add () {
        this.ADD_COMIC({
          status: 'OPENED',
          createAt: new Date(),
          title: this.title,
          descriptions: this.descriptions,
          imageUrl: this.imageUrl,
          email: this.email,
          password: this.password
        })
          .then(response => this.$router.push({ name: 'Comic', params: { id: response.id } }))
          .catch(err => {
            throw err
          })
      },
      handleSubmit () {
        this.add()
      },
      addFile (url) {
        this.imageUrl = url
      }
    }
  }
</script>

<style lang="scss">
  @import 'init';
</style>
