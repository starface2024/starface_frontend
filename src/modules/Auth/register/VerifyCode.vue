<template>
  <div class="flex flex-col justify-between">
    <div>
      <span
        class="bg-gray-100 border-gray-200 text-[13px] px-2 rounded-md py-[2px] block w-fit font-medium text-gray-500"
        >STEP 2</span
      >
      <h2 class="font-bold text-2xl">Verify Code</h2>
      <h3 class="font-medium text-gray-400 text-sm">
        Enter token sent to your email to verify email
      </h3>
    </div>

    <div class="mt-12">
      <div class="flex justify-center">
        <VuePincodeInput
          v-model="pincode"
          input-class="w-16 h-16 text-2xl font-semibold rounded-lg text-gray-600 border-2 border-gray-300"
          :digits="4"
          autofocus
        />
      </div>
      <div class="text-center mt-4">
        <button type="button" class="" :disabled="counting" @click="sendVerifyToken">
          <vue-countdown
            v-if="counting"
            :time="120000"
            @end="onCountdownEnd"
            v-slot="{ minutes, seconds, totalSeconds }"
          >
            <span class="font-medium text-[13.6px]" :class="{ 'text-red-600': totalSeconds <= 10 }">
              Resend OTP in {{ '0' + minutes }}:{{ seconds < 10 ? `0${seconds}` : seconds }}
            </span>
          </vue-countdown>
          <span class="bg-primary text-white px-3 py-2 rounded-sm font-medium text-[13.6px]" v-else
            >Resend Token</span
          >
        </button>
      </div>
    </div>

    <div class="text-center mt-12">
      <button
        @click="onSubmit"
        class="brand-btn w-full flex justify-center items-center gap-2"
        :disabled="isValid"
        :class="[isValid ? 'bg-gray-300 text-gray-500' : 'brand-primary-clear']"
      >
        <i-icon v-if="isLoading" icon="eos-icons:three-dots-loading" class="text-xl text-gray2" />
        <span v-else> Verify Code </span>
      </button>
    </div>
  </div>
</template>

<script>
import VuePincodeInput from 'vue3-pincode-input'
export default {
  components: { VuePincodeInput },

  data() {
    return {
      typePassword: true,
      isLoading: false,
      validationErrors: {},
      pincode: '',
      counting: false
    }
  },

  mounted() {
    // this.$store.commit('auth/REMOVE_ERRORS')
    this.startCountdown()
  },

  methods: {
    async onSubmit() {
      this.isLoading = true
      let payload = {
        otp: this.pincode,
        userId: this.uid
      }
      this.$auth
        .verifyOTP(payload)
        .then((res) => {
          console.log(res, 'from login')
          this.$router.push({
            name: 'set-password',
            query: {
              email: this.email,
              uid: this.uid
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
    },

    sendVerifyToken() {
      let payload = {
        email: this.email,
        userId: this.uid
      }
      this.$auth.resendCode(payload).then((res) => {
        this.startCountdown()
        return res
      })
    },

    startCountdown() {
      this.counting = true
    },

    onCountdownEnd() {
      this.counting = false
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },
    isValid() {
      return this.isLoading || this.pincode.length < 4
    },
    email() {
      return this.$route.query.email
    },
    uid() {
      return this.$route.query.uid
    }
  }
}
</script>
