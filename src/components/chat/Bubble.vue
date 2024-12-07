<template>
  <div class="p-4 flex flex-col gap-4">
    <span
      class="p-3 text-[13px] lg:w-6/12 md:w-7/12 w-6/12 block"
      :class="[
        item.sender === this.userID
          ? 'ml-auto bg-primary text-white rounded-tr-[12px] rounded-bl-[12px] rounded-br-[12px]'
          : 'rounded-tr-[12px] rounded-tl-[12px] rounded- rounded-bl-[12px] bg-gray-200'
      ]"
      v-for="(item, idx) in messages"
      :key="idx"
    >
      <!-- {{  }} -->
      <div v-text="item.text"></div>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    allMessages: null,
  },

  data() {
    return {
      // ID: this.$route.params.id,
      messages: []
    }
  },

  methods: {
    
  },

  beforeMount() {
    // this.getConversation()
  },

  watch: {
    allMessages: {
      handler(val) {
        if(val) {
          this.messages = val
        }
      }
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
