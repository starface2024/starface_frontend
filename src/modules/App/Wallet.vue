<template>
  <div class="pb-[80px]">
    <div>
      <!-- <div>
        {{ user }}
      </div> -->
      <el-skeleton style="width: 100%" :loading="loading" animated>
        <template #template>
          <div>
            <div class="flex flex-col mb-4">
              <el-skeleton-item
                variant="text"
                style="height: 10px; border-radius: 10px; width: 30px"
              />
              <el-skeleton-item
                variant="text"
                style="height: 30px; border-radius: 10px; width: 100px"
              />

              <el-skeleton-item
                variant="text"
                style="height: 10px; border-radius: 10px; width: 30px"
              />
            </div>

            <div class="flex gap-3">
              <div v-for="item in 3" :key="item" class="w-full">
                <el-skeleton-item
                  variant="image"
                  style="height: 120px; border-radius: 10px; width: 100%"
                />
              </div>
            </div>
          </div>
        </template>
        <template #default>
          <div>
            <user-wallet @actionClick="actionClick" :walletData="walletData" />
          </div>
        </template>
      </el-skeleton>
    </div>
    
    <txn-history />

    <vDialog
      v-model:visible="showContainer"
      modal
      :style="{ width: '80%' }"
      @hide="closeContainer"
      @after-hide="closeContainer"
      :showHeader="false"
      unstyled
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(4px)'
        }
      }"
    >
      <div class="bg-white p-6 shadow rounded-lg">
        <span role="button" @click="closeContainer">
          <i-icon icon="ic:baseline-arrow-back" class="text-2xl font-semibold" />
        </span>
        <fund v-if="action == 'fund_wallet'" />
        <withdraw v-if="action == 'withdraw'" @refresh="refreshData" :walletData="walletData" />
        <transfer v-if="action == 'purchase'" @refresh="refreshData" :walletData="walletData"/>
        <convert v-if="action == 'convert'" @refresh="refreshData" :walletData="walletData" />
      </div>
    </vDialog>
  </div>
</template>

<script>
import UserWallet from '@/components/utils/UserWallet.vue'
import TxnHistory from '@/components/Upgrade/TxnHistory.vue'
import Fund from '@/components/wallet/Fund.vue'
import Withdraw from '@/components/wallet/Withdraw.vue'
import Transfer from '@/components/wallet/Transfer.vue'
import Convert from '@/components/wallet/Convert.vue'
export default {
  components: { UserWallet, TxnHistory, Fund, Withdraw, Transfer, Convert },
  data() {
    return {
      showContainer: false,
      action: '',
      walletData: {},
      loading: false
    }
  },

  methods: {
    actionClick(e) {
      this.showContainer = true
      this.action = e.label
    },

    refreshData(){
     this.closeContainer()
     this.getWalletData() 
    },

    closeContainer() {
      this.showContainer = false
    },

    getEarnWallet() {
      this.$wallet.earnWallet().then((res) => {
        console.log(res)
        this.walletData = {
          starBalance: this.user.demo ? res.star.demoStarBalance : res.star.balance,
          otherBalances: {
            ...this.walletData.otherBalances,
            gift_balance: res.flower.balance,
            chat_credit: res.chat.balance
          }
        }
      })
    },

    getAllWallets() {
      this.$wallet.allWallets().then((res) => {
        console.log(res)
        this.walletData = {
          ...this.walletData,
          otherBalances: {
            ...this.walletData.otherBalances,
            USDT: res[1].balance,
            SFC: res[0].balance
          }
        }
      })
    },

    getWalletData() {
      const request1 = this.getEarnWallet()
      const request2 = this.getAllWallets()
      Promise.all([request1, request2]).finally(() => {
        this.loading = false
      })
    }
  },

  created() {
    this.getWalletData()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },
  }
}
</script>

<style></style>
