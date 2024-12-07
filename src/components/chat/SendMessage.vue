<template>
  <div class="bg-white p-4 shadow-sm">
    <div v-if="queryData.status == 'pending' && queryData.type == 'chat_requests'">
      <h4 class="gap-1 text-center text-[15px] justify-center">
        Accept Message Request from
        <span class="capitalize font-semibold leading-tight text-md">
          {{ `${info.firstName} ${info.lastName}` }}
        </span>
        <span class="capitalize text-gray-500 text-[14px]">{{ `(@${info.userName})?` }}</span>
      </h4>
      <div class="flex justify-center gap-3 mt-2">
        <button @click="updateStatus('rejected')" class="bg-gray-200 px-4 font-semibold text-red-600 rounded-md py-2 text-[16px]">
          Delete
        </button>
        <button @click="updateStatus('accepted')" class="bg-gray-200 px-4 font-semibold text-green-600 rounded-md py-2 text-[16px]">
          Accept
        </button>
      </div>
    </div>

    <div v-if="queryData.status == 'pending' && queryData.type == 'sent_requests'">
      <h4 class="gap-1 text-center text-sm justify-center">
        Awaiting Request response from
        <span class="capitalize font-semibold leading-tight text-md">
          {{ `${info.firstName} ${info.lastName}` }}
        </span>
        <span class="capitalize text-gray-500 text-xs">{{ `(@${info.userName})?` }}</span>
      </h4>
    </div>

    <div class="flex gap-2 items-center" v-if="!queryData.status">
      <pxTextarea
        class="p-3 w-full border border-primary"
        v-model="content"
        autoResize
        rows="1"
        cols="30"
      />
      <button class="brand-primary p-3 shadow rounded-full" @click="sendMessage">
        <i-icon icon="fluent:send-16-filled" class="text-lg text-white" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isRefreshing: Boolean
  },
  data() {
    return {
      content: '',
      respondentID: this.$route.query.uid,
      chatID: this.$route.params.id,
      info: ''
    }
  },

  methods: {
    sendMessage() {
      let payload = {
        conversationId: this.chatID,
        sender: this.userID,
        receiver: this.respondentID,
        text: this.content
      }
      this.$chat.send(payload).then((res) => {
        console.log(res)
        this.content = ''
        this.$emit('refresh')
      })
    },

    getUser() {
      this.$auth.getUser(this.respondentID).then((res) => {
        console.log(res)
        this.info = res.user
      })
    },

    updateStatus(status) {
      let payload = {
        status: status
      }
      console.log(payload)
      this.$chat.updateStatus(payload, this.chatID).then(() => {
        if(status == 'rejected') {
          this.$router.go(-1)
          return 
        }
        this.$router.replace({
          query: {
            ...this.$route.query, // Keep existing query params
            status: undefined, // Set the parameter you want to remove to undefined
            type: undefined
          }
        })
      })
    }
  },

  mounted() {
    this.getUser()
  },

  computed: {
    userID() {
      return this.$store.getters['auth/getUserID']
    },
    queryData() {
      return this.$route.query
    }
  }
}
</script>

<style></style>
