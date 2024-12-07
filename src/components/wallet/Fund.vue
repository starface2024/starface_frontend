<template>
  <div class="">
    <div>
      <div class="text-center">
        <h3 class="font-bold uppercase">Fund Account with USDT</h3>
        <p class="text-center text-sm mt-4">
          Copy your <b>USDT (BEP20)</b> wallet address or scan the QRCode below.
        </p>
      </div>

      <div class="flex justify-center mt-4">
        <el-skeleton style="width: 100%" :loading="loading" animated>
          <template #template>
              <div class="flex flex-col items-center">
                <el-skeleton-item
                  variant="image"
                  style="height: 180px; border-radius: 10px; width: 180px"
                />
                <el-skeleton-item
                  variant="text"
                  style="height: 50px; margin-top:10px; border-radius: 10px; width: 100%"
                />
            </div>
          </template>
          <template #default>
            <div>
              <div class="flex justify-center w-fit p-3 bg-gray-100 mx-auto rounded-lg">
                <QRCodeVue :value="wallet_address" :size="150" />
              </div>
              <div class="flex items-center px-3 py-2 gap-2 bg-gray-100 rounded-lg mt-2 w-fit">
                <span class="wallet-address-input break-all w-full font-semibold text-center block tracking-tight leading-tight">{{ wallet_address }}</span>
              </div>
              <div class="text-center mt-2">
                <button
                  class="brand-btn-md brand-primary"
                  role="button"
                  v-clipboard:copy="wallet_address"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
                  copy
                </button>
              </div>
            </div>
          </template>
        </el-skeleton>
      </div>
      <!-- <div class="mt-3 text-center flex items-center gap-3">
        <button class="outline-btn" @click="$router.go(-1)">Go Back</button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: {
        light: '#ffffff'
      },
      currencies: ['USDT', 'RAAF'],
      loading: false,
      wallet_address: 0
    }
  },

  methods: {
    onCopy: function (value) {
      console.log(value)
      this.$toastify({
        text: `Wallet address copied`,
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
    },

    generateWalletAddress() {
        this.loading = true
      let formData = {
        asset: 'USDT'
      }
      this.$wallet.deposit(formData).then((res) => {
        console.log(res)
        this.wallet_address = res.Addres
      })
      .finally(()=> {
        this.loading = false
      })
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },
   
  },

  beforeMount() {
    this.generateWalletAddress();
  }
}
</script>

<style></style>
