<template>
  <modal-wrapper @close="handleClose" :hasHeader="false">
    <template #body>
      <div class="text-center">
        <!-- <h5 class="font-semibold uppercase">Balance detected:</h5>
          <h1 class="text-3xl font-bold">{{ item.wallet_balance_formatted }}</h1> -->

        <div class="mt-4">
          <span class="block font-semibold mb-3 text-[15px]">
            <slot name="content"></slot>
          </span>
          <div class="flex justify-center">
            <VuePincodeInput
              v-model="pincode"
              input-class="w-[40px] h-[40px] text-xl font-semibold rounded-lg text-gray-600 border border-gray-300"
              success-class=""
              spacing-class=""
              :digits="6"
              autofocus
            />
          </div>

          <span class="mt-4 block">
            <span class="block">
              <span class="flex justify-center" v-if="isLoading">
                <i-icon icon="line-md:loading-alt-loop" class="text-[20px]" />
              </span>
              <span v-else type="button" class="" :disabled="counting" @click="getToken">
                <vue-countdown
                  v-if="isCounting"
                  :time="120000"
                  @end="onCountdownEnd"
                  v-slot="{ minutes, seconds, totalSeconds }"
                >
                  <span
                    class="text-secondary font-semibold text-sm"
                    :class="{ 'text-red-600': totalSeconds <= 10 }"
                  >
                    Resend code in {{ '0' + minutes }}:{{ seconds < 10 ? `0${seconds}` : seconds }}
                  </span>
                </vue-countdown>
                <span
                  class="text-secondary block underline font-semibold text-sm"
                  role="button"
                  v-else
                  >Resend code</span
                >
              </span>
            </span>
            <!-- <span class="font-semibold block text-[12px]">
                (this will be sent to email - {{ email }})
              </span> -->
          </span>
        </div>

        <div class="mt-6 flex gap-2 justify-center">
          <!-- <button class="zuga-btn zuga-primary px-4" >Transfer</button> -->
          <button
            @click="complete"
            class="brand-btn-md px-4 flex gap-2"
            :disabled="busy || pincode.length < 4"
            :class="[
              busy
                ? 'bg-gray-400 text-gray-600'
                : pincode.length < 5
                  ? 'bg-gray-400 text-gray-600'
                  : 'brand-primary'
            ]"
          >
            <span class="flex justify-center" v-if="busy">
              <i-icon icon="line-md:loading-alt-loop" class="text-[20px]" />
            </span>
            Complete
          </button>
          <button class="brand-btn-md text-white px-4 bg-red-600 w-3/12" @click="handleClose">
            Cancel
          </button>
        </div>
      </div>
    </template>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from '@/components/modals/ModalWrapper.vue'
import VuePincodeInput from 'vue3-pincode-input'
export default {
  components: { ModalWrapper, VuePincodeInput },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    busy: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    counting: {
      type: Boolean,
      default: false
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      pincode: '',
      isCounting: false
    }
  },

  methods: {
    //   startCountdown() {
    //     this.counting = true
    //   },

    getToken() {
        this.$emit("resend")
    },

    handleClose() {
      this.$emit('close')
    },

    complete() {
      this.$emit('complete', this.pincode)
    },

    onCountdownEnd() {
      this.isCounting = false
    }
  },

  mounted() {
    // this.startCountdown()
  },

  watch: {
    visible: {
      handler(val) {
        this.dialogVisible = val
      }
    },

    counting: {
      handler(val) {
        this.isCounting = val
      },
      immediate: true
    }
  },
  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style>
.el-dialog__header {
  display: none;
}

.vue-pincode-input-wrapper {
  gap: 6px;
}
</style>
