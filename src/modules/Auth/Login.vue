<template>
  <div class="flex flex-col justify-between">
    <div class="mb-5">
      <img src="@/assets/img/icons/coin_claim.webp" class="w-12 mx-auto" alt="" />
    </div>
    <div class="">
      <h3 class="lg:text-2xl text-center md:text-2xl text-xl font-bold mb-0">Welcome back</h3>
      <span class="text-[15px] block font-regular text-gray2 text-center"
        >Please enter your correct details to login</span
      >
    </div>
    <!-- <div>
        <span class="text-xs text-error" v-for="(item, idx) in validationErrors" :key="idx">{{
          item
        }}</span>
      </div> -->

    <vForm @submit="onSubmit" v-slot="{ meta }" class="mt-6 flex flex-col justify-between">
      <div class="flex flex-col gap-4">
        <div>
          <label for="">Email</label>
          <vField name="email" class="input" type="email" rules="email"> </vField>
          <ErrorMessage name="email" class="text-xs text-error"></ErrorMessage>
        </div>

        <div>
          <label for="">Password</label>
          <vField name="password" v-slot="{ field }" rules="required">
            <div class="input-field">
              <span class="w-full flex gap-2 items-center">
                <span class="password-iccon">
                  <i-icon icon="solar:lock-bold" class="form-icon" />
                </span>
                <input
                  :type="typePassword ? 'password' : 'text'"
                  name="password"
                  class="w-full"
                  id="password"
                  placeholder="Password"
                  v-bind="field"
                />
              </span>
              <span class="password-iccon" role="button" @click="typePassword = !typePassword">
                <i-icon
                  :icon="typePassword ? 'tabler:eye' : 'gridicons:not-visible'"
                  class="form-icon"
                />
              </span>
            </div>
          </vField>
          <ErrorMessage name="password" class="text-xs text-error"></ErrorMessage>
        </div>

        <!-- <div class="flex justify-end">
            <router-link class="text-[13px] font-semibold text-primary" to="/forgot-password"
              >Forgot Password?</router-link
            >
          </div> -->
      </div>

      <div class="text-center mt-12">
        <button
          class="brand-btn w-full flex justify-center items-center gap-2"
          :disabled="isLoading || !meta.valid"
          :class="[
            isLoading
              ? 'bg-gray-300 text-gray'
              : meta.valid
                ? 'brand-primary-clear'
                : 'bg-gray-300 text-black1'
          ]"
        >
          <i-icon v-if="isLoading" icon="eos-icons:three-dots-loading" class="text-xl text-gray2" />
          <span v-else> Login </span>
        </button>
        <div class="mt-3">
          <span class="flex justify-center gap-1 text-[13px]">
            <span class="font-medium text-gray2">Don't have an account?</span>
            <router-link class="font-semibold text-primary" to="/signup">Sign Up</router-link>
          </span>
        </div>
      </div>
    </vForm>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      typePassword: true,
      isLoading: false,
      validationErrors: {}
    }
  },

  mounted() {
    // const isLoggedIn = this.$store.getters['auth/getAuthenticated']
    // if (isLoggedIn) {
    //   this.$router.push('/profile')
    // }
  },

  methods: {
    async onSubmit(values) {
      this.isLoading = true
      console.log(values)
      let payload = {
        email: values.email,
        password: values.password
      }
      this.$auth
        .login(payload)
        .then((res) => {
          console.log(res, 'from login')
          let userData = res
          this.$store.commit('auth/login', {
            user: userData.existingUser,
            token: userData.token
          })
          localStorage.setItem('_starface_token', userData.token)
          let redirectFrom = this.$route.query.redirect
          let urlTo = redirectFrom ? redirectFrom : '/'
          this.$router.push(urlTo)
        })
        .catch((error) => {
          console.log(error)
          return
        })
        .finally(() => {
          this.isLoading = false
        })
      return values
    },

    getUser() {
      this.$auth
        .getProfile()
        .then((res) => {
          let profile = res.user
          console.log(profile)
          this.$store.commit('auth/setUser', profile)
          // if(profile.email_verified_at == null) {
          //   this.$router.push(`/verify-email?email=${profile.email}`)
          // }
          // else {
          let redirectFrom = this.$route.query.redirect
          let urlTo = redirectFrom ? redirectFrom : '/'
          this.$router.push(urlTo)
          // }
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>
