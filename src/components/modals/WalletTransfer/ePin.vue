<template>
    <modal-wrapper @close="handleClose" :hasHeader="false">
      <template #body>
        <div class="tw-text-center" >
          <h5 class="tw-font-semibold tw-uppercase">EPIN Retrieved:</h5>
          <div>
            {{ data }}
          </div>
          <h1 class="tw-text-3xl tw-font-bold">{{ data.epin_assigned }}</h1>
          <!-- <div class="tw-mt-4">
            <span class="tw-block tw-font-semibold tw-mb-1 tw-text-[15px]">Enter Transfer Code</span>
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
          </div> -->
          <div class="tw-mt-6 tw-flex tw-gap-2 tw-justify-center">
            <!-- <button class="zuga-btn zuga-primary tw-px-4" >Transfer</button> -->
            <button
              @click="complete('import')"
              class="zuga-btn tw-px-4 tw-w-3/12"
              :disabled="busy"
              :class="[busy ? 'tw-bg-gray-400 tw-text-gray-600' : 'zuga-primary']"
            >
              <span class="tw-flex tw-justify-center" v-if="busy">
                <i-icon icon="line-md:loading-alt-loop" class="tw-text-[20px]" />
              </span>
              <span v-else> Import </span>
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
  export default {
    components: { ModalWrapper },
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
        type: Object,
        default: () => {}
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
        isLoading: false
      }
    },
  
    methods: {
     
      handleClose() {
        this.$emit('close')
      },
  
      complete(value) {
        this.$emit('complete', value)
      }
    },
  
    watch: {
      visible: {
        handler(val) {
          this.dialogVisible = val
        }
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
  