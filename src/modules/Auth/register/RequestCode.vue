<template>
  <div class="flex flex-col justify-between">
    <div>
      <span
        class="bg-gray-100 border-gray-200 text-[13px] px-2 rounded-md py-[2px] block w-fit font-medium text-gray-500"
        >STEP 1</span
      >
      <h2 class="font-bold text-2xl">Create Account</h2>
      <h3 class="font-medium text-gray-400 text-sm">Can we get your email and referral code?</h3>
    </div>

    <vForm @submit="onSubmit" v-slot="{ meta }" class="mt-12 flex flex-col justify-between">
      <div class="flex flex-col gap-4">
        <div>
          <label for="">Email</label>
          <vField name="email" class="input" type="email" rules="email"> </vField>
          <ErrorMessage name="email" class="text-xs text-error"></ErrorMessage>
        </div>

        <div>
          <label for="">Referral Code</label>
          <vField v-model="ref" name="referralCode" class="input" type="text"> </vField>
        </div>

        <div>
          <label class="block leading-tight" for="">By registering, you have agreed to our <a target="_blank" href="https://termsandcondition.starface.chat" class="text-primary underline">terms and conditions</a></label>
          <!-- <vField v-model="ref" name="referralCode" class="input" type="text"> </vField> -->
        </div>
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
          <span v-else> Request Code </span>
        </button>
        <div class="mt-3">
          <span class="flex justify-center gap-1 text-[13px]">
            <span class="font-medium text-gray2">Already have an account?</span>
            <router-link class="font-semibold text-primary" to="/auth/login">Login</router-link>
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
      validationErrors: {},
      ref: ''
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
      this.$auth
        .requestCode(values)
        .then((res) => {
          console.log(res)
          this.$router.push({
            name: 'verify-code',
            query: {
              email: values.email,
              uid: res.data.userId
            }
          })
        })
        .catch((error) => {
          console.log(error)
          return
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },

  watch: {
    refCode: {
      handler(val) {
        this.ref = val
      },
      immediate: true
    }
  },

  computed: {
    refCode() {
      return this.$route.query.ref
    }
  }
}
</script>
