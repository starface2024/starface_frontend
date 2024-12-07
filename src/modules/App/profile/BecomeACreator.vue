<template>
  <div class="p-6 flex flex-col justify-between pb-[80px]">
    <div class="flex flex-col gap-4">
      <div>
        <span class="text-xs font-medium text-gray-500"> Wallet Balance: </span>
        <span class="flex gap-1 items-center font-semibold">
          <i-icon icon="basil:wallet-solid" />
          {{ `${wallet}USDT` }}
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

      <div class="flex gap-3 flex-col">
        <h4 class="text-lg font-bold leading-tight">Become a creator to increase your earnings.</h4>
        <div>
          <label class="text-xs" for="">Select Plan</label>
          <div class="flex flex-col gap-2">
            <div
              v-for="(item, i) in fees"
              :key="i"
              class="p-4 border rounded-md w-full flex flex-col bg-white gap-1 justify-between"
              @click="payUpgradeFees(item)"
            >
              <div>
                <h2 class="font-bold text-center text-3xl">
                  {{ `${item.USDT}`
                  }}<span class="text-sm text-gray-400 font-medium"> USDT/{{ item.planType }}</span>
                </h2>
              </div>
              <button class="brand-btn brand-primary-clear w-full">Upgrade</button>
            </div>
          </div>
        </div>

        <div>
          <h4 class="font-semibold my-2 text-lg">Benefits</h4>
          <ul>
            <li>* Access to exclusive content</li>
            <li>* Promote content</li>
            <li>* Earn from views</li>
            <li>* Earn from Likes and other reactions</li>
            <li>* Unlimited chat credit</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wallet: '',
      plan: null,
      loading: false,
      requestId: '',
      address: '',
      fees: []
    }
  },

  methods: {
    // generateAddress() {
    //   let user_id = this.user.user_id
    //   this.$middleware.generateWalletAddress(user_id).then((res) => {
    //     this.$store.commit('auth/setWalletAddress', res.data.address)
    //   })
    // },

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

    getSubscriptions() {
      this.loading = true
      this.$wallet
        .creatorPlans()
        .then((res) => {
          console.log(res)
          this.fees = res
        })
        .finally(() => {
          this.loading = false
        })
    },

    feesRetrieved(e) {
      console.log(e)
      this.plan = e
    },

    getUser() {
      this.$auth.getUser(this.user._id).then((res) => {
        console.log(res)
        this.$store.commit('auth/setUser', res.user)
        return res
      })
    },

    payUpgradeFees(e) {
      this.loading = true
      let payload = {
        planType: e.planType
      }
      this.$wallet
        .becomeACreator(payload)
        .then((res) => {
          this.getAllWallets()
          this.getUser()
          return res
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
    this.getSubscriptions()
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
