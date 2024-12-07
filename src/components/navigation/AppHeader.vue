<template>
  <div class="" id="mobile-drawer">
    <div
      class="py-4 px-6 bg-white shadow-sm lg:ml-[300px] md:ml-[300px] md:relative lg:relative z-auto lg:z-10 md:z-10"
    >
      <div class="flex justify-between items-center">
        <span class="font-bold capitalize text-xl"> {{routeName}} </span>
        <div class="flex gap-3 items-center">
          <div class="flex items-center gap-1">
            <!-- <span
              class="uppercase bg-gray-300 h-[30px] w-[30px] flex items-center justify-center font-bold rounded-full"
            >
              {{ user.username.charAt(0) }}
            </span> -->
            <div class="flex gap-2 items-center">
              <img
                :src="user.photo !== null ? imgUrl + user.photo : image"
                class="w-[45px] h-[45px] border-2 p-1 border-gray-100 rounded-full object-fit object-top"
              />
              <div>
                <span class="text-sm capitalize font-semibold block">Vendor</span>
                <span class="text-xs block text-gray-400">{{
                  `${user.first_name} ${user.last_name}`
                }}</span>
              </div>
            </div>
            <div>

              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <i-icon icon="prime:angle-down" class="" width="20px" />
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      ><span @click="$router.push('/vendor/settings')">
                        View Profile
                      </span></el-dropdown-item
                    >
                    <el-dropdown-item>
                      <span @click="logout"> Logout </span>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image from '@/assets/img/no-user.png'
export default {
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  components: {},

  data() {
    return {
      drawer: false,
      image
    }
  },

  methods: {
    goToLink(item) {
      if (item.parent === 'sign-out') {
        this.drawer = false
        this.logout()
      } else {
        this.drawer = false
        this.$router.push(item.url).catch(() => {})
      }
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

  computed: {
    routeName() {
      return this.$route.meta.name
    },
    routeParent() {
      return this.$route.meta.parent
    },
    user() {
      return this.$store.getters['auth/getUser']
    }
    //   userMeta() {
    //     return this.$store.getters["auth/getUserMeta"];
    //   },
  }
}
</script>

<style>
#mobile-drawer ul li .menu-item-link {
  color: var(--gray-900);
  font-weight: 500;
  display: flex;
  display: inline-flex;
  display: -webkit-flex;
  gap: 8px;
  font-size: 13px;
  padding: 0.6rem;
  justify-content: space-between;
  align-items: center;
}

#mobile-drawer ul li .menu-item-link:hover {
  /* background-color: var(--secondary-color); */
  color: var(--secondary-color);
  transition: all 0.3s;
}

#mobile-drawer .menu-icon {
  background-color: var(--white);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* margin-bottom: 30px; */
}

#mobile-drawer ul li .menu-item-link.active-link {
  background: linear-gradient(to left, var(--primary-color), var(--secondary-color));
  color: var(--white);
  font-weight: 500;
  border-radius: 6px;
}

#mobile-drawer ul li .menu-item-link .menu-item-icon,
#mobile-drawer ul li .sub-menu .sub-menu-items .menu-item-icon {
  font-size: 30px;
  background: #fff;
  color: var(--secondary-color);
  padding: 5px;
  border-radius: 50%;
}

#mobile-drawer.collapsible ul li .sub-menu .sub-menu-items {
  padding: 1em 0 1em 1.8rem;
}

#mobile-drawer ul li .sub-menu .sub-menu-items {
  color: var(--secondary-100);
  font-weight: 500;
  font-size: 14px;
  padding: 1.3em 0 1em 2.5rem;
}

#mobile-drawer ul li .sub-menu .sub-menu-items.active-sub-menu {
  background-color: var(--secondary-color);
  color: var(--gray-800);
}
</style>
