<template>
  <div class="bg-white px-4 h-[65px] flex items-center justify-between shadow-sm">
    <div class="flex gap-2 items-center">
      <span role="button" @click="$router.go(-1)">
        <i-icon icon="ic:baseline-arrow-back" class="text-2xl font-semibold" />
      </span>
      <div class="flex gap-2 items-center">
        <span class="relative">
          <img
            class="h-[42px] w-[42px] rounded-full"
            :src="info.profilePicture || $avatar"
            @error="$handleProfileError"
            alt=""
          />
          <span
            class="absolute top-0 right-0 ring ring-white block h-2 w-2 bg-green-600 rounded-full"
          ></span>
        </span>
        <h4 class="capitalize text-lg font-semibold">{{ info.userName }}</h4>
      </div>
    </div>

    <span class="flex gap-1">
      <img src="@/assets/img/icons/yellow-starface.webp" class="w-8" />
      <span class="font-semibold text-lg block" v-if="walletData.chat">{{
        walletData.chat.balance
      }}</span>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    wallet: null
  },

  data() {
    return {
      userID: this.$route.query.uid,
      info: {},
      walletData: {}
    }
  },

  methods: {
    getUser() {
      this.$auth.getUser(this.userID).then((res) => {
        this.info = res.user
      })
    },
  },

  watch: {
    wallet: {
      handler(val) {
        if (val) {
          this.walletData = val
        }
      },
      immediate: true
    }
  },

  beforeMount() {
    this.getUser()
    // this.getEarnWallet()
  }
}
</script>

<style></style>
