<template>
  <div class="py-2 px-4 bg-white z-10 rounded-bl-3xl rounded-br-3xl">
    <div class="flex justify-between items-center">
      <!-- <span v-if="routeName === 'home'" class="brand-icon block text-2xl">

      </span> -->
      <div class="flex gap-2 items-center justify-between">
        <span
          @click="$router.go(-1)"
          role="button"
          class="bg-gray-200 border border-gray-300 p-[8px] rounded-full"
        >
          <i-icon icon="charm:arrow-left" class="text-lg" />
        </span>
        <div class="flex justify-center w-full">
          <h3 class="font-semibold text-lg capitalize">{{ routeName.split('-').join(' ') }}</h3>
        </div>
      </div>
      <div class="flex gap-2 items-center">
        <!-- {{user}} -->
        <img
          v-if="user"
          :src="user.profilePicture ? user.profilePicture : image"
          class="w-[45px] h-[45px] border-2 p-[2px] border-gray-300 rounded-full object-fit object-top"
          role="button"
          @click="$router.push('/profile')"
          @error="$handleProfileError"
        />
        <!-- <div>
          <span class="text-sm capitalize font-semibold block">Vendor</span>
          <span class="text-xs block text-gray-400">{{
            `${user.first_name} ${user.last_name}`
          }}</span>
        </div> -->
        <!-- <button
          v-if="routeName === 'home'"
          class="brand-btn brand-primary rounded-full flex items-center gap-2 justify-center"
          @click="$router.push('/upgrade')"
        >
          <i-icon icon="icomoon-free:fire" />
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import image from '@/assets/img/no-user.png'
export default {
  data() {
    return {
      image
    }
  },

  watch: {
    // user_id: {
    //   handler(oldVal, newVal) {
    //     if (oldVal !== newVal) {
    //       this.getUser()
    //     }
    //   }
    // }
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },
    userMeta() {
      return this.$store.getters['auth/getUserMeta']
    },
    routeName() {
      return this.$route.meta.name
    }
  }
}
</script>

<style></style>
