<template>
  <div class="h-[100dvh] flex flex-col overflow-y-hidden">
    <chat-header :wallet="walletData" />
    <div
      class="flex-1 overflow-y-auto h-full"
      ref="messagesContainer"
      role="log"
      aria-live="polite"
      aria-atomic="true"
    >
      <user-profile />
      <bubble :allMessages="messages" />
    </div>
    <send-message @refresh="refresh" />
  </div>
</template>

<script>
import chatHeader from '@/components/chat/Header.vue'
import Bubble from '@/components/chat/Bubble.vue'
import SendMessage from '@/components/chat/SendMessage.vue'
import UserProfile from '@/components/chat/UserProfile.vue'

export default {
  components: { chatHeader, Bubble, SendMessage, UserProfile },
  data() {
    return {
      isRefreshing: false,
      ID: this.$route.params.id,
      messages: [],
      walletData: null
    }
  },
  methods: {
    async getConversation() {
      try {
        const res = await this.$chat.conversation(this.ID)
        this.messages = res
        this.$nextTick(this.scrollToEnd)
      } catch (err) {
        console.error('Failed to fetch conversation:', err)
      }
    },

    scrollToEnd() {
      const container = this.$refs.messagesContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },

    refresh() {
      this.getConversation()
      this.getEarnWallet()
    },

    getEarnWallet() {
      this.$wallet.earnWallet().then((res) => {
        console.log(res)
        this.walletData = res
      })
    }
  },
  mounted() {
    this.getConversation()
    this.getEarnWallet()
    this.intervalId = setInterval(this.getConversation, 10000)
  },
  beforeUnmount() {
    clearInterval(this.intervalId)
  }
}
</script>

<style></style>
