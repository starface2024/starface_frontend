<template>
  <modal-wrapper @close="handleClose" :hasHeader="false">
    <template #body>
      <div class="tw-text-center" v-for="(item, idx) in data" :key="idx">
        <h5 class="tw-font-semibold tw-uppercase">Balance detected:</h5>
        <h1 class="tw-text-3xl tw-font-bold">{{ item.wallet_balance_formatted }}</h1>

        <div class="tw-mt-4" v-if="item.wallet_balance_raw !== 0">
          <span class="tw-block tw-font-semibold tw-mb-1 tw-text-[15px]"
            >For best security practices, transfer code is required to complete the balance
            import.</span
          >
          <div class="tw-flex tw-justify-center">
            <VuePincodeInput
              v-model="pincode"
              input-class="tw-w-12 tw-h-12 tw-text-2xl tw-font-semibold tw-rounded-lg tw-text-gray-600 tw-border-2 tw-border-gray-300"
              success-class=""
              spacing-class=""
              :digits="5"
              autofocus
            />
          </div>

          <span class="tw-mt-4 tw-block">
            <span class="tw-block">
              <span class="tw-flex tw-justify-center" v-if="isLoading">
                <i-icon icon="line-md:loading-alt-loop" class="tw-text-[20px]" />
              </span>
              <span
                v-else
                type="button"
                class=""
                :disabled="counting"
                @click="getToken"
              >
                <vue-countdown
                  v-if="counting"
                  :time="120000"
                  @end="onCountdownEnd"
                  v-slot="{ minutes, seconds, totalSeconds }"
                >
                  <span
                    class="tw-text-secondary tw-font-semibold tw-text-sm"
                    :class="{ 'tw-text-red-600': totalSeconds <= 10 }"
                  >
                    Resend transfer token in {{ '0' + minutes }}:{{
                      seconds < 10 ? `0${seconds}` : seconds
                    }}
                  </span>
                </vue-countdown>
                <span class="tw-text-secondary tw-block tw-underline tw-font-semibold tw-text-sm" role="button" v-else
                  >Request transfer code</span
                >
              </span>
            </span>
            <span class="tw-font-semibold tw-block tw-text-[12px]">
              (this will be sent to email - {{ email }})
            </span>
          </span>
        </div>

        <div class="tw-mt-6 tw-flex tw-gap-2 tw-justify-center">
          <!-- <button class="zuga-btn zuga-primary tw-px-4" >Transfer</button> -->
          <button
            @click="completeTransfer(item)"
            class="zuga-btn tw-px-4 tw-w-3/12"
            :disabled="busy || item.wallet_balance_raw === 0 || pincode.length < 5"
            :class="[
              busy
                ? 'tw-bg-gray-400 tw-text-gray-600'
                : item.wallet_balance_raw === 0
                  ? 'tw-bg-gray-400 tw-text-gray-600'
                  : pincode.length < 5
                    ? 'tw-bg-gray-400 tw-text-gray-600'
                    : 'zuga-primary'
            ]"
          >
            <span class="tw-flex tw-justify-center" v-if="busy">
              <i-icon icon="line-md:loading-alt-loop" class="tw-text-[20px]" />
            </span>
            <span v-else> Transfer </span>
          </button>
          <button
            class="zuga-btn tw-text-white tw-px-4 tw-bg-red-600 tw-w-3/12"
            @click="handleClose"
          >
            Cancel
          </button>
        </div>
      </div>
    </template>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from '../ModalWrapper.vue'
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
    email: {
      type: String,
      default: ''
    },
    network_id: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dialogVisible: false,
      pincode: '',
      isLoading: false,
      counting: false
    }
  },

  methods: {
    startCountdown() {
      this.counting = true
    },

    getToken() {
      this.isLoading = true
      this.$axios
        .get(
          `${this.nellalink}v1/user/confirm-wallet-transfer-token?network_id_imported_from=${this.network_id}&email_address=${this.email}`
        )
        .then((res) => {
          this.startCountdown()
          this.$toastify({
            text: `${res.data.message}`,
            gravity: 'top', // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            style: {
              fontSize: '13px',
              borderRadius: '4px',
              background: '#333'
            }
          }).showToast()
          this.isLoading = false
        })
        .catch((err) => {
          this.isLoading = false
          console.log(err)
        })
    },

    handleClose() {
      this.$emit('close')
    },

    completeTransfer(value) {
      let payload = {
        amount: value.wallet_balance_raw,
        pincode: this.pincode
      }
      this.$emit('completeTransfer', payload)
    },

    onCountdownEnd() {
      this.counting = false
    }
  },

  watch: {
    visible: {
      handler(val) {
        this.dialogVisible = val
      }
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
  gap: 15px;
}
</style>
