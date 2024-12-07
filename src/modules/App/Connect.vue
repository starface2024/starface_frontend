<template>
  <div class="reels-page p-4">
    <div
      class="input-field bg-white mb-4 w-full border-neutral-500 rounded-md border-[2px] w-full gap-2 items-center"
    >
      <span class="password-iccon">
        <i-icon icon="ph:magnifying-glass" class="form-icon" />
      </span>
      <input
        type="text"
        name="search"
        id="search"
        @keyup="updateUrl"
        v-model="search"
        placeholder="Search Users"
      />
    </div>
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div
          v-if="loading"
          class="!bg-[#191819] h-[100dvh] absolute inset-0 flex items-center justify-center"
        >
          <img src="@/assets/animation/load.gif" alt="" />
        </div>
      </template>
      <template #default>
        <swiper :modules="modules" :navigation="true">
          <swiper-slide v-for="(item, i) in images" :key="i">
            <div class="card-wrapper">
              <img
                class="rounded-[10px] swiper-img"
                :src="item.profilePicture || $avatar"
                @error="$handleImageError"
                alt="Image"
              />
              <div class="overlay">
                <div class="flex flex-col gap-2 p-4">
                  <button class="brand-btn-md brand-outline text-white w-fit">
                    <router-link :to="`/user/profile/${item._id}`"> View More </router-link>
                  </button>
                  <h4 class="font-semibold text-xl text-white">{{ item.userName }}</h4>
                  <div class="flex gap-2">
                    <button class="brand-btn-md brand-outline text-white" @click="likeImage(item)">
                      {{ checkLiked(item) ? 'Unlike' : 'like' }}
                    </button>
                    <button class="brand-btn-md brand-outline text-white" @click="startChat(item)">
                      Chat
                    </button>
                    <button
                      class="brand-btn-md brand-outline text-white"
                      @click="followAction(item)"
                    >
                      {{ checkFollowing(item) ? 'Unfollow' : 'Follow' }}
                    </button>
                  </div>
                </div>
                <!-- <button class="brand-primary brand-btn rounded-full shadow">
                  <star-icon />
                </button> -->
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
// import { EffectCards } from 'swiper/modules'
// import required modules
import { Navigation } from 'swiper/modules'
import { debounce } from 'lodash'
// import StarIcon from '@/components/UI/StarIcon.vue';

export default {
  components: {
    Swiper,
    SwiperSlide
    // StarIcon,
  },
  data() {
    return {
      loading: true,
      images: [],
      modules: [Navigation],
      search: ''
    }
  },
  methods: {
    updateUrl: debounce(function () {
      this.$router.push({ query: { search: this.search } })
      this.getConnect('refresh')
    }, 500),

    async getConnect(value) {
      if (!value) this.loading = true
      let payload = {
        search: this.search
      }
      try {
        const res = await this.$appImages.connect(payload)
        this.images = res.users
      } catch (error) {
        console.error('Error fetching images:', error)
      } finally {
        this.loading = false
      }
    },

    checkLiked(e) {
      if (!this.isLoggedIn) {
        return
      }
      return e.following.includes(this.user._id)
    },

    likeImage(e) {
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
        action: this.checkLiked(e) ? 'unlike' : 'like'
      }
      this.$userActivity.toggleUserActions(payload).then(() => {
        this.getUser()
        this.getConnect('value')
      })
    },

    startChat(e) {
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
        recipientId: e._id
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
        // this.$router.push(`chat/message/${res._id}?uid=${e._id}`)
      })
    },

    followAction(e) {
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
        action: this.checkFollowing(e) ? 'unfollow' : 'follow'
      }
      this.$userActivity.toggleUserActions(payload).then(() => {
        this.getUser()
        this.getConnect('value')
      })
    },

    async getUser() {
      try {
        const res = await this.$auth.getUser(this.user._id)
        this.$store.commit('auth/setUser', res.user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    },

    checkFollowing(item) {
      if (!this.isLoggedIn) {
        return
      }
      return this.user.following.includes(item._id)
    }
  },

  watch: {
    queryParams: {
      immediate: true, // Ensure it runs on component mount
      handler(newQuery) {
        this.search = newQuery || ''
        this.getConnect('refresh') // Fetch data based on the query
      }
    }
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    },
    isLoggedIn() {
      return this.$store.getters['auth/getAuthenticated']
    },

    queryParams() {
      return this.$route.query.search
    }
  },
  mounted() {
    this.getConnect()
  }
}
</script>

<style scoped>
.reels-page {
  background-color: #000;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.swiper-img {
  object-fit: cover;
  width: 100%;
  height: calc(100vh - 300px); /* Adjust to match overlay height */
}
.overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 300px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.skeleton-slide {
  height: 100vh;
  border-radius: 10px;
  width: 100%;
}
</style>
