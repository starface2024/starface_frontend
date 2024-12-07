<template>
  <div class="flex flex-col h-full">
    <div class="flex flex-1 flex-col overflow-y-auto gap-3 mb-4">
      <h4 class="font-semibold">Comments</h4>
      <div>
        <div class="flex gap-2 items-center">
          <pxTextarea
            class="p-3 w-full border border-primary"
            v-model="content"
            autoResize
            rows="1"
            cols="30"
          />
          <button class="brand-primary p-3 shadow rounded-full" @click="sendComment">
            <i-icon icon="fluent:send-16-filled" class="text-lg text-white" />
          </button>
        </div>
      </div>
      <div v-if="comments.length == 0">
        <div class="flex justify-center">
          <i-icon icon="ant-design:comment-outlined" class="text-[55px]" />
        </div>
        <h4 class="font-semibold text-center">No comments yet</h4>
        <h6 class="text-xs text-center">Be the first to comment</h6>
      </div>
      <div v-for="comment in comments" :key="comment.id" class="flex gap-2">
        <img
          class="h-[30px] w-[30px] rounded-full ring ring-[#fff]"
          :src="comment.avartar"
          @error="$handleProfileError"
          alt=""
        />
        <span class="p-2 bg-gray-50 block w-full rounded-lg">
          <h6 class="text-xs font-semibold">
            <router-link :to="`/user/profile/${comment.user}`">
              {{ comment.userName }}
            </router-link>
          </h6>
          <p class="text-xs">{{ comment.comment }}</p>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: null,
    reel: Object
  },

  data() {
    return {
      user: {},
      comments: [],
      content: ''
    }
  },

  methods: {
    sendComment() {
      let payload = {
        userId: this.userID,
        comment: this.content
      }
      console.log(payload)
      this.$reels.comment(payload, this.reel._id).then((res) => {
        console.log(res)
        this.$emit('refreshReel', this.reel._id)
        this.content = ''
      })
    }
  },

  beforeMount() {
    // this.fetchUser()
  },

  watch: {
    items: {
      handler(val) {
        this.comments = val
        // this.fetchUser()
      },
      immediate: true
    }
  },

  computed: {
    userID() {
      return this.$store.getters['auth/getUserID']
    }
  }
}
</script>

<style></style>
