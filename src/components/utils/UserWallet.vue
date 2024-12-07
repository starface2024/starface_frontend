<template>
  <div class="p-4">
    <div>
      <div
        class="flex lg:flex-row md:flex-row flex-col justify-between lg:items-end md:items-end gap-4"
      >
        <div>
          <div class="flex justify-between items-start">
            <div class="flex flex-col mb-4">
              <span class="text-xs block text-primary leading-tightest font-semibold">
                Star Balance</span
              >
              <span class="font-bold text-4xl leading-tightest">{{ walletData.starBalance }}</span>
              <span class="text-sm text-gray-500 block leading-tightest font-semibold">{{
                $convertToDollar(walletData.starBalance)
              }}</span>
            </div>

            <button
              v-if="user.demo"
              class="brand-btn bg-red-600 text-white wiggle text-xs py-[8px] rounded-full flex items-center gap-1 justify-center"
              @click="$router.push('/upgrade')"
            >
              <i-icon icon="icomoon-free:fire" class="text-lg" />
              upgrade
            </button>
          </div>

          <div class="flex flex-col gap-3 w-full">
            <div
              class="bg-secondary w-full p-3 rounded-md flex flex-col"
              v-for="(value, name) in walletData.otherBalances"
              :key="name"
            >
              <span class="text-[12px] text-gray-400 font-medium capitalize">{{
                name.split('_').join(' ')
              }}</span>
              <span class="font-bold text-xl text-white">{{ value }}</span>
            </div>
          </div>
        </div>
        <div class="flex lg:w-fit md:w-fit w-full gap-2">
          <button
            role="button"
            :class="[
              'border w-full whitespace-nowrap bg-gray-100 flex flex-col items-center gap-1 rounded-[5px] px-1 py-[5px] text-[11px] capitalize font-sembold'
            ]"
            v-for="item in actions"
            :disabled="isDemoAccount(item)"
            :key="item.label"
            @click="openSendFunds(item)"
          >
            <i-icon
              :icon="item.icon"
              :class="[
                ' block rounded-full text-xl p-[2px]',
                isDemoAccount(item) ? 'text-gray-600 bg-gray-400' : ' bg-primary text-white'
              ]"
            />
            <span :class="['text-[9px]', isDemoAccount(item) ? 'text-gray-400' : '']">{{
              item.label.split('_').join(' ')
            }}</span>
          </button>
        </div>
        <div v-if="user.demo">
          <span class="text-red-500 block text-[11px] font-medium"
            >*Please, upgrade account to activate withdrawal</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import WalletData from './walletData.vue';

export default {
  props: {
    hasActions: Boolean,
    walletData: {
      type: Object,
      default: () => ({}) // Prevents errors if walletData is undefined or null
    }
  },

  data() {
    return {
      showAmount: null,
      balances: [],
      selected: null,
      actions: [
        { label: 'fund_wallet', icon: 'mingcute:send-fill' },
        { label: 'withdraw', icon: 'flowbite:download-solid' },
        { label: 'convert', icon: 'simple-icons:convertio' },
        { label: 'purchase', icon: 'mingcute:transfer-line' }
      ],
      localLoading: true
    }
  },
  methods: {
    openSendFunds(item) {
      this.$emit('actionClick', item)
    },

    isDemoAccount(item) {
      let isDemo = this.user.demo && item.label == 'withdraw'
      return isDemo
    },

    hideBalance(value) {
      let number_of_times = `${value.wallet_balance_raw} ${value.wallet_symbol}`
      let req = []
      for (let i = 0; i < number_of_times; i++) {
        req.push('*')
      }
      let completed = req.join('')
      return completed
    }
  },

  beforeMount() {
    // this.getWallets()
    // this.triggerDeposit()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style scoped></style>
