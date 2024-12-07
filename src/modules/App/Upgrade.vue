<template>
  <div class="p-6 flex flex-col justify-between pb-[80px]">
    <div class="flex flex-col gap-4">
      <div>
        <span class="text-xs font-medium text-gray-500">
          Wallet Balance:
        </span> 
        <span class="flex gap-1 items-center font-semibold">
          <i-icon icon="basil:wallet-solid" />
          {{`${wallet}USDT`}}
        </span>
      </div>
      <span class="text-sm font-semibold">Fund your balance below with USDT</span>
      <div class="flex items-center p-2 bg-white rounded-[6px] gap-3">
        <span class="bg-transparent w-full text-sm font-semibold block break-all">
          {{ address }}
        </span>
        <span
          class="brand-primary-clear p-[5px] rounded-md"
          role="button"
          v-clipboard:copy="address"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >
          <i-icon icon="ion:copy" />
        </span>
      </div>

      <div>
        <button class="brand-btn w-full brand-primary-clear"><router-link to="/become-a-creator">Earn as a creator</router-link></button>
      </div>

      <div class="flex gap-3 flex-col">
        <div>
          <h4 class="text-sm font-medium">Subscribe to any of the plans below to start earning daily from watching videos.</h4>
          <hr class="my-2">
          <h6 class="text-xs text-gray-600">Each earning cycle may take 3 to 4 weeks to complete.</h6>
        </div>
        <div>
          <label class="text-xs" for="">Select Plan</label>
          <UpgradeFees @refreshBalance="getAllWallets" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UpgradeFees from '@/components/Upgrade/UpgradeFees.vue'
// import UserWallet from '@/components/utils/UserWallet.vue'
export default {
  components: { UpgradeFees },
  data() {
    return {
      wallet: '',
      plan: null,
      loading: false,
      requestId: '',
      address: ""
    }
  },

  methods: {
    generateAddress() {
      this.loading = true
      let formData = {
        asset: 'USDT'
      }
      this.$wallet
        .deposit(formData)
        .then((res) => {
          console.log(res)
          this.address = res.Addres
        })
        .finally(() => {
          this.loading = false
        })
    },

    getAllWallets() {
      this.$wallet.allWallets().then((res) => {
        console.log(res)
        this.wallet = res[0].balance
      })
    },

    onCopy: function () {
      this.$toastify({
        text: `Wallet Address Copied`,
        gravity: 'top', // `top` or `bottom`
        position: 'center', // `left`, `center` or `right`
        style: {
          fontSize: '13px',
          borderRadius: '4px',
          background: '#333'
        }
      }).showToast()
    },

    onError: function () {
      alert('Failed to copy texts')
    }
  },

  beforeMount() {
    let hasAddress = !!this.address
    if (!hasAddress) {
      this.generateAddress()
    }
    this.getAllWallets()
  },

  mounted() {
    var result = Math.round(+new Date() / 1000)
    this.requestId = `${result}`
  },

  computed: {
    // address() {
    //   return this.$store.getters['auth/getWalletAddress']
    // },
    user() {
      return this.$store.getters['auth/getUser']
    },
    hasCompleteData() {
      return this.plan && this.wallet ? true : false
    }
  }
}
</script>

<style>
.claim-header {
  background: var(---secondary-color);
  background-image: url('https://preview.redd.it/some-random-pretty-lady-v0-gjoftzwojaqb1.png?width=640&crop=smart&auto=webp&s=2ed92df2c30baee7c8dc899c19fd8d9a22f56b96');
  background-blend-mode: overlay;
  background-size: cover;
  background-position: center;
}
</style>
