<template>
  <div class="flex gap-6 p-4 items-start lg:flex-row md:flex-row flex-col pb-[80px]">
    <!-- {{ user }} -->
    <div class="lg:w-6/12 md:w-6/12 w-full rounded-md flex justify-center">
      <div class="w-full flex flex-col gap-4">
        <div
          :style="getBackgroundStyle(info.profilePicture)"
          class="w-[100%] h-[400px] relative bg-no-repeat bg-cover bg-center mx-auto p-4 rounded-md"
        >
          <div class="overlay p-4">
            <div class="flex items-center justify-between w-full">
              <h4 class="font-bold text-white text-xl">{{ info.userName }}</h4>
              <div class="flex items-center gap-2">
                <button class="brand-primary brand-btn rounded-full shadow" @click="startChat">
                  <i-icon icon="majesticons:chat" class="text-xl text-white" />
                </button>
                <!-- <button
                  @click="favouriteAction(info)"
                  :class="[checkFavourite ? 'bg-gray-400' : 'brand-primary' , 'brand-btn rounded-full shadow']"
                >
                  <i-icon icon="streamline:star-1-solid" class="text-xl text-white" />
                </button> -->
                <button
                  @click="likeAction(info)"
                  :class="[
                    checkLiked ? 'bg-gray-400' : 'brand-primary',
                    'brand-btn rounded-full shadow'
                  ]"
                >
                  <i-icon icon="icon-park-solid:like" class="text-xl text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- <h5 class="text-center text-lg text-center font-bold mt-2">Nicey, 45</h5>
        <span class="flex gap-1 justify-center">
          <i-icon icon="ic:baseline-location-on" />
          <span class="text-xs">Montreal, Canada</span>
        </span> -->
        <div class="flex justify-between">
          <div>
            <span class="text-sm block text-gray-500">Bio</span>
            <p class="text-sm">
              {{ info.bio }}
            </p>
          </div>

          <div>
            <button
              @click="blockFunction"
              :class="[
                'bg-gray-300 block px-3 font-medium py-[2px] rounded-[5px] text-red-600',
                { '!text-green-600': isUserBlocked() }
              ]"
            >
              {{ isUserBlocked() ? 'Unblock' : 'Block' }}
            </button>
          </div>
        </div>

        <div>
          <span class="text-sm block text-gray-500">Interests</span>
          <span class="flex gap-2 flex-wrap">
            <span
              class="bg-gray-100 border border-gray-200 px-2 py-1 text-xs rounded-xl"
              v-for="item in info.interests"
              :key="item"
              >{{ item }}</span
            >
          </span>
        </div>

        <div class="w-full">
          <span class="flex mx-auto mb-3 bg-gray-200 w-fit">
            <span
              class="block px-3 py-2 text-[12px] capitalize font-medium"
              role="button"
              @click="activateTab(i)"
              :class="{ 'brand-primary-clear text-white font-semibold': i === activeTab }"
              v-for="(item, i) in tabs"
              :key="i"
            >
              {{ item.label }}
            </span>
          </span>
          <div class="bg-white p-4">
            <div class="flex gap-2 flex-col">
              <div class="grid grid-cols-3 gap-2" v-if="activeTab == '1' || activeTab == '0'">
                <div v-for="item in images" :key="item.id" class="relative">
                  <img
                    @click="view('image', item)"
                    class="rounded-sm h-[80px] w-full object-cover object-center"
                    @error="$handleImageError"
                    :src="item.images[0].filepath"
                    alt=""
                  />
                  <span
                    class="bg-[#000] text-xs p-[4px] justify-end flex gap-1 items-center text-white block absolute bottom-0 w-full"
                  >
                    <i-icon icon="icon-park-solid:like" />
                    {{ item.likes }}
                  </span>
                </div>
              </div>
              <div class="grid grid-cols-3 gap-2" v-if="activeTab == '2' || activeTab == '0'">
                <div v-for="(item, index) in reels" :key="item.id">
                  <video
                    @click="view('video', item)"
                    class="rounded-sm h-[80px] w-full object-cover object-center"
                    v-if="!item.hasError"
                    @error="handleVideoError(index)"
                    autoplay
                    muted
                    :src="item?.videoUrl"
                  ></video>
                  <img
                    @click="view('video', item)"
                    v-else
                    @error="$handleImageError"
                    :src="item.thumbnailUrl"
                    alt="Placeholder"
                    class="h-[80px] w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
            <!-- <component :is="tabs[activeTab].component" /> -->
          </div>
        </div>
      </div>
    </div>

    <vDialog
      v-model:visible="showContainer"
      modal
      :style="{ width: '80%' }"
      @hide="closeContainer"
      @after-hide="closeContainer"
      :showHeader="false"
      unstyled
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(4px)'
        }
      }"
    >
      <div class="bg-white p-4 rounded-lg">
        <div class="flex justify-between mb-2">
          <h4 class="font-semibold text-lg">Preview</h4>
          <span class="text-red-500 text-sm underline" @click="closeContainer">Close</span>
        </div>
        <div class="flex flex-col gap-3 w-full">
          <video
            @error="handleVideoError(index)"
            v-if="type == 'video'"
            muted
            class="rounded-sm h-[250px] w-[100%] object-cover object-center"
            :src="item?.videoUrl"
            controls
          ></video>
          <img
            v-if="type == 'image'"
            class="rounded-sm h-[250px] w-full object-cover object-center"
            @error="$handleImageError"
            :src="item.images[0].filepath"
            alt=""
          />
          <div v-if="type == 'video'">
            <h5 class="font-semibold text-sm capitalize">title</h5>
            <h6>{{ item.title }}</h6>
          </div>
          <div>
            <h5 class="font-semibold text-sm capitalize">description</h5>
            <p>{{ item.description }}</p>
          </div>
        </div>
      </div>
    </vDialog>
  </div>
</template>

<script>
// import Edit from '@/components/profile/Edit.vue'
// import Transactions from '@/components/profile/Transactions.vue'
// import Referral from '@/components/profile/Referral.vue'
// import { markRaw } from 'vue'
import image from '@/assets/img/no-user.png'

export default {
  // components: { Edit, Transactions },
  data() {
    return {
      image,
      form: {
        first_name: '',
        last_name: '',
        phone_number: '',
        country: '',
        region_state_province: '',
        city: '',
        bio: '',
        date_of_birth: '',
        gender: '',
        profile_picture_url: ''
      },
      info: {},
      activeTab: 0,
      userID: this.$route.params.id,
      images: [],
      reels: [],
      tabs: [
        {
          label: 'all'
          // component: markRaw(Edit)
        },
        {
          label: 'photos'
          // component: markRaw(Edit)
        },
        {
          label: 'videos'
          // component: markRaw(Transactions)
        }
        // {
        //   label: 'referral',
        //   component: markRaw(Referral)
        // }
      ],
      type: '',
      item: {},
      showContainer: false
    }
  },

  methods: {
    closeContainer() {
      this.showContainer = false
    },

    activateTab(e) {
      this.activeTab = e
    },

    view(e, obj) {
      console.log(e, obj)
      this.type = e
      this.item = obj
      this.showContainer = true
    },

    getUser() {
      this.$auth.getUser(this.userID).then((res) => {
        console.log(res)
        this.info = res.user
        this.getUserImages()
        this.getUserReels()
      })
    },

    handleVideoError(index) {
      this.reels[index].hasError = true
    },

    checkFavourite() {
      if (!this.isLoggedIn) {
        return
      }
      let isUser = this.info.favouritedBy.find((item) => item == this.user._id)
      return isUser
    },

    isUserBlocked() {
      if (!this.isLoggedIn) {
        return
      }
      let isUser = this.user.blockedUsers.find((item) => item == this.info._id)
      return isUser
    },

    checkLiked() {
      if (!this.isLoggedIn) {
        return
      }
      let isUser = this.info.likedBy.find((item) => item == this.user._id)
      return isUser
    },

    startChat() {
      if (!this.isLoggedIn) {
        this.$toastify({
          text: 'Login to continue.',
          gravity: 'top', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          style: {
            fontSize: '13px',
            borderRadius: '4px',
            background: '#ff0000'
          }
        }).showToast()
        this.$router.push('/auth/login')
        return
      }
      let payload = {
        userId: this.user._id,
        recipientId: this.info._id
      }
      this.$chat.startChat(payload).then(() => {
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
        return
        // console.log(res)
        // this.$router.push(`/chat/message/${res._id}?uid=${this.info._id}`)
      })
    },

    getMyProfile() {
      this.$auth.getUser(this.user._id).then((res) => {
        console.log(res)
        this.$store.commit('auth/setUser', res.user)
        return res
      })
    },

    favouriteAction(e) {
      if (!this.isLoggedIn) {
        this.$toastify({
          text: 'Login to continue.',
          gravity: 'top', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          style: {
            fontSize: '13px',
            borderRadius: '4px',
            background: '#ff0000'
          }
        }).showToast()
        this.$router.push('/auth/login')
        return
      }
      let payload = {
        targetUserId: e._id, //like, unlike, favorite, unfavorite, follow, unfollow
        action: this.checkFavourite ? 'unfavorite' : 'favorite'
      }
      this.$userActivity.toggleUserActions(payload).then(() => {
        this.getUser()
      })
    },

    blockFunction() {
      if (!this.isLoggedIn) {
        this.$toastify({
          text: 'Login to continue.',
          gravity: 'top', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          style: {
            fontSize: '13px',
            borderRadius: '4px',
            background: '#ff0000'
          }
        }).showToast()
        this.$router.push('/auth/login')
        return
      }
      let payload = {
        block: this.isUserBlocked() ? false : true
      }
      this.$userActivity.toggleBlockActions(payload, this.info._id).then(() => {
        this.getMyProfile()
      })
    },

    likeAction(e) {
      if (!this.isLoggedIn) {
        this.$toastify({
          text: 'Login to continue.',
          gravity: 'top', // `top` or `bottom`
          position: 'center', // `left`, `center` or `right`
          style: {
            fontSize: '13px',
            borderRadius: '4px',
            background: '#ff0000'
          }
        }).showToast()
        this.$router.push('/auth/login')
        return
      }
      let payload = {
        targetUserId: e._id, //like, unlike, favorite, unfavorite, follow, unfollow
        action: this.checkLiked ? 'unlike' : 'like'
      }
      this.$userActivity.toggleUserActions(payload).then(() => {
        this.getUser()
      })
    },

    getUserImages() {
      this.$appImages.getUser(this.userID).then((res) => {
        console.log(res)
        this.images = res.data
        // this.info = res.user
      })
    },

    getUserReels() {
      this.$appImages.getUserReels(this.userID).then((res) => {
        console.log(res)
        this.reels = res.reels
        // this.images = res.data
        // this.info = res.user
      })
    },

    getBackgroundStyle(image) {
      const img = new Image()
      img.src = image

      return {
        backgroundImage: `url('${img.complete && img.naturalWidth !== 0 ? image : this.$avatar}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    }
  },

  watch: {
    user: {
      handler(val) {
        this.form = val
      },
      immediate: true,
      deep: true
    }
  },

  beforeMount() {
    this.getUser()
    this.getMyProfile()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },

    userMeta() {
      return this.$store.getters['auth/getUserMeta']
    },

    isLoggedIn() {
      return this.$store.getters['auth/getAuthenticated']
    },

    timeLeft() {
      return (
        this.userMeta.subscription_fee_expiration_time_of_last_payment -
        this.userMeta.subscription_fee_transaction_time_of_last_payment
      )
    }
  }
}
</script>

<style scoped>
.overlay {
  position: absolute;
  bottom: 0;
  /* padding: 15px 200px; */
  left: 0;
  width: 100%;
  min-height: 200px; /* Adjust height as needed */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent); /* Smooth blend */
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-radius: 0.375rem;
}

.overlay-content {
  color: white;
  padding: 10px;
  text-align: center;
}
</style>
