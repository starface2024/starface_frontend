<template>
  <div class="h-screen overflow-y-auto snap-y snap-mandatory">
    <!-- <div
      v-if="loading"
      class="!bg-[#191819] h-[100dvh] absolute inset-0 flex items-center justify-center"
    >
      <img src="@/assets/animation/load.gif" alt="" />
    </div> -->
    <div
      v-for="(video, index) in videos"
      :key="video._id"
      class="h-[100dvh] flex justify-center items-center snap-start relative"
      ref="videoContainer"
    >
      <!-- Video Container -->
      <div class="relative">
        <template v-if="!videoError[index]">
          <!-- Video Element -->
          <video
            :src="video.videoUrl"
            class="h-[100dvh] w-[100vw] object-cover"
            @loadeddata="handleLoaded(index)"
            @error="handleVideoError(index)"
            playsinline
            loop
            :muted="muteAll"
          ></video>
        </template>
        <template v-else>
          <!-- Fallback Image -->
          <img
            :src="
              video.fallbackImage || 'https://via.placeholder.com/640x360?text=Video+Unavailable'
            "
            @error="handleFallbackError(index)"
            alt="Fallback"
            class="h-[100dvh] w-[100vw] object-cover"
          />
        </template>

        <!-- Loader for video loading -->
        <div
          v-if="!videoLoaded[index] && !videoError[index]"
          class="!bg-[#191819] h-[100dvh] absolute inset-0 flex items-center justify-center"
        >
          <img src="@/assets/animation/load.gif" alt="" />
        </div>
      </div>

      <!-- Title Overlay -->
      <div
        class="absolute bottom-0 px-4 pb-20 w-full text-white bg-gradient-to-t from-black to-transparent"
      >
        <div class="flex justify-between items-end">
          <user-data :reelData="video" />
          <actions @getActionable="getActionable" :reelData="video" @refresh="refresh" />
        </div>
      </div>
    </div>

    <div class="absolute top-5 px-4 flex justify-between items-center w-full">
      <!-- Wallet Data  -->
      <div class="bg-black text-white px-3 py-1 bg-opacity-50 rounded-md">
        <wallet-data :starBalance="starBalance" />
      </div>

      <!-- Global Mute Toggle Button -->
      <button class="bg-black text-white p-2 bg-opacity-50 rounded-full" @click="toggleMuteAll">
        <!-- {{ muteAll ? 'Unmute All' : 'Mute All' }} -->
        <i-icon
          :icon="muteAll ? 'fluent:speaker-off-16-filled' : 'fluent:speaker-2-32-filled'"
          class="text-xl"
        />
      </button>
    </div>

    <div class="absolute right-4 z-20 top-[30%]">
      <a
        href="https://faq.starface.chat"
        target="_blank"
        class="shadow bg-white block p-2 rounded-full"
      >
        <i-icon icon="emojione-v1:spiral-notepad" class="text-xl" />
      </a>
    </div>

    <!-- Popup to redeem coin  -->
    <vDialog
      v-model:visible="showContainer"
      modal
      :style="{ width: '40%' }"
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
      <div class="">
        <span class="flex flex-col items-center justify-center w-full">
          <!-- <i-icon icon="fluent-emoji-flat:coin" class="text-[200px]" /> -->
          <img
            role="button"
            @click.once="redeem"
            src="@/assets/img/icons/claim.webp"
            alt=""
            :class="isLoading ? 'heartbeat' : 'fadeIn'"
          />
          <span class="text-white text-sm mt-12">Tap to claim</span>
        </span>
      </div>
    </vDialog>

    <!-- Dropup for Comment and More Actions  -->
    <Sidebar
      v-model:visible="visibleBottom"
      :show-close-icon="false"
      position="bottom"
      class="max-h-80 h-full"
    >
      <div class="">
        <Comments
          v-if="actionable == 'comments'"
          @refreshReel="refreshReel"
          :items="comments"
          :reel="reel"
        />
      </div>
      <div class="">
        <ul v-if="actionable == 'view'">
          <li class="bg-gray-100 p-2 rounded-lg">Flag this post</li>
        </ul>
      </div>
    </Sidebar>
  </div>
</template>

<script>
import Actions from '@/components/reels/Actions.vue'
import UserData from '@/components/reels/UserData.vue'
import WalletData from '@/components/utils/walletData.vue'
import Comments from '@/components/reels/Comments.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: { Actions, UserData, WalletData, Comments },
  name: 'Reels',
  data() {
    return {
      muteAll: false, // Global mute state
      actionable: null,
      showContainer: false,
      comments: [],
      reel: {},
      visibleBottom: false,
      starBalance: {},
      loading: false,
      isLoading: false
    }
  },
  methods: {
    ...mapActions('videos', ['fetchVideos']),
    refreshReel(e) {
      this.getReel(e)
      // this.refresh()
      this.fetchVideos()
    },

    refresh() {
      this.$reels.list().then((res) => {
        this.videos = res.reels.map((video) => ({
          ...video,
          fallbackImage: video.fallbackImage || null // Add fallback image if available
        }))
      })
    },

    getActionable(e) {
      this.visibleBottom = true
      let dataFromEntry = JSON.parse(e)
      this.actionable = dataFromEntry.e
      if (dataFromEntry.e == 'comments') {
        this.getReel(dataFromEntry.value._id)
      }
    },

    getReel(id) {
      this.$reels.get(id).then((res) => {
        console.log(res)
        this.comments = res.reel.comments
        this.reel = res.reel
      })
    },

    openContainer() {
      this.showContainer = true
    },

    closeContainer() {
      this.showContainer = false
    },

    showContainerModified() {
      setTimeout(() => {
        this.openContainer() // Run the operation immediately
        // Then, schedule the repeated execution every 30 minutes (1,800,000 milliseconds)
        setInterval(this.openContainer, 600000)
      }, 60000) // 10 mi
    },

    redeem() {
      if (!this.isLoggedIn) {
        this.$toastify({
          text: 'Login to be able claim bonus.',
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
      this.isLoading = true
      this.$wallet
        .redeem()
        .then((res) => {
          this.getEarnWallet()
          this.showContainer = false
          return res
        })
        .finally(() => {
          this.isLoading = false
        })
    },

    getEarnWallet() {
      if (!this.isLoggedIn) {
        return
      }
      this.$wallet.earnWallet().then((res) => {
        console.log(res)
        this.starBalance = res.star
      })
    },

    handleLoaded(index) {
      // this.videoLoaded[index] = true
      this.$store.commit('videos/SET_VIDEO_LOADED', index)
    },

    handleVideoError(index) {
      console.error(`Video failed to load at index ${index}`, this.videos[index])
      this.$store.commit('videos/SET_VIDEO_ERROR', index)
    },

    handleIntersection(entries) {
      entries.forEach((entry) => {
        const video = entry.target.querySelector('video')
        if (entry.isIntersecting && video && !this.videoError[entry.target.dataset.index]) {
          video.play().catch((error) => {
            console.error('Error playing video:', error.message)
            // this.handleVideoError(entry.target.dataset.index)
            return error
          })
        } else if (video) {
          video.pause()
        }
      })
    },

    toggleMuteAll() {
      // Toggle the mute state for all videos
      this.muteAll = !this.muteAll
    },

    handleFallbackError(index) {
      // Handle the error when the fallback image itself fails to load
      //   console.error(`Fallback image for video at index ${index} failed to load.`)
      this.videoError[index] = true // Mark the video as errored
    },

    // Check if user is near the end
    handleScroll() {
      const scrollContainer = this.$el
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight - 200
      ) {
        this.fetchVideos(true) // Load more videos when near the end
      }
    }
  },

  mounted() {
    // this.loading = true
    this.$el.addEventListener('scroll', this.handleScroll)
    this.fetchVideos() // Fetch initial videos
    this.getEarnWallet()
    this.showContainerModified()

    this.$nextTick(() => {
      const videoContainers = this.$refs.videoContainer

      if (!this.observer) {
        const options = {
          root: null, // Viewport
          threshold: 0.4 // Trigger when 40% of the element is visible
        }

        this.observer = new IntersectionObserver(this.handleIntersection, options)
      }

      // Ensure videoContainers is an array before observing
      if (Array.isArray(videoContainers)) {
        videoContainers.forEach((el) => {
          if (el) {
            this.observer.observe(el)
          }
        })
      } else {
        console.error('videoContainers is not an array', videoContainers)
      }
    })
  },

  unmounted() {
    this.$el.removeEventListener('scroll', this.handleScroll)
    if (this.observer) this.observer.disconnect()
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },
    isLoggedIn() {
      return this.$store.getters['auth/getAuthenticated']
    },
    ...mapState('videos', ['videoLoaded', 'videoError']),
    ...mapGetters('videos', ['videos'])
  }
}
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
