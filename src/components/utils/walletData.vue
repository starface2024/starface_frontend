<template>
  <div class="wallet-data w-fit">
    <!-- {{user}} -->
    <span class="flex gap-3 items-center font-medium p-1 rounded-md">
      <router-link to="/wallet" class="flex items-center">
        <img src="@/assets/img/icons/blue-starface.webp" class="w-8" alt="" />
        <span class="text-[14px] text-white font-medium">{{ !isLoggedIn ? 0 : user.demo ? balance.demoStarBalance : balance.balance }}</span>
      </router-link>

      <router-link to="/wallet" class="flex items-center">
        <img src="@/assets/img/icons/yellow-starface.webp" class="w-8" />
        <span class="text-[14px] text-white font-medium" v-if="user">{{
          $convertToDollar(user.demo ? balance.demoStarBalance : balance.balance)
         }}</span>
      </router-link>

      <!-- <router-link to="/wallet" class="flex items-center gap-1">
        <span class="text-white">DEMO:</span>
        <span class="text-[14px] text-white font-medium">{{ balance.demoStarBalance || 0 }}</span>
      </router-link> -->
    </span>
  </div>
</template>

<script>
export default {
  props: {
    starBalance: Object
  },
  data() {
    return {
      balance: {}
    }
  },

  watch: {
    starBalance: {
      handler(val) {
        this.balance = val
      },
      immediate: true
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },

    isLoggedIn() {
      return this.$store.getters['auth/getAuthenticated']
    },
  }
}
</script>

<style>
</style>
