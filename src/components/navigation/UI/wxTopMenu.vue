<template>
  <div :class="[type === 'retailer' ? 'bg-black2' : 'bg-gray-200']">
    <div class="container" :class="[type === 'retailer' ? 'text-white' : 'text-black1']">
      <div class="flex justify-between py-4 items-center gap-6">
        <!-- <span>HELLO, WELCOME TO WAREHAUZE, YOUR ALL IN ONE MARKETPLACE</span> -->
        <span class="uppercase text-[11px] font-medium break-word w-full"
          >hello, welcome to warehauze, your all in one marketplace</span
        >

        <!-- <hr class="my-2 border-gray-800"> -->
        <!-- <div class="md:hidden lg:hidden w-full flex justify-end">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link text-sm flex items-center gap-3" :class="[type === 'retailer' ? 'text-white' : 'bg-black2']">
              <img :src="user.photo !== null ? (imgUrl + user.photo) : image"  class="w-6 h-6 rounded-full object-fit object-top"/>
              <span>
                Hi, {{ user.first_name }}
              </span>
              
              <i-icon icon="uim:angle-down" />
            </span>
            <template #dropdown>
              <div class="p-4">
                <ul class="flex gap-3  flex-col">
                  <li class="" v-if="!isLoggedIn">
                    <router-link class="text-[12px] font-medium hover:text-secondary" to="/login"
                      >Sign in</router-link
                    >
                  </li>
                  <li class="" v-if="!isLoggedIn">
                    <router-link class="text-[12px] font-medium hover:text-secondary" to="/register"
                      >Register</router-link
                    >
                  </li>
                  <li v-if="isLoggedIn">
                    <router-link class="text-[12px] font-medium hover:text-secondary" to="/user"
                      >My Account</router-link
                    >
                  </li>
                  <li v-if="isLoggedIn">
                    <span role="button" class="text-[12px] font-medium block w-full hover:text-secondary">Logout</span>
                  </li>
                  <li>
                    <router-link class="text-[12px] font-medium hover:text-secondary" to="/contact"
                      >Contact Us</router-link
                    >
                  </li>
                </ul>
              </div>
            </template>
          </el-dropdown>
        </div> -->

        <div class="w-full flex justify-end">
          <ul class="flex gap-6 items-center">
            <li class="md:block lg:block hidden">
              <router-link class="text-[11px] hover:text-secondary" to="/contact"
                >Contact Us</router-link
              >
            </li>
            <li class="" v-if="!isLoggedIn">
              <router-link class="text-[11px] hover:text-secondary" to="/login">Sign in</router-link
              ><span class="text-[11px]"> / </span
              ><router-link class="text-[11px] hover:text-secondary" to="/register"
                >Register</router-link
              >
            </li>
            <div v-if="isLoggedIn">
              <el-dropdown trigger="click">
                <span
                  class="el-dropdown-link text-sm flex items-center gap-3"
                  :class="[type === 'retailer' ? 'text-white' : 'text-black1']"
                >
                  <img
                    :src="user.photo !== null ? imgUrl + user.photo : image"
                    class="w-6 h-6 rounded-full object-fit object-top"
                  />
                  <span> Hi, {{ user.first_name }} </span>

                  <i-icon icon="uim:angle-down" />
                </span>
                <template #dropdown>
                  <div class="p-4">
                    <ul class="flex gap-3 flex-col">
                      <li>
                        <router-link class="text-[12px] font-medium hover:text-secondary" to="/user"
                          >My Account</router-link
                        >
                      </li>
                      <li>
                        <span
                        @click="logout"
                          role="button"
                          class="text-[12px] font-medium block w-full hover:text-secondary"
                          >Logout</span
                        >
                      </li>
                      <li>
                        <router-link
                          class="text-[12px] font-medium hover:text-secondary"
                          to="/contact"
                          >Contact Us</router-link
                        >
                      </li>
                    </ul>
                  </div>
                </template>
              </el-dropdown>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image from '@/assets/img/no-user.png'
export default {
  props: {
    contentBaseStyles: {
      type: String,
      default: ''
    },
    bodyBaseStyles: {
      type: String,
      default: 'text-white'
    },
    bgColor: {
      type: String,
      default: 'bg-black2'
    }
  },

  data() {
    return {
      image: image
    }
  },

  methods: {
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

  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/getAuthenticated']
    },
    user() {
      return this.$store.getters['auth/getUser']
    },
    type() {
      return this.$store.getters['drawer/getType']
    },
  }
}
</script>

<style></style>
