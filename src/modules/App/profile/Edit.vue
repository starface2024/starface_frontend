<template>
  <div class="p-6 pb-[80px]">
    <Loader v-if="isLoading" :loaderText="'Finalizing your registration process'" />

    <div class="flex flex-col justify-between">
      <div>
        <h2 class="font-bold text-2xl">Edit Profile</h2>
      </div>

      <div class="mt-4 flex flex-col justify-between form">
        <div class="flex flex-col gap-1">
          <div>
            <label for="">Username</label>
            <input v-model="form.userName" name="userName" class="input" type="text" />
          </div>

          <div>
            <label for="">First Name</label>
            <input v-model="form.firstName" name="firstName" class="input" type="text" />
            <ErrorMessage name="firstName" class="text-xs text-error"></ErrorMessage>
          </div>

          <div>
            <label for="">Last Name</label>
            <input v-model="form.lastName" name="lastName" class="input" type="text" />
          </div>

          <div>
            <label for="">Date of Birth</label>
            <input v-model="form.dateOfBirth" name="age" class="input" type="date" />
          </div>

          <div>
            <label for="">Country</label>
            <input v-model="form.countryName" name="country" type="text" class="input" />
          </div>

          <div>
            <label for="">City</label>
            <input v-model="form.city" name="city" class="input" type="text" />
          </div>

          <div>
            <label for="">Bio</label>
            <textarea v-model="form.bio" name="bio" class="input" type="text" > </textarea>
          </div>

          <div>
            <label for="">Interests</label>
            <!-- <input name="city" class="input" type="te/x
              <ErrorMessage name="city" class="text-xs text-error"></ErrorMessage> -->
            <div class="input-field w-full flex gap-1 flex-wrap">
              <div class="flex gap-2 flex-wrap py-2">
                <span
                  v-for="(item, idx) in interests"
                  :key="idx"
                  class="text-[11px] px-2 font-medium rounded-lg bg-gray-200 flex items-center gap-2 py-[4px]"
                >
                  {{ item }}
                  <span role="button" @click="removeInterest(idx)">
                    <i-icon icon="zondicons:close-outline" class="text-xs text-red-500" />
                  </span>
                </span>
              </div>
              <input
                type="text"
                v-model.trim="interest"
                @keyup.enter.prevent="addInterest"
                class="bg-transparent flex-1"
                placeholder="Enter Interest"
                @blur="addInterest"
                @keydown.backspace="removeLastInterest"
              />
            </div>
          </div>
        </div>

        <div class="text-center mt-6">
          <button
            @click="onSubmit"
            class="brand-btn w-full flex justify-center items-center gap-2"
            :disabled="loading"
            :class="[loading ? 'bg-gray-300 text-gray' : 'brand-primary-clear']"
          >
            <i-icon v-if="loading" icon="eos-icons:three-dots-loading" class="text-xl text-gray2" />
            <span v-else> Update </span>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-3">
      <button @click="deleteUserAccount" class="brand-btn w-full bg-red-600 text-white">
        Delete Account
      </button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      loading: false,
      form: {
        userName: '',
        firstName: '',
        lastName: '',
        city: '',
        countryName: '',
        dateOfBirth: '',
        bio: ''
      },
      interests: [],
      interest: ''
    }
  },

  methods: {
    deleteUserAccount() {
      this.$swal
        .fire({
          title: 'Uhhhh! 😔',
          text: 'Are you sure you want to delete your account? This process is irreversible',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete!'
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.completeAccountDeletion()
          }
        })
    },

    completeAccountDeletion() {
      this.$auth.deleteAccount().then(() => {
        this.$router.push('/')
      })
      return
    },

    getUser(value) {
      if (!value) this.isLoading = true
      this.$auth
        .getUser(this.uid)
        .then((res) => {
          let userData = res.user
          this.form = {
            userName: userData.userName,
            firstName: userData.firstName,
            lastName: userData.lastName,
            city: userData.city,
            countryName: userData.countryName,
            dateOfBirth: userData.dateOfBirth,
            bio: userData.bio
          }
          this.interests = userData.interests
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    addInterest() {
      if (this.interest !== '') {
        this.interests.push(this.interest)
        this.interest = ''
      }
    },

    onSubmit() {
      this.loading = true
      let interests = []
      this.interests.forEach((element) => {
        interests.push(element)
      })
      const payload = {
        ...this.form,
        interests: interests
      }
      this.$auth
        .updateUserProfile(payload, this.uid)
        .then((res) => {
          this.getUser('redirect')
          return res
        })
        .finally(() => {
          this.loading = false
        })
      return
    },

    removeInterest(index) {
      this.interests.splice(index, 1)
    },

    removeLastInterest() {
      if (this.interest == '' && this.interests.length > 0) {
        this.interests.pop()
      }
    }
  },

  mounted() {
    this.getUser()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },
    uid() {
      return this.user._id
    }
  }
}
</script>

<style></style>
