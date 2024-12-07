<template>
  <div class="p-6">
    <Loader v-if="isLoading" :loaderText="'Finalizing your registration process'" />
    <div class="flex flex-col justify-between">
      <div>
        <span
          class="bg-gray-100 border-gray-200 text-[13px] px-2 rounded-md py-[2px] block w-fit font-medium text-gray-500"
          >Profile Photo</span
        >
        <h2 class="font-bold text-2xl">Profile Photo</h2>
        <h3 class="font-medium text-gray-400 text-sm">Please, upload a profile photo</h3>
      </div>

      <div class="mt-4">
        <div
          class="dropzone-container group relative flex flex-col items-center justify-center text-center"
          @dragover="dragover"
          @dragleave="dragleave"
          @drop="drop"
        >
          <input
            type="file"
            name="file"
            id="fileInput"
            class="hidden-input"
            @change="onChange"
            ref="file"
            accept=".png,.jpg,.jpeg"
          />

          <label
            for="fileInput"
            class="file-label mb-0 flex flex-col items-center"
            v-if="Object.keys(files).length <= 0"
          >
            <i-icon icon="ph:upload-simple-fill" class="text-[30px]" />
            <div v-if="isDragging">Release to drop files here.</div>
            <div v-else class="text-[16px] font-medium mb-0">
              Upload <span class="text-primary font-semibold"> Profile photo </span>
            </div>
          </label>

          <div class="" v-else>
            <img class="h-[180px] w-full object-cover object-top" :src="generateURL()" alt="" />
            <div
              class="absolute inset-0 bg-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"
            ></div>
            <div
              class="absolute inset-0 flex flex-col gap-2 px-12 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <label
                class="bg-white py-2 px-4 font-semibold shadow text-primary capitalize text-sm block w-fit rounded-md"
                for="fileInput"
                role="button"
              >
                replace
              </label>
              <button
                class="bg-white py-2 px-4 font-semibold shadow text-red-600 capitalize text-sm block w-fit rounded-md"
                @click="removePhoto"
              >
                remove
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-6">
        <button
          @click="onSubmit"
          class="brand-btn w-full flex justify-center items-center gap-2"
          :disabled="notValid"
          :class="[notValid ? 'bg-gray-300 text-gray' : 'brand-primary-clear']"
        >
          <i-icon v-if="isLoading" icon="eos-icons:three-dots-loading" class="text-xl text-gray2" />
          <span v-else> Complete </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      files: {},
      isDragging: false,
      file: null
    }
  },

  methods: {
    getUser() {
      this.$auth.getUser(this.uid).then((res) => {
        console.log(res)
        this.$store.commit('auth/setUser', res.user)
        this.$router.push('/')
        return res
      })
    },

    onSubmit() {
      this.isLoading = true

      let formdata = new FormData()
      formdata.append('profilePicture', this.files[0])
      this.$auth
        .updateProfilePhoto(formdata)
        .then((res) => {
          this.getUser()
          return res
        })
        .finally(() => {
          this.isUploading = false
        })
    },

    onChange() {
      this.files = this.$refs.file.files
      console.log(this.files[0], 'from:photo Upload')
    },

    dragover(e) {
      e.preventDefault()
      this.isDragging = true
    },

    dragleave() {
      this.isDragging = false
    },

    drop(e) {
      e.preventDefault()
      this.$refs.file.files = e.dataTransfer.files
      this.onChange()
      this.isDragging = false
    },

    removePhoto() {
      if (Object.keys(this.files).length !== 0) {
        this.files = {}
      }
    },

    generateURL() {
      let fileSrc = URL.createObjectURL(this.files[0])
      console.log(fileSrc)
      this.file = fileSrc
      // return { backgroundImage: `url(${fileSrc})` }
      return fileSrc
    }
  },

  mounted() {
    // this.getUser()
  },

  computed: {
    uid() {
      return this.$route.query.uid
    },
    notValid(){
      return this.isLoading || Object.keys(this.files).length <= 0
    }
  }
}
</script>

<style scoped>
.dropzone-container {
  height: 200px;
  width: 100%;
  background: var(---gray-200);
  border: 2px solid var(---gray-500);
  /* border-style: ; */
  border-radius: 12px;
  background-size: cover;
  background-position: center;
}

.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}

.preview-container {
  display: flex;
  margin-top: 2rem;
}

.preview-card {
  display: flex;
  border: 1px solid #a2a2a2;
  padding: 5px;
  margin-left: 5px;
}

.preview-img {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: 1px solid #a2a2a2;
  background-color: #a2a2a2;
}
</style>
