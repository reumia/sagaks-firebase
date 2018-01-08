<template>
  <div class="file-uploader-wrap">
    <!-- Exists Image -->
    <div class="exists-image"
         v-if="exists"
         :style="{
            backgroundImage: `url(${exists})`,
            paddingTop: `${(100 / cropRatio)}%`
         }"
    >
    </div>
    <!-- File Uploader -->
    <div class="file-uploader">
      <!-- Editor -->
      <div class="file-uploader-edit" v-show="temp">
        <div class="edit-image">
          <vue-cropper
                  v-show="temp"
                  ref="cropper"
                  :guides="true"
                  :aspectRatio="cropRatio"
                  :view-mode="2"
                  drag-mode="crop"
                  :auto-crop-area="0.5"
                  :background="true"
                  :rotatable="true"
                  :src="this.temp"
                  alt="Source Image"
          >
          </vue-cropper>
        </div>
        <div class="button-flex">
          <button type="submit" class="button button-extra-small button-success" @click.prevent="onCropSubmit">
            <i class="icon material-icons">crop</i> 자르기
          </button>
          <button type="button" class="button button-extra-small button-danger" @click.prevent="$refs.upload.clear">
            <i class="icon material-icons">close</i> 취소
          </button>
        </div>
      </div>
      <!-- Button -->
      <div class="file-uploader-button">
        <input
                ref="input"
                type="file"
                accept="image/png,image/gif,image/jpeg,image/webp"
                class="button"
                @change="handleInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import firebase from '@/utils/firebase'
  import uuid from 'uuid/v4'
  import 'vue-cropperjs'

  const storage = firebase.storage()

  export default {
    name: 'file-uploader',
    props: [ 'ratio', 'exists' ],
    data () {
      return {
        temp: null,
        cropped: null,
        imageUrl: null
      }
    },
    computed: {
      ...mapState([ 'comic' ]),
      cropRatio () {
        return this.ratio ? this.ratio : (3 / 1)
      }
    },
    methods: {
      handleInput (event) {
        const files = event.target.files
        const file = files[0]
        const reader = new FileReader()

        if (!file.type.includes('image/')) {
          alert('Please select an image file')
          return
        }

        reader.onload = (event) => {
          this.temp = event.target.result
          this.$refs.cropper.replace(event.target.result)
        }

        reader.readAsDataURL(file)
      },
      handleUpload (blob) {
        const ref = storage.ref().child(uuid())

        ref
          .put(blob)
          .then(this.onUploadSucceed)
          .catch(this.onUploadError)
      },
      onCropSubmit () {
        this.$refs.cropper.getCroppedCanvas().toBlob(blob => {
          this.handleUpload(blob)
          this.temp = null
          this.$refs.input.value = ''
          this.$refs.cropper.destroy()
        })
      },
      onUploadSucceed (response) {
        this.$emit('onSuccess', response.downloadURL)
      },
      onUploadError (err) {
        throw new Error(err)
      }
    }
  }
</script>

<style lang="scss">
  @import 'init';
  @import '~cropperjs/dist/cropper.css';

  %image-height {
    position: relative;
    border-radius: $radius-unit;
    padding-top: 33%;
    margin: ($space-unit / 2) auto;
    height: 0;
  }

  .exists-image {
    @include transition(height);
    @extend %image-height;
    background-size: cover;
    background-position: center center;
    &.active {
      height: 39px;
    }
    .button-flex {
      position: absolute;
      margin: 0;
      top: $space-unit / 2;
      right: $space-unit / 2;
      justify-content: flex-end;
    }
  }

  .edit-image {
    img {
      display: block;
      max-width: 100%;
    }
  }

  .file-uploader-image {
    position: relative;
    overflow: hidden;
    border-radius: $radius-unit;
    margin: ($space-unit / 2) auto;
    .image {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  .file-uploader-button {
    margin: ($space-unit / 2) auto;
  }

  .file-uploader-edit {
    position: relative;
    overflow: hidden;
    border-radius: $radius-unit;
    margin: ($space-unit / 2) auto;
    .button-flex {
      position: absolute;
      margin: 0;
      top: $space-unit / 2;
      right: $space-unit / 2;
      z-index: 1;
    }
  }

  .file-uploader-dimmed {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 9999;
    opacity: .8;
    text-align: center;
    background: $color-text-lighter;
  }
  .file-uploader-dimmed .text {
    margin: -.5em 0 0;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: $font-size;
    color: #fff;
    padding: 0;
  }
</style>
