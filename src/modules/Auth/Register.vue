<template>
  <div>
    <div class="flex flex-col justify-between">
      <div class="mb-4">
        <h2 class="font-bold text-2xl">Create Account</h2>
        <h3 class="font-medium text-gray-400 text-sm">Can we get your email and referral code?</h3>
        <div></div>
      </div>

      <div>
        <vForm
          class="flex flex-col mt-20"
          @submit="nextStep"
          :validation-schema="currentSchema"
          keep-values
          v-slot="{ meta, values }"
        >
          <template v-if="currentStep == 0">
            <div class="flex flex-col gap-4">
              <div>
                <label for="">Email</label>
                <vField name="title" placeholder="Enter Property Title" class="input"> </vField>
                <ErrorMessage name="title" class="text-xs text-error"></ErrorMessage>
              </div>

              <div>
                <label for="">Referral Code</label>
                <vField name="amount" placeholder="Amount" class="input"> </vField>
                <ErrorMessage name="amount" class="text-xs text-error"></ErrorMessage>
              </div>
            </div>
          </template>

          <template v-if="currentStep == 1">
            <div class="flex flex-col justify-center items-center w-full gap-6">
              {{ values }}
              <vField name="pincode" v-slot="{ field }">
                <VuePincodeInput
                  v-model="pincode"
                  input-class="w-16 h-16 text-2xl font-semibold rounded-lg text-gray-600 border-2 border-gray-300"
                  :digits="4"
                  autofocus
                  v-bind="field"
                />
              </vField>
            </div>
          </template>

          <template v-if="currentStep == 2">
            <div></div>
          </template>

          <div class="flex flex-col gap-4 mt-7">
            <button
              class="brand-btn w-full brand-primary bg-primary"
              v-if="currentStep > 0"
              type="submit"
              @click="prevStep"
            >
              Previous
            </button>
            <button
              class="brand-btn w-full"
              v-if="currentStep !== 2"
              type="submit"
              :disabled="!meta.valid"
              :class="[meta.valid ? 'brand-primary bg-primary' : 'bg-gray-300 text-black1']"
            >
              Next
            </button>
            <button
              :disabled="isLoading || !meta.valid"
              :class="[
                isLoading
                  ? 'bg-gray1 text-gray'
                  : meta.valid
                    ? 'brand-primary bg-primary'
                    : 'bg-gray-300 text-black1'
              ]"
              class="brand-btn w-full"
              v-if="currentStep === 2"
              type="submit"
            >
              Done
            </button>
          </div>
        </vForm>
      </div>
    </div>
  </div>
</template>

<script>
import * as yup from 'yup'
// import { debounce } from 'lodash'
import VuePincodeInput from 'vue3-pincode-input'
export default {
  components: { VuePincodeInput },
  data() {
    return {
      visible: false,
      isLoading: false,
      validationErrors: {},
      step: 0,
      schemas: [
        yup.object({
          title: yup.string().required(),
          state: yup.string(),
          city: yup.string(),
          size: yup.string(),
          // desc: yup.string(),
          additional_charge: yup.string().matches(/^[0-9]+$/, 'Must be numeric')
        }),

        yup.object({
          pincode: yup
            .string()
            .required('Pincode is required')
            .matches(/^\d{4}$/, 'Pincode must be 4 digits')
        })
      ],
      pincode: ''
    }
  },

  methods: {
    nextStep(values) {
      if (this.step == 2) {
        // this.create(values)
        return values
      }
      console.log(this.step)
      this.step++
      // this.$emit('nextStep')
    },

    prevStep() {
      if (this.step <= 0) {
        return
      }
      this.step--
    }
  },

  beforeMount() {},

  watch: {
    step: {
      handler(oldVal, newVal) {
        if (oldVal !== newVal) {
          let existingQuery = this.$route.query
          this.$router.push({ name: 'register', query: { ...existingQuery, step: this.step } })
        }
      }
    }
  },

  mounted() {
    console.log(!this.$route.query.step)
    let existingQuery = this.$route.query
    if (!this.$route.query.step) {
      this.$router.push({ name: 'register', query: { ...existingQuery, step: this.step } })
    }
  },

  computed: {
    currentSchema() {
      return this.schemas[this.currentStep]
    },
    currentStep() {
      return this.$route.query.step
    }
    // currentStep() {
    //   return this.$route.query.step
    // }
  }
}
</script>
