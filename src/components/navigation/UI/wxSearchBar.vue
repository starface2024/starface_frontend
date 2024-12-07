<template>
  <div
    :class="[type === 'retailer' ? 'bg-black2 border-b border-t border-black3' : '']"
    class="py-4 lg:static md:static sticky top-0 z-10"
  >
    <div class="container">
      <div class="flex items-center justify-between">
        <div class="md:hidden lg-hidden">
          <span @click="drawer = !drawer">
            <i-icon
              icon="ic:baseline-menu"
              class="text-2xl"
              :class="[type === 'retailer' ? 'text-white' : 'text-black1']"
            />
          </span>
        </div>

        <div>
          <router-link to="/" role="button"><img src="@/assets/img/logo.svg" width="120" alt="" /></router-link>
        </div>

        <!-- <div class="hidden md:block lg:block">
          <nav-search />
        </div> -->

        <div class="flex gap-4" :class="[type === 'retailer' ? 'text-white' : 'text-black1']">
          <div class="flex flex-col  gap-1">
            <el-badge
              :value="userItems.cart"
              class="item"
              role="button"
              @click="$router.push('/cart')"
            >
            <i-icon icon="heroicons:shopping-bag" />
            </el-badge>
            
            <span class="block text-[9px]">Cart</span>
          </div>
          <div class="hidden md:flex lg:flex flex-col gap-1">
            <el-badge
              :value="userItems.wishlist"
              class="item"
              role="button"
              @click="$router.push('/user/wishlist')"
            >
            <i-icon icon="bi:heart" />
            </el-badge>
            
            <span class="block text-[9px]">Wishlist</span>
          </div>
        </div>
      </div>

      <!-- Appp Drawer  -->
      <Sidebar v-model:visible="drawer" position="left" style="width: 80%">
        <template #container="{ closeCallback }">
          <div class="h-screen overflow-y-auto px-6 pb-28 flex flex-col z-20 bg-black2">
            <div>
              <span role="button" class="flex justify-end mt-5" @click="closeCallback">
                <i-icon icon="zondicons:close" class="text-[16px] text-white" />
              </span>
            </div>
            <div class="nav--tabs">
              <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="MAIN MENU" name="first">
                  <ul class="flex flex-col">
                    <li v-for="(item, idx) in filteredMenu" :key="idx">
                      <span
                        role="button"
                        @click="menuFunc(item)"
                        class="text-white text-[15px] font-medium"
                        >{{ item.label }}
                      </span>
                      <hr class="my-3 border-gray-400" />
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="CATEGORIES" name="second"> 
                  <CategoryList @selected="drawer = !drawer" />
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </template>
      </Sidebar>
    </div>
  </div>
</template>

<script>
import image from '@/assets/img/no-user.png'
import CategoryList from '@/components/StoreFront/home/categories.vue'
// import NavSearch from '@/components/filters/navSearch.vue'
export default {
  components: { CategoryList },
  props: {
    contentBaseStyles: {
      type: String,
      default: ''
    },
    bodyBaseStyles: {
      type: String,
      default: 'text-white'
    },
    headStyles: {
      type: String,
      default: 'bg-black2 border-b border-t border-black3'
    },
    borderColor: {
      type: String,
      default: 'bg-black1'
    }
  },

  data() {
    return {
      image: image,
      drawer: false,
      activeName: 'first',
      menu: [
        {
          label: 'Home',
          url: '/',
          isLink: true,
          name: ['retailer', 'wholesaler']
        },
        {
          label: 'Retail',
          url: '/',
          isLink: false,
          name: ['retailer'],
          type: 'retailer'
        },
        {
          label: 'Wholesale',
          url: '/',
          isLink: false,
          name: ['wholesaler'],
          type: 'wholesaler'
        },
        {
          label: 'Shop',
          url: '/shop',
          isLink: true,
          name: ['retailer', 'wholesaler']
        },
        {
          label: 'Vendor',
          url: '/stores',
          isLink: true,
          name: ['retailer', 'wholesaler']
        },
        {
          label: 'Adult Shop',
          url: '/adult-shop',
          isLink: true,
          name: ['retailer', 'wholesaler']
        },
      ]
    }
  },

  methods: {
    menuFunc(item) {
      item.isLink ? this.$router.push(item.url) : this.changeType(item.type)
      this.drawer = !this.drawer
    },

    changeType(item) {
      this.$store.commit('drawer/setType', item)
      console.log(item, 'ommmo')
    }
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/getAuthenticated']
    },
    user() {
      return this.$store.getters['auth/getUser']
    },
    userItems() {
      console.log(this.user)
      let cartItems = this.user === null ? [] : this.user.cart
      let filteredCart = cartItems.filter((item)=> item.product !== null)
      const cart = this.user === null ? 0 : filteredCart.length
      const wishlist = this.user === null ? 0 : this.user.wish_lists.length

      return { cart, wishlist }
    },
    type() {
      return this.$store.getters['drawer/getType']
    },

    filteredMenu() {
      let menu = this.menu
      var newMenu = []
      if (this.type === 'retailer') {
        let info = menu.filter((item) => item.name.includes('wholesaler'))
        newMenu = info
      } else {
        let info = menu.filter((item) => item.name.includes('retailer'))
        newMenu = info
      }
      return newMenu
    }
  }
}
</script>

<style>
.item {
  font-size: 22px;
  /* margin-top: 10px; */
  margin-right: 20px;
}
</style>
