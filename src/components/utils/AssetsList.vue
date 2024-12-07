<template>
  <div class="">
    <h3 class="text-xl font-semibold mb-2">My Wallets</h3>
    <el-skeleton style="width: 100%" :loading="loading" animated>
      <template #template>
        <div style="margin-top: 14px" class="flex flex-col gap-2">
          <div v-for="i in 6" :key="i">
            <el-skeleton-item variant="text" style="width: 100%; height: 50px" />
          </div>
        </div>
      </template>
      <template #default>
        <div class="flex flex-col gap-4">
          <div
            class="flex rounded-lg justify-between p-3 border border-gray-300 bg-white"
            v-for="(item, idx) in allWallets"
            :key="idx"
          >
            <div>
              <span class="flex items-center gap-2">
                <img :src="images[`${item.currency.toLowerCase()}`]" :alt="item.currency" class="w-6 h-6"/>
                <span class="font-semibold"> {{ item.currency }} </span>
              </span>
              <!-- <h6></h6> -->
            </div>
            <div>
              <h1 class="font-semibold text-2xl">
                {{ item.balance }} <span class="text-xs text-gray-500">{{ item.currency }}</span>
              </h1>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { filename } from 'pathe/utils'
export default {
  data() {
    return {
      images: [],
      loading: false
    }
  },

  methods: {
    listIcons(){
      const glob = import.meta.glob('@/assets/img/*.png', { eager: true })
      const data = Object.fromEntries(
        Object.entries(glob).map(([key, value]) => [filename(key), value.default])
      )
      console.log(glob);
      console.log(data);
      this.images = data
    }
    // async list(){
    //   try {
    //     let res = await this.$request.get(`trans/getdetails`)
    //     console.log(res);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // getIcon(val) {
      // const usdt = import.meta.glob('@/assets/img/usdt_icon.png')
      // const bnb = import.meta.glob('@/assets/img/bnb_icon.png')
      // if (val == 'BNB') {
      //   console.log(bnb.name, 'bnb')
      //   const images = Object.entries(bnb).map(([key, value]) => [filename(key), value.default])
      //   console.log(images, 'helllo')
      //   return bnb.name
      // } else {
      //   return usdt.name
      // }

      // const assetNames = ['bnb', 'usdt', 'tusd']
      // const selectedDog = ref('');
    // }
  },

  beforeMount() {
    // this.list()

    this.listIcons()
  },

  computed: {
    wallets() {
      return this.$store.getters['auth/getWallet']
    },

    

    allWallets() {
      let data = [
        {
          currency: 'USDT',
          balance: this.wallets.USDTTradingBalance
          // icon: usdt
        },
        {
          currency: 'BNB',
          balance: this.wallets.BNBTradingBalance
          // icon: bnb
        },
        {
          currency: 'TUSD',
          balance: this.wallets.TUSDTradingBalance
          // icon: usdt
        }
      ]
      return data
    },

    wallet() {
      let data = this.wallets
      const keys1 = Object.keys(data)
      let val = keys1.filter((char) => char.includes('TradingBalance'))
      var lettersToRemove = 'TradingBalance'
      // Convert lettersToRemove to a set for faster lookup
      const lettersSet = new Set(lettersToRemove)
      // Map over each item in the array and remove unwanted letters from each item
      const newArray = val.map((item) => {
        // Split the item into an array of characters, filter out unwanted letters, and join the remaining characters back into a string
        return item
          .split('')
          .filter((char) => !lettersSet.has(char))
          .join('')
      })

      return newArray
    },

    currencies() {
      let data = this.wallets
      const keys1 = Object.keys(data)
      let val = keys1.filter((char) => char.includes('TradingCurrency'))
      var lettersToRemove = 'TradingCurrency'
      // Convert lettersToRemove to a set for faster lookup
      const lettersSet = new Set(lettersToRemove)
      // Map over each item in the array and remove unwanted letters from each item
      const newArray = val.map((item) => {
        // Split the item into an array of characters, filter out unwanted letters, and join the remaining characters back into a string
        return item
          .split('')
          .filter((char) => !lettersSet.has(char))
          .join('')
      })

      return newArray
    }
  }
}
</script>

<style></style>
