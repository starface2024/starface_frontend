<template>
  <div class="h-[85vh] flex flex-col justify-between">
    <div class="flex flex-col gap-2">
      <div class="text-center">
        <h1 class="font-extrabold text-4xl flex justify-center gap-[4px] items-center">
          <span>
            <i-icon icon="fluent-emoji-flat:coin" />
          </span>
          {{ isLoading ? 0 : formatAmount(balance.wallet_balance_raw) }}
        </h1>
        <h4 class="text-[14px] font-semibold text-gray-500">Starcoins Earned</h4>
      </div>
      <div
        class="border-[12px] rounded-full mx-auto mt-4 flex flex-col items-center justify-center border border-primary w-[150px] h-[150px]"
      >
        <span class="font-bold text-xl h-full flex flex-col items-center justify-center"
          >5,000</span
        >
        <!-- <span
          :disabled="loading"
          :class="[loading ? 'bg-gray-400' : 'brand-primary']"
           @click="claimStarcoins('daily_coins_claim')"
          class="h-32 flex flex-col items-center justify-center text-white font-semibold text-2xl w-full rounded-bl-full rounded-br-full"
        >
          Claim
        </span> -->
      </div>
      <button
        class="brand-btn mx-auto flex items-center py-[12px] w-fit gap-2 justify-center"
        @click="claimStarcoins('daily_coins_claim')"
        :disabled="loading"
        :class="[loading ? 'bg-gray-400' : 'brand-primary']"
      >
        <i-icon icon="icomoon-free:fire" />
        Claim
      </button>

      <!-- <div class="claim-header p-6 rounded-[8px] flex justify-between items-end text-white mt-12">
        <div>
          <h4 class="text-xs text-gray-200">Starcoins Claimed</h4>
          <h1 class="font-bold text-2xl">{{ balance.wallet_balance_raw }}</h1>
        </div>
      </div> -->
      <div class="w-full mt-3 mb-6">
        <h4 class="font-semibold mb-2">Task to Earn More Starcoins</h4>
        <span class="flex border border-gray-400 p-[3px] rounded-sm mb-3 w-full">
          <span
            class="block px-3 py-2 text-[12px] capitalize font-medium rounded-sm w-full text-center text-gray-400"
            role="button"
            @click="activateTab(i)"
            :class="{ 'brand-primary text-white font-semibold shadow': i === activeTab }"
            v-for="(item, i) in tabs"
            :key="i"
          >
            {{ item.label }}
          </span>
        </span>
        <div class="bg-white p-6">
          <component :is="tabs[activeTab].component" @claimReward="claimStarcoins" :isType="isType"/>
        </div>
      </div>
    </div>
    <!-- <div class="flex gap-4 justify-center mt-3">
      <button class="brand-btn brand-primary w-full" @click="$router.push('/')">
        Meet & Connect
      </button>
      <button class="brand-btn bg-secondary text-white w-full" @click="$router.push('/claim')">
        Claim Starcoins
      </button>
    </div> -->
  </div>
</template>

<script>
import Social from '@/components/Claim/Social.vue'
import Referral from '@/components/Claim/Referral.vue'
import { markRaw } from 'vue'
export default {
  data() {
    return {
      balance: {},
      loading: false,
      isLoading: false,
      tabs: [
        {
          label: 'Refer & Earn',
          component: markRaw(Referral)
        },

        {
          label: 'Follow & Earn',
          component: markRaw(Social)
        }
      ],
      activeTab: 0,
      isType: ''
    }
  },

  methods: {
    getWallets() {
      this.isLoading = true
      let payload = {
        wallet_id: 'starcoins',
        formatted: 'yes',
        user_id: this.user.user_id
      }
      this.$appDomain
        .getWallets(payload)
        .then((res) => {
          console.log(res)
          this.balance = res.data[0]
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    activateTab(e) {
      this.activeTab = e
    },

    formatAmount(value) {
      return value.toLocaleString()
    },

    claimStarcoins(e) {
      this.loading = true
      let payload = {
        action_type: e,
        user_id: this.user.user_id
      }
      this.isType = e
      this.$appDomain
        .claim(payload)
        .then((res) => {
          console.log(res)
          this.getWallets()
        })
        .finally(() => {
          this.loading = false
          this.isType = ""
        })
    }
  },

  beforeMount() {
    this.getWallets()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style>
.claim-header {
  background: var(---secondary-color);
}
</style>
