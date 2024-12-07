<template>
  <div
    id="app-drawer"
    class="bg-black2 pt-6 pb-12 px-3 flex flex-col justify-between lg:z-2 md:z-2 lg:fixed shadow-lg md:fixed absolute lg:left-0 md:left-0 top-0 h-screen overflow-auto w-[300px]"
  >
    <div>
      <div class="flex justify-center mt-6">
        <router-link to="/"><img src="@/assets/img/logo.svg" width="120" alt="" /></router-link>
      </div>
      <hr class="my-8 bg-gray-200" />

      <ul class="p-0 flex flex-col gap-3">
        <li v-for="(item, idx) in menu" :key="idx">
          <div class="menu-item">
            <span
              class="menu-item-link flex justify-between items-center w-full text-white rounded-tr-xl rounded-br-xl"
              :role="item.header ? '' : 'button'"
              @click="item.hasChildren ? openSubMenu(item) : goToLink(item)"
              :class="{ 'bg-primary': item.parent === routeParent }"
            >
              <div class="flex gap-2 items-center">
                <i-icon :icon="item.icon" v-if="item.icon" class="menu-item-icon" />
                <span class="flex flex-column capitalize">
                  <span :class="item.header ? 'menu-title-header' : 'menu-title'">
                    {{ item.title }}
                  </span>
                </span>
              </div>

              <span v-if="item.hasChildren">
                <i-icon
                  :icon="subMenu === item.parent ? 'prime:angle-down' : 'prime:angle-right'"
                  width="22px"
                />
              </span>
            </span>
            <div class="flex flex-col ml-8 gap-3 mt-2" v-if="subMenu === item.parent">
              <span
                role="button"
                class=""
                v-for="(data, idx) in item.children"
                :key="idx"
                @click="$router.push(data.url)"
              >
                <span
                  class="sub-menu-items flex text-[13px] gap-2 items-center"
                  :class="[data.subItem === subMenuRouteName ? 'text-primary' : 'text-gray-100']"
                >
                  <i-icon :icon="data.icon" class="menu-item-icon" />
                  <span class="sub-menu-title"> {{ data.title }} </span>
                </span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="flex gap-2 items-center text-white text-[13px] pl-3" role="button" @click="logout">
      <i-icon icon="fe:logout" class="menu-item-icon text-[20px]" />
      <span class="flex flex-column capitalize">
        <span> Sign Out </span>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {}
  },

  methods: {
    ...mapActions('drawer', ['setSubMenu']),

    goToLink(item) {
      if (item.parent === 'sign-out') {
        this.logout()
      } else {
        this.$router.push(item.url).catch(() => {})
      }
    },

    openSubMenu(item) {
      let value = this.subMenu === item.parent ? null : item.parent
      this.setSubMenu(value)
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
    subMenuRouteName() {
      return this.$route.meta.subName
    },
    routeParent() {
      return this.$route.meta.parent
    },
    user() {
      return this.$store.getters['auth/getUser']
    },
    //   userMeta() {
    //     return this.$store.getters["auth/getUserMeta"];
    //   },
    ...mapState('drawer', {
      subMenu: (state) => state.subMenu
    })
  }
}
</script>

<style>
#app-drawer li {
  list-style: none;
}

/* When Menu is collapsed */
#app-drawer.collapsible {
  width: 120px;
  transition: all 0.5s;
}

#app-drawer.collapsible ul li .menu-item-link .menu-title {
  display: none;
  transition: all 0.5s;
}

#app-drawer.collapsible ul li .sub-menu .sub-menu-items .sub-menu-title {
  display: none;
  transition: all 0.5s;
}

#app-drawer.collapsible ul li .menu-item-link .menu-title-header {
  font-size: 11px;
}

#app-drawer.collapsible ul li .menu-item-link,
#app-drawer ul li .menu-icon {
  /* padding: 1rem 1.3rem; */
}

#app-drawer ul li .menu-item-link {
  color: var(--gray-900);
  font-weight: 500;
  display: flex;
  display: inline-flex;
  display: -webkit-flex;
  gap: 8px;
  font-size: 13px;
  padding: 8px 6px;
  justify-content: space-between;
  align-items: center;
}

#app-drawer ul li .menu-item-link:hover {
  /* background-color: var(--secondary-color); */
  color: var(--secondary-color);
  transition: all 0.3s;
}

#app-drawer .menu-icon {
  /* background-color: var(--white-50); */
  /* width: 60px; */
  /* height: 60px; */
  /* border-radius: 50%; */
  /* margin-bottom: 30px; */
}

#app-drawer ul li .menu-item-link.active-link {
  background: linear-gradient(to left, var(--primary-color), var(--secondary-color));
  color: var(--white);
  /* color: var(--white-50); */
  /* color: var(--secondary-color); */
  position: relative;
  font-weight: 800;
  /* border-radius: 6px; */
}

#app-drawer ul li .menu-item-link.active-link::before {
  content: '';
  position: absolute;
  left: 0;
  background-color: var(--accent-color);
  width: 4px;
  height: 100%;
}

#app-drawer ul li .menu-item-link .menu-item-icon,
#app-drawer ul li .sub-menu .sub-menu-items .menu-item-icon {
  font-size: 30px;
  /* background: #fff; */
  /* color: var(--secondary-color); */
  padding: 5px;
  /* border-radius: 50%; */
}

#app-drawer.collapsible ul li .sub-menu .sub-menu-items {
  padding: 1em 0 1em 1.8rem;
}

#app-drawer ul li .sub-menu .sub-menu-items {
  color: var(--secondary-100);
  font-weight: 500;
  font-size: 14px;
  padding: 1.3em 0 1em 2.5rem;
}

#app-drawer ul li .sub-menu .sub-menu-items.active-sub-menu {
  background-color: var(--secondary-color);
  color: var(--gray-800);
}

.sub-menu {
  height: 0;
  overflow-y: hidden;
  transition: all 3s;
}
.sub-menu-open {
  height: auto;
  transition: all 3s;
}
</style>
