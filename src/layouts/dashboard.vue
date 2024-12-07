<template>
  <div class="app-container">
    <app-header :class="[isNotVisible ? 'sticky top-0' : 'hidden']" />
    <div class="content">
      <slot />
    </div>

    <bottom-navigation class="" @routeClick="routeClick" :menu="menu" />

    <!-- SideBar -->
    <Sidebar
      v-model:visible="visibleBottom"
      :show-close-icon="false"
      position="bottom"
      class="rounded-tr-xl h-max rounded-tl-xl"
    >
      <div>
        <h4 class="text-center font-semibold">Create New Post</h4>
        <h6 class="text-xs text-gray-600 text-center">What would you like to upload today?</h6>
        <div class="flex gap-3 mt-3">
          <div
            role="button"
            @click="upload('video')"
            class="bg-gray-200 w-full rounded-md p-4 flex flex-col gap-4 justify-between items-center"
          >
            <img src="@/assets/img/photos.svg" alt="" class="mx-auto h-[50px]" />
            <h6 class="font-semibold text-sm">Upload a video</h6>
          </div>
          <div
            @click="upload('image')"
            role="button"
            class="bg-gray-200 w-full rounded-md p-4 flex flex-col gap-4 justify-between items-center"
          >
            <img src="@/assets/img/video.svg" alt="" class="mx-auto h-[50px]" />
            <h6 class="font-semibold text-sm">Upload an image</h6>
          </div>
        </div>
      </div>
    </Sidebar>

    <!-- Modal For uploading  -->
    <vDialog
      v-model:visible="showContainer"
      modal
      :style="{ width: '80%' }"
      :showHeader="false"
      unstyled
      :pt="{
        root: 'border-none',
        mask: {
          style: 'backdrop-filter: blur(4px)'
        }
      }"
    >
      <div class="bg-white p-4 rounded-md">
        <div class="flex justify-between">
          <h4 class="capitalize font-semibold text-sm">{{ `post ${type}` }}</h4>
          <span class="text-red-500 underline text-xs" role="button" @click="closeContainer">
            Close
          </span>
        </div>
        <div class="mt-2">
          <upload-image v-if="type == 'image'" @completed="completed" />
          <upload-video v-if="type == 'video'" @completed="completed" />
        </div>
      </div>
    </vDialog>
  </div>
</template>

<script>
// import AppHeader from '@/components/navigation/headers/AppHeader.vue'
import BottomNavigation from '@/components/navigation/BottomNavigation.vue'
import UploadImage from '@/components/upload/UploadImage.vue'
import UploadVideo from '@/components/upload/UploadVideo.vue'
import AppHeader from '@/components/navigation/headers/AppHeader.vue'
// import WalletData from '@/components/utils/walletData.vue'
export default {
  components: { BottomNavigation, UploadImage, UploadVideo, AppHeader },
  name: 'DashboardLayout',

  data() {
    return {
      loading: false,
      menu: [
        {
          parent: 'feeds',
          icon: 'fluent-mdl2:photo-video-media',
          title: 'feeds',
          isLink: true,
          url: '/feeds'
        },
        {
          parent: 'connect',
          icon: 'fluent:people-community-24-filled',
          title: 'connect',
          isLink: true,
          url: '/'
        },
        {
          parent: 'create',
          icon: 'bxs:plus-circle',
          title: 'create',
          isLink: false
        },
        {
          parent: 'chat',
          icon: 'raphael:chat',
          title: 'chat',
          isLink: true,
          url: '/chat'
        },

        {
          parent: 'profile',
          icon: 'mingcute:user-3-fill',
          title: 'profile',
          isLink: true,
          url: '/profile'
        }
      ],
      visibleBottom: false,
      showContainer: false,
      type: ''
    }
  },

  methods: {
    routeClick(e) {
      e.isLink ? this.$router.push(e.url) : this.openCreate()
    },

    openCreate() {
      this.visibleBottom = true
    },

    upload(e) {
      this.showContainer = true
      console.log(e)
      this.type = e
    },

    completed() {
      this.type = ''
      this.showContainer = false
    },

    closeContainer() {
      this.showContainer = false
    }
  },

  mounted() {
    // this.enterFullscreen()
  },

  created() {},

  computed: {
    isNotVisible() {
      return this.routeName != 'connect' && this.routeName != 'feeds'
    },

    routeName() {
      return this.$route.meta.name
    },

    routeParent() {
      return this.$route.meta.header
    },

    user() {
      return this.$store.getters['auth/getUser']
    },

    userMeta() {
      return this.$store.getters['auth/getUserMeta']
    },

    isSubPage() {
      return this.$route.meta.isSubPage
    },

    subRouteName() {
      return this.$route.meta.subName
    }
  }
}
</script>

<style></style>
