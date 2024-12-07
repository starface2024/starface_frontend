<template>
  <div>
    <div class="user-info flex gap-2 items-center">
      <img
        class="h-[35px] w-[35px] rounded-full object-cover object-top ring ring-[#fff]"
        :src="item.avartar || $avatar"
        @error="$handleProfileError"
        alt=""
      />
      <span class="text-sm">
        <router-link :to="`/user/profile/${item.user}`">
          {{ `@${item.userName}` }}
        </router-link>
      </span>
      <button class="brand-btn-md brand-outline text-white" @click="followAction(item)">
        {{ checkFollowing(item) ? 'Unfollow' : 'Follow' }}
      </button>
    </div>
    <p class="mt-2 text-sm">{{ item.description }}</p>
  </div>
</template>

<script>
export default {
  props: {
    reelData: {}
  },
  data() {
    return {
      item: {}
    }
  },

  methods: {
    checkFollowing(e) {
      if (!this.isLoggedIn) {
        return
      }
      let following = this.user.following
      let isFollowing = following.find((item) => item == e.user)
      return isFollowing
    },

    getUser() {
      this.$auth.getUser(this.user._id).then((res) => {
        this.$store.commit('auth/setUser', res.user)
        return res
      })
    },

    followAction(e) {
      let payload = {
        targetUserId: e.user, //like, unlike, favorite, unfavorite, follow, unfollow
        action: this.checkFollowing(e) ? 'unfollow' : 'follow'
      }
      this.$userActivity.toggleUserActions(payload).then(() => {
        this.getUser()
      })
    }
  },

  watch: {
    reelData: {
      handler(val) {
        this.item = val
      },
      immediate: true
    }
  },

  mounted() {
    // this.getUser()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },
    isLoggedIn() {
      return this.$store.getters['auth/getAuthenticated']
    }
  }
}
</script>

<style></style>
