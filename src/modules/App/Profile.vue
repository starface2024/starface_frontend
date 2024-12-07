<template>
  <div class="flex gap-6 p-4 pb-[80px] items-start lg:flex-row md:flex-row flex-col">
    <div class="bg-white p-4 lg:w-6/12 md:w-6/12 w-full rounded-md flex justify-center">
      <div class="w-full">
        <div
          @click="logout"
          role="button"
          class="flex gap-1 justify-end items-center text-red-500 text-[14px]"
        >
          <i-icon icon="humbleicons:logout" />
          <span class="font-medium">Logout</span>
        </div>

        <div class="relative w-fit mx-auto">
          <img
            :src="userData.profilePicture ? userData.profilePicture : $avatar"
            @error="$handleProfileError"
            class="w-[100px] h-[100px] mx-auto border-2 p-1 border-gray-200 rounded-full object-fit object-top relative"
          />
          <input
            type="file"
            name="file"
            id="profilePhotoInput"
            class="hidden-input"
            ref="file"
            accept=".png,.jpg,.jpeg,.webp,.svg"
            @change="uploadPhoto"
          />
          <label
            for="profilePhotoInput"
            class="file-label mb-0 flex flex-col items-center bg-primary text-white p-[8px] rounded-full absolute right-0 bottom-0"
          >
            <i-icon
              :icon="isUploading ? 'line-md:downloading-loop' : 'lucide:images'"
              class="text-[15px]"
            />
          </label>
        </div>

        <div class="">
          <h5 class="text-lg justify-center font-bold mt-2 flex gap-1 items-center">
            {{
              userData.firstName && userData.lastName
                ? `${userData.firstName} ${userData.lastName}`
                : ''
            }}
            <span class="text-[12px]">
              {{ `@${userData.userName}` }}
            </span>
            <router-link
              to="/profile/edit"
              class="block text-primary flex items-center gap-1 justify-center text-sm gap-2 font-medium underline text-center"
            >
              <i-icon icon="iconamoon:edit-duotone"
            /></router-link>
          </h5>
        </div>
        <h6 class="text-center text-[12px] text-center mb-2">
          {{ `${userData.email}` }}
        </h6>

        <h6 class="text-center text-[14px] capitalize text-center mb-2">
          {{ `Status | ${userData.role}` }}
          <span class="text-sm text-primary underline"
            ><router-link to="/become-a-creator">Become a Creator</router-link></span
          >
        </h6>

        <span class="flex gap-1 justify-center" v-if="userData.hasCountry">
          <i-icon icon="ic:baseline-location-on" />
          <span class="text-xs">{{ userData.countryName }}</span>
        </span>

        <div class="flex gap-2 w-full mt-4">
          <span class="bg-gray-100 px-2 w-full rounded-md flex flex-col gap-1 py-2 items-center">
            <i-icon icon="noto:glowing-star" />
            <span class="text-xs">{{ likes }} Likes</span>
          </span>

          <!-- <span class="bg-gray-100 px-2 w-full rounded-md flex flex-col gap-1 py-2 items-center">
            <i-icon icon="solar:bell-bold" />
            <span class="text-xs">0 Views</span>
          </span> -->

          <span class="bg-gray-100 px-2 w-full rounded-md flex flex-col gap-1 py-2 items-center">
            <i-icon icon="ic:baseline-rocket-launch" />
            <span class="text-xs">{{ following }} Following</span>
          </span>

          <span class="bg-gray-100 px-2 w-full rounded-md flex flex-col gap-1 py-2 items-center">
            <i-icon icon="solar:bell-bold" />
            <span class="text-xs">{{ followers }} Followers</span>
          </span>
        </div>
        <div class="flex gap-3 mt-4 w-full">
          <button
            class="brand-btn brand-primary-clear py-2 text-xs w-full"
            @click="$router.push('/wallet')"
          >
            My Wallet
          </button>
          <button
            class="brand-btn brand-primary-clear py-2 text-xs w-full"
            @click="$router.push('/invite')"
          >
            Invite Friends
          </button>
          <a
            class="w-full"
            target="_blank"
            href="https://pancakeswap.finance/?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0x6AC86549e40edc13EC8A884756Afa019942EE92b"
          >
            <button class="brand-btn brand-primary-clear py-2 text-xs">Trade Starface</button>
          </a>
        </div>
      </div>
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
            <div v-for="item in posts.images" :key="item.id" class="relative">
              <img
                @click="view('image', item)"
                class="rounded-sm h-[80px] w-full object-cover object-center"
                @error="$handleImageError"
                :src="item.filepaths[0]"
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
            <div v-for="(item, index) in posts.reels" :key="item.id">
              <video
                @click="view('video', item)"
                class="rounded-sm h-[80px] w-full object-cover object-center"
                v-if="!item.hasError"
                @error="handleVideoError(index)"
                muted
                :src="item?.videoUrl"
              ></video>
              <img
                v-else
                @click="view('video', item)"
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
            :src="item.filepaths[0]"
            alt=""
          />
          <!-- {{ item }} -->
          <div v-if="type == 'video'">
            <h5 class="font-semibold text-sm capitalize">title</h5>
            <h6>{{ item.title }}</h6>
          </div>
          <div>
            <h5 class="font-semibold text-sm capitalize">description</h5>
            <p>{{ item.description }}</p>
          </div>
          <div class="w-full">
            <button @click="deleteRecord" class="brand-btn bg-red-500 w-full text-white">
              Delete
            </button>
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
      activeTab: 0,
      likes: 0,
      views: 0,
      followers: 0,
      following: 0,
      isUploading: false,
      posts: {},
      showContainer: false,
      type: null,
      item: {}
    }
  },

  methods: {
    view(e, obj) {
      console.log(e)
      this.type = e
      this.item = obj
      this.showContainer = true
    },

    deleteRecord() {
      this.$swal
        .fire({
          title: 'Uhhhh! 😔',
          text: 'Complete Delete process?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete!'
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.completeDelete()
          }
        })
    },

    completeDelete() {
      // this.isDeleting == true
      if (this.type == 'video') {
        this.$reels.delete(this.item.videoId).then(() => {
          this.closeContainer()
          this.getPosts()
        })
        return
      }

      if (this.type == 'image') {
        this.$appImages.delete(this.item.ImageId).then(() => {
          this.closeContainer()
          this.getPosts()
        })
      }
    },

    // userLogout() {
    //   this.$store.dispatch('auth/logout')
    //   this.$swal
    //     .fire({
    //       title: 'Woo hoo 😫',
    //       text: 'Logged out succesfully',
    //       icon: 'success',
    //       confirmButtonText: 'Ok!'
    //     })
    //     .then((result) => {
    //       console.log(result, 'kkk')
    //       if (result.isConfirmed) {
    //         this.$router.go()
    //       }
    //     })
    // },

    closeContainer() {
      this.showContainer = false
    },

    activateTab(e) {
      this.activeTab = e
    },

    handleVideoError(index) {
      this.posts.reels[index].hasError = true
    },

    getLikes() {
      this.$userActivity.views().then((res) => {
        console.log(res)
        this.likes = res.totalLikes
        this.views = this.totalViews
      })
    },
    getUser() {
      this.$auth.getUser(this.userData._id).then((res) => {
        console.log(res)
        this.$store.commit('auth/setUser', res.user)
        return res
      })
    },

    getFollowCount() {
      this.$userActivity.followCount().then((res) => {
        console.log(res)
        this.followers = res.followerCount
        this.following = res.followingCount
      })
    },
    getEarnWallet() {
      this.$wallet.earnWallet().then((res) => {
        console.log(res)
      })
    },
    getPosts() {
      this.$userActivity.allPosts().then((res) => {
        console.log(res)
        this.posts = res
      })
    },

    getProfileData() {
      this.isLoading = true
      const request1 = this.getLikes()
      const request2 = this.getFollowCount()
      const request3 = this.getEarnWallet()
      const request4 = this.getPosts()
      const request5 = this.getUser()
      Promise.all([request1, request2, request3, request4, request5]).finally(() => {
        this.isLoading = false
      })
    },

    uploadPhoto() {
      const input = event.target
      let image = input.files[0]
      this.isUploading = true
      let formdata = new FormData()
      formdata.append('profilePicture', image)

      this.$auth
        .updateProfilePhoto(formdata)
        .then((res) => {
          this.getUser()
          return res
        })
        .finally(() => {
          this.isUploading = false
        })
    },

    logout() {
      this.$swal
        .fire({
          title: 'Uhhhh! 😔',
          text: 'Are you sure you want to log out?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, logout!'
        })
        .then((result) => {
          console.log(result, 'kkk')
          if (result.isConfirmed) {
            this.userLogout()
          }
        })
    },

    userLogout() {
      this.$store.dispatch('auth/logout')
      this.$swal
        .fire({
          title: 'Woo hoo 😫',
          text: 'Logged out succesfully',
          icon: 'success',
          confirmButtonText: 'Ok!'
        })
        .then((result) => {
          console.log(result, 'kkk')
          if (result.isConfirmed) {
            this.$router.go()
          }
        })
    }
  },

  watch: {},

  beforeMount() {
    // this.getUser()
    this.getProfileData()
  },

  computed: {
    userData() {
      return this.user
    },
    user() {
      return this.$store.getters['auth/getUser']
    },
    userMeta() {
      return this.$store.getters['auth/getUserMeta']
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

<style>
.hidden-input {
  opacity: 0;
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
}

.file-label {
  font-size: 20px;
  display: block;
  cursor: pointer;
}
</style>
