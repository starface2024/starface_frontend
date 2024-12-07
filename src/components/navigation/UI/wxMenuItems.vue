<template>
  <div
    :class="[type === 'retailer' ? 'bg-black2' : 'bg-gray-200']"
    class="lg:sticky md:sticky static top-0 z-10"
  >
    <div class="container">
      <div class="flex gap-6 items-center" :class="{ 'py-4': type === 'wholesaler' }">
        <wx-dropdown v-if="type === 'retailer'">
          <template #trigger>
            <div
              role="button"
              class="flex justify-between items-center text-white el-dropdown-link bg-primary py-4 px-3 w-[300px]"
            >
              <span class="flex gap-3 items-center">
                <i-icon icon="ic:baseline-menu" class="text-2xl" />
                <span class="text-sm">Browse Categories</span>
              </span>
              <i-icon icon="uim:angle-down" class="text-xl" />
            </div>
          </template>
          <template #content>
            <CategoriesList />
          </template>
        </wx-dropdown>

        <ul class="flex gap-4 app__nav">
          <li v-for="(item, idx) in filteredMenu" :key="idx">
            <span
              role="button"
              @click="menuFunc(item)"
              :class="[type === 'retailer' ? 'text-white' : 'text-black1 font-medium', routeName === item.identifier  ? 'router-link-exact-active' : '' ]"
              class="text-[14px] font-medium"
              >{{ item.label }}

              <!-- :class="[{ 'router-link-exact-active': route === 'home' }]" -->
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import CategoriesList from '@/components/UI/CategoriesList.vue'
export default {
  components: {
    CategoriesList
  },
  props: {
    contentBaseStyles: {
      type: String,
      default: ''
    },
    bodyBaseStyles: {
      type: String,
      default: 'text-white'
    },
    menuColor: {
      type: String,
      default: 'text-white'
    },
    isRetail: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      menu: [
        {
          label: 'Home',
          url: '/',
          isLink: true,
          name: ['retailer', 'wholesaler'],
          identifier: 'home'
        },
        {
          label: 'Retail',
          url: '/',
          isLink: false,
          name: ['retailer'],
          type: 'retailer',
          // identifier: ''
        },
        {
          label: 'Wholesale',
          url: '/',
          isLink: false,
          name: ['wholesaler'],
          type: 'wholesaler',

        },
        {
          label: 'Shop',
          url: '/shop',
          isLink: true,
          name: ['retailer', 'wholesaler'],
          identifier: 'shop'
        },
        {
          label: 'Vendor',
          url: '/stores',
          isLink: true,
          name: ['retailer', 'wholesaler'],
          identifier: 'stores'
        },
        {
          label: 'Adult Shop',
          url: '/adult-shop',
          isLink: true,
          name: ['retailer', 'wholesaler'],
          identifier: 'adult-shop'
        }
      ],
      open: false,
      retailBgColor: 'bg-black2',
      wholesaleBgColor: '',
      isActiveLink: true,
      isType: false,
    }
  },

  methods: {
    menuFunc(item) {
      item.isLink ? this.$router.push(item.url) : this.changeType(item.type)
    },

    changeType(item) {
      this.$store.commit('drawer/setType', item)
      console.log(item, 'ommmo')
    }
  },

  computed: {
    type() {
      return this.$store.getters['drawer/getType']
    },

    routeName() {
      return this.$route.meta.name
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
    },

    computed: {
      classArray() {
        return [this.isActive ? 'active-class' : '', this.hasError ? 'error-class' : '']
      }
    }
  }
}
</script>

<style>
.app__nav li span {
  position: relative;
}

.app__nav li span:after + .app__nav li span:hover {
  content: '';
  width: 100%;
  height: 2px;
  background-color: red;
  position: absolute;
  bottom: -4px;
  left: 0;
}

.app__nav li .router-link-exact-active::after {
  content: '';
  width: 100%;
  height: 3px;
  background-color: #fff;
  position: absolute;
  bottom: -4px;
  left: 0;
}

.app__nav li .router-link-exact-active::before {
  content: '';
  width: 100%;
  height: 3px;
  background-color: #fff;
  position: absolute;
  bottom: -4px;
  left: 0;
}

.app__nav li span::after {
  content: '';
  width: 100%;
  height: 3px;
  background-color: #fff;
  position: absolute;
  bottom: -5px;
  left: 0;
  transition: transform 0.2s;
  transform: scaleX(0);
  transform-origin: right;
}

.app__nav li span:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
</style>
