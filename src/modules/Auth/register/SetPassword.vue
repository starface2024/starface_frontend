<template>
  <div class="flex flex-col justify-between">
    <div class="">
      <span
        class="bg-gray-100 border-gray-200 text-[13px] px-2 rounded-md py-[2px] block w-fit font-medium text-gray-500"
        >STEP 3</span
      >
      <h3 class="lg:text-2xl md:text-2xl text-xl font-bold mb-0">Set Password</h3>
      <span class="text-[15px] block font-regular text-gray2"
        >Set valid password for account aunthentication</span
      >
    </div>

    <div>
      <vForm
        class="mt-12 flex flex-col gap-4"
        @submit="onSubmit"
        :validation-schema="currentSchema"
        keep-values
        v-slot="{ meta }"
      >
        <div>
          <label for="">Password</label>
          <vField name="password" v-slot="{ field }">
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
        <div>
          <label for="">Confirm Password</label>
          <vField name="confirmPassword" v-slot="{ field }">
            <div class="input-field">
              <span class="w-full flex gap-2 items-center">
                <span class="password-iccon">
                  <i-icon icon="solar:lock-bold" class="form-icon" />
                </span>
                <input
                  :type="typePassword2 ? 'password' : 'text'"
                  name="confirmPassword"
                  class="w-full"
                  id="confirm_password"
                  placeholder="Confirm Password"
                  v-bind="field"
                />
              </span>
              <span class="password-iccon" role="button" @click="typePassword2 = !typePassword2">
                <i-icon
                  :icon="typePassword ? 'tabler:eye' : 'gridicons:not-visible'"
                  class="form-icon"
                />
              </span>
            </div>
          </vField>
          <ErrorMessage name="confirmPassword" class="text-xs text-error"></ErrorMessage>
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
            <i-icon
              v-if="isLoading"
              icon="eos-icons:three-dots-loading"
              class="text-xl text-gray2"
            />
            <span v-else> Set Password </span>
          </button>
        </div>
      </vForm>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup'
export default {
  components: {},
  data() {
    return {
      typePassword: true,
      typePassword2: true,
      isLoading: false,
      validationErrors: {},
      currentSchema: yup.object({
        password: yup.string().required().min(8),
        confirmPassword: yup
          .string()
          .required()
          .min(8)
          .oneOf([yup.ref('password')], 'Passwords must match')
      })
    }
  },

  methods: {
    onSubmit(values) {
      this.isLoading = true
      let payload = {
        email: this.email,
        password: values.password
      }
      this.$auth
        .setPassword(payload)
        .then((res) => {
          console.log(res)
          const userData = res.data
          this.$store.commit('auth/login', {
            token: userData.token
          })
          localStorage.setItem('_starface_token', userData.token)
          this.$router.push(`/complete-profile?uid=${this.uid}`)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  },

  computed: {
    email() {
      return this.$route.query.email
    },
    uid() {
      return this.$route.query.uid
    }
  }
}
</script>
