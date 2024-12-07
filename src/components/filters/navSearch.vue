<template>
  <div>
    <wx-dropdown>
      <template #trigger>
        <div
          role="button"
          class="flex justify-between items-center text-white el-dropdown-link bg-primary py-4 px-3 w-[200px]"
        >
          <span class="flex gap-3 items-center">
            <i-icon icon="ic:baseline-menu" class="text-2xl" />
            <span class="text-sm">{{ selected }}</span>
          </span>
          <i-icon icon="uim:angle-down" class="text-xl" />
        </div>
      </template>
      <template #content>
        <div class="flex flex-col gap-3 w-[200px] h-[300px] overflow-y-auto pt-3">
          <span class="px-3" role="button"> All Categories </span>
          <span v-for="(item, idx) in categories" :key="idx" @click="getCategory(item)" class="px-3" role="button">
            {{ item.category_name }}
          </span>
        </div>
      </template>
    </wx-dropdown>
    <input class="input" placeholder="Search Stores" v-model="name" type="text" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      name: '',
      selected: 'all-categories',
      products: []
    }
  },

  methods: {
    getCategory(item) {
        console.log(item, 'ommmmmo')
        // this.$config.getCategory(item.slug)
        // .then((res)=> {
        //     console.log(res, 'ommmmmo')
        // })
    },
    
    // getProducts(){
    //     let type = this.type
    //     let url = 'all-products'
    //     this.$product
    //       .getProducts({ url, type, page })
    //       .then((res) => {
    //         this.items = res.all_products.data
    //         console.log(this.items)
    //         console.log(res)
    //       })
    //   }
  },

  computed: {
    categories() {
      return this.$store.getters['auth/getCategories']
    }
  }
}
</script>

<style></style>

<!-- searchProduct () {
    console.log(this.searchValue)
    if (this.searchValue === 'All Categories') {
      this.products = this.allProducts.filter((item) => {
        return this.search
          .toLowerCase()
          .split(' ')
          .every(
            (v) =>
              item.name.toLowerCase().includes(v)
          )
      })
    } else {
      this.$store.dispatch('showcase/getCategoryById', this.searchValue)
      this.products = this.category_products.filter((item) => {
        return this.search
          .toLowerCase()
          .split(' ')
          .every(
            (v) =>
              item.name.toLowerCase().includes(v)
          )
      })
    }
  } -->
