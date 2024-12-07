<template>
  <div class="auth-intro px-12 py-44 flex flex-col justify-between bg-no-repeat bg-center bg-cover">
    <div class="text-center flex-1 flex flex-col justify-center">
      <img src="@/assets/img/icons/coin_claim.webp" class="w-12 mx-auto" alt="" />
      <h3 class="text-white font-bold text-3xl">STAR FACE</h3>
      <h6 class="text-white text-sm">
        Join us with other millions of people and find your best matches
      </h6>
    </div>

    <span class="flex">
      <button class="brand-btn brand-primary-clear w-full">
        <router-link :to="`/auth/login?redirect=${redirectFrom}`" class="text-white"> Sign In with Email </router-link>
      </button>
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    redirectFrom() {
      return this.$route.query.redirect
    }
  }
}
</script>

<style>
.auth-intro {
  background: url('@/assets/img/authbg.png');
  background-color: rgba(0, 0, 0, 0.3);
  background-blend-mode: overlay;
  height: 100vh;
}
</style>
