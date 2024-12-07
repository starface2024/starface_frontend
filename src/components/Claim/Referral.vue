<template>
  <div>
    <!-- Hello World -->
    <div class="flex flex-col gap-2">
      <h2 class="font-semibold text-lg">Refer & Earn</h2>
      <h6 class="text-gray-500 text-[13px] lg:w-5/12 md:w-6/12 w-full mx-auto">
        Earn <b>20,000</b> starcoins per each referred user, refer your friends and loved ones using the link below:
      </h6>
      <div>
        <div class="flex items-center bg-gray-100 p-2 rounded-[6px] border border-gray-100">
          <span class="bg-transparent text-center w-full text-sm font-semibold block break all">
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
    </div>
  </div>
</template>

<script>
export default {
  methods: {
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
          title: `Earn 200,000 starcoins by referring your friends and loved ones using your link`,
          text: 'Share referral code',
          url: this.locat
        })
      } catch (err) {
        alert(err)
      }
    }
  },
  computed: {
    locat() {
      return `https://t.me/mangomeetbot?start=${this.user.telegram_chat_id}`
    },
    user() {
      return this.$store.getters['auth/getUserMeta']
    }
  }
}
</script>

<style></style>
