<template>
  <div class="p-4 pb-[80px]">
    <div class="flex flex-col gap-4">
      <vSelect
        :options="items"
        :reduce="(opt) => opt._id"
        @search="fetchOptions"
        label="userName"
        @option:selected="setSelected"
        placeholder="Search Users and start a conversation"
      >
        <template #open-indicator="{ attributes }">
          <span v-bind="attributes"
            ><i-icon icon="radix-icons:caret-down" color="#4F4F4F" width="20px"
          /></span>
        </template>
      </vSelect>

      <!-- <div>
        <h4 class="font-semibold">
          Message Requests
          <span class="text-xs font-semibold text-primary">{{
            `(${messageRequests.length})`
          }}</span>
        </h4>
        <div class="flex gap-3 overflow-x-scroll mt-3">
          <div v-if="messageRequests.length == 0" class="flex flex-col w-full gap-1 items-center">
            <i-icon icon="lucide:messages-square" class="text-4xl" />
            <span class="text-xl font-semibold">No Pending Message Requests!</span>
          </div>
          <div
            v-for="item in messageRequests"
            :key="item"
            class="flex flex-col items-center w-full"
          >
            <span
              @click="item.sender.senderId !== userID ? updateStatus(item) : ''"
              role="button"
              class="w-fit relative flex items-center flex-col gap-1"
            >
              <img
                class="h-[42px] w-[42px] rounded-full"
                :src="item.user.profilePicture || $avatar"
                @error="$handleProfileError"
                alt=""
              />
              <span class="text-[10px] block leading-tight text-gray-500 capitalize text-center">{{
                item.user.userName || 'Starface User'
              }}</span>
            </span>
          </div>
        </div>
      </div> -->
    </div>
    <div class="mt-4">
      <div class="flex gap-3 mb-4">
        <span
          :class="[
            'capitalize py-[5px] px-[10px] whitespace-nowrap rounded-[4px] text-[13px] block relative flex items-center gap-1',
            activeTab == item ? 'bg-primary text-white' : 'bg-gray-200'
          ]"
          role="button"
          @click="activateTab(item)"
          v-for="item in ['messages', 'chat_requests', 'sent_requests']"
          :key="item"
          >{{ item.split('_').join(' ') }}
          <span
            v-if="item == 'chat_requests' || item == 'sent_requests'"
            class="bg-black text-white font-semibold flex text-[10px] items-center justify-center h-4 w-4 rounded-full"
            >{{
              item == 'chat_requests' ? `${messageRequests.length}` : `${sentRequests.length}`
            }}</span
          >
        </span>
      </div>
      <h4 class="font-semibold capitalize">{{ activeTab.split('_').join(' ') }}</h4>
      <div class="flex flex-col gap-4 mt-2">
        <div class="bg-white p-2 rounded-md" v-for="item in displayedMessages" :key="item">
          <span @click="openChat(item)" role="button" class="flex justify-between items-start">
            <span class="flex gap-2 items-center">
              <span class="relative">
                <img
                  class="h-[42px] w-[42px] rounded-full"
                  :src="item.user.profilePicture || $avatar"
                  @error="$handleProfileError"
                  alt=""
                />
                <span
                  class="absolute top-0 right-0 ring ring-white block h-2 w-2 bg-green-600 rounded-full"
                ></span>
              </span>
              <span>
                <h5 class="font-semibold text-[15px] capitalize">
                  {{ item.user.userName || 'Starface User' }}
                </h5>
                <h6 class="text-[11px]" v-if="item.lastMessage">
                  {{ (item.lastMessage.sender == userID ? 'You: ' : '') + item.lastMessage.text }}
                </h6>
                <h6 class="text-[11px]" v-else>
                  {{ activeTab == 'chat_requests' ? 'Received chat request' : activeTab == 'messages' ? 'Send your first message' : 'Sent Chat request' }}
                </h6>
              </span>
            </span>
            <div class="flex items-start items-center gap-2">
              <span class="flex gap-2" v-if="activeTab == 'chat_requests'">
                <span
                  role="button"
                  @click.stop="updateStatus(item, 'accepted')"
                  class="bg-green-100 border border-green-200 block w-6 rounded-full flex justify-center items-center text-green-600 h-6"
                  ><i-icon icon="radix-icons:check" />
                </span>
                <span
                  role="button"
                  @click.stop="updateStatus(item, 'rejected')"
                  class="bg-red-100 border border-red-200 block w-6 rounded-full flex justify-center items-center text-red-600 h-6"
                  ><i-icon icon="humbleicons:times" />
                </span>
              </span>
              <span
                v-if="activeTab == 'sent_requests'"
                class="bg-amber-100 border text-amber-600 text-[10px] px-1 rounded-lg w-fit py-[1px] border-amber-200 block"
                >pending</span
              >
              <span class="text-[11px] text-gray-400">
                {{ $formatRelativeTime(item.updatedAt) }}
              </span>
            </div>
          </span>
        </div>
        <div v-if="displayedMessages.length == 0" class="flex flex-col gap-1 items-center">
          <i-icon icon="lucide:messages-square" class="text-4xl" />
          <span class="text-xl font-semibold">No Messages yet!</span>
          <span class="text-sm">Search for a user and send your first message</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      messageRequests: [],
      sentRequests: [],
      items: [],
      userName: '',
      loading: false,
      activeTab: 'messages'
    }
  },

  methods: {
    getConversations() {
      this.loading = true
      this.$chat
        .conversations()
        .then((res) => {
          let messages = []
          res.forEach((item) => {
            let messageData = {
              ...item,
              user:
                item.sender == null
                  ? {}
                  : item.sender.senderId == this.userID
                    ? item.receiver
                    : item.sender
            }
            messages.push(messageData)
          })
          console.log(messages, this.userID)
          this.messageRequests = messages.filter(
            ({ status, participants }) =>
              status === 'pending' && participants[0]._id !== this.userID
          )

          this.sentRequests = messages.filter(
            ({ status, participants }) => status === 'pending' && participants[0]._id == this.userID
          )

          this.messages = messages.filter((item) => item.status == 'accepted')
        })
        .finally(() => {
          this.loading = false
        })
    },

    openChat(item) {
      let checkStatus = item.status
      let type = this.activeTab
      
      if (type !== 'messages') {
        this.$router.push({
          name: 'app-chat-details',
          params: {
            id: item._id
          },
          query: {
            uid: item.user.receiverId,
            status: checkStatus,
            type: type
          }
        })
      }
      else {
        this.$router.push(`/chat/message/${item._id}?uid=${item.user.receiverId}`)
      }
    },

    activateTab(item) {
      console.log(item)
      this.activeTab = item
    },

    async fetchOptions(search, loading) {
      console.log(search)
      let payload = {
        search: search
      }
      loading(true)
      try {
        const res = await this.$appImages.connect(payload)
        this.items = res.users
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        loading(false)
      }
    },

    setSelected(e) {
      console.log(e)
      let payload = {
        userId: this.userID,
        recipientId: e._id
      }
      this.$chat.startChat(payload).then(() => {
        // console.log(res)
        this.$toastify({
          text: 'Chat request sent, Pending approval.',
          gravity: 'top', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          style: {
            fontSize: '13px',
            borderRadius: '4px',
            background: '#333'
          }
        }).showToast()
        this.getConversations()
        return
        // this.$router.push(`chat/message/${res._id}?uid=${e._id}`)
      })
    },

    readMessage(item) {
      let payload = {
        userId: this.userID
      }
      this.$chat.readChat(payload, item._id).then(() => {
        this.$router.push(`/chat/message/${item._id}?uid=${this.getOtherUser(item)._id}`)
      })
    },

    updateStatus(item, status) {
      let payload = {
        status: status
      }
      console.log(payload, item)
      this.$chat.updateStatus(payload, item._id).then(() => {
        this.$router.push(`/chat/message/${item._id}?uid=${this.getOtherUser(item)._id}`)
      })
    },

    getOtherUser(e) {
      let participants = e.participants
      let user = participants.find((user) => user._id !== this.userID)
      return user
    }
  },

  beforeMount() {
    this.getConversations()
  },

  mounted() {
    this.intervalId = setInterval(this.getConversations, 10000)
  },

  beforeUnmount() {
    clearInterval(this.intervalId)
  },

  computed: {
    userID() {
      return this.$store.getters['auth/getUserID']
    },
    displayedMessages() {
      let type = this.activeTab
      return type == 'messages'
        ? this.messages
        : type == 'sent_requests'
          ? this.sentRequests
          : this.messageRequests
    }
  }
}
</script>

<style>
.active-tab::after {
  content: '';
  width: 100%;
  height: 2px;
  background: var(---primary-color);
  bottom: 0;
  position: absolute;
  left: 0;
}
</style>
