<template>
  <div class="p-4 pb-[80px]">
    <!-- Hello World -->
    <div class="flex flex-col gap-6">
      <div>
        <h4>Referral Earnings</h4>
        <div class="flex lg:flex-row md:flex-row flex-col gap-4">
          <div class="bg-white p-4 rounded-md flex flex-col">
            <span class="text-[13px] text-gray-500"> Total Earning </span>
            <span class="font-bold text-xl">{{ record.referralBalance }}</span>
          </div>
          <div class="bg-white p-4 rounded-md flex flex-col">
            <span class="text-[13px] text-gray-500"> Current Value </span>
            <span class="font-bold text-xl">{{ '0' }}</span>
          </div>
          <div class="bg-white p-4 rounded-md flex flex-col">
            <span class="text-[13px] text-gray-500"> Total Referrals </span>
            <span class="font-bold text-xl">{{ record.referrerCount }}</span>
          </div>
        </div>
      </div>
      <img src="@/assets/img/share.svg" class="w-36 block mx-auto" alt="" />
      <h2 class="font-semibold text-lg text-center">Invite your friends</h2>
      <h6 class="text-gray-500 text-[13px] lg:w-5/12 md:w-6/12 w-full mx-auto">
        Refer your friends and earn upto <b>25 SFC</b> per referral & your friends will get
        <b>20 SFC</b>
      </h6>

      <div class="bg-white col-span-2 rounded-md p-4">
        <div>
          <div class="flex items-center bg-gray-100 p-2 rounded-[6px] border border-gray-100">
            <!-- <input
              type="text"
              class="bg-transparent w-full text-sm font-semibold"
              v-model="locat"
              disabled
              readonly
            /> -->
            <span class="bg-transparent w-full text-sm font-semibold block break all text-center">
              {{ locat }}
            </span>
          </div>
          <div class="text-center flex gap-2 justify-center items-center mt-4">
            <button
              class="brand-btn brand-primary py-[7px] rounded-[4px]"
              role="button"
              v-clipboard:copy="locat"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >
              <i-icon icon="ion:copy" />
            </button>
            <button
              class="brand-btn brand-primary py-[7px] rounded-[4px]"
              role="button"
              @click="onShare"
            >
              <i-icon icon="ri:share-fill" />
            </button>
          </div>
        </div>
        <hr class="my-2" />
        <div>
          <h4 class="font-semibold mb-3 text-xl">How to earn from StarFace referral</h4>
          <div class="flex lg:flex-row md:flex-row flex-col justify-between gap-8">
            <span
              class="text-sm lg:text-center md:text-center flex flex-col lg:items-center md:items-center"
            >
              <i-icon class="bg-primary text-white text-2xl p-[5px] rounded-full" icon="ion:gift" />
              <span> Earn <b>2SFC</b> when friend installs and sign up on the app. </span>
            </span>

            <span
              class="text-sm lg:text-center md:text-center flex flex-col lg:items-center md:items-center"
            >
              <i-icon class="bg-primary text-white text-2xl p-[5px] rounded-full" icon="ion:gift" />
              <span> Earn <b>20SFC</b> when your friend becomes a creator </span>
            </span>

            <span
              class="text-sm lg:text-center md:text-center flex flex-col lg:items-center md:items-center"
            >
              <i-icon class="bg-primary text-white text-2xl p-[5px] rounded-full" icon="ion:gift" />
              <span>
                Earn <b>10%</b> commission when your friends subscribe to any earning circle
              </span>
            </span>
            <!-- <span> Hide this tip </span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      record: {}
    }
  },

  methods: {
    getRecord() {
      this.$userActivity.allReferralRecords().then((res) => {
        console.log(res)
        this.record = res
      })
    },

    onCopy: function () {
      this.$toastify({
        text: `Referral Link Copied`,
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

    async onShare() {
      try {
        await navigator.share({
          title: `
          Refer your friends and earn upto <b>25 SFC</b> per referral & your friends will get
        <b>20 SFC</b>`,
          text: 'Share referral code',
          url: this.locat
        })
      } catch (err) {
        alert(err)
      }
    }
  },

  beforeMount() {
    this.getRecord()
  },

  computed: {
    locat() {
      // let window;
      console.log(window.location)
      return `${window.location.origin}/signup?ref=${this.user.referralCode}`
    },
    userData() {
      return this.user
    },
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style></style>
