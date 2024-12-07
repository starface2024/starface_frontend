<template>
  <div>
    <div class="flex lg:flex-row md:flex-row flex-col gap-4 lg:w-4/12 md:w-4/12 w-full">
      <Dropdown
        v-model="category"
        :options="categories"
        optionLabel="category_name"
        placeholder="All Categories"
        class="w-full"
      />
      <!-- <Dropdown
        v-model="sort_type"
        :options="sorting"
        optionLabel="name"
        placeholder="Default Sorting"
        class="w-full"
      /> -->
    </div>
  </div>
</template>

<script>
export default {
  // categorySlug
  props: {
    childState: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      categories: [],
      sorting: [
        {
          name: 'Default Sorting',
          action: ''
        },
        {
          name: 'Sort By Average Rating',
          action: 'avg-rating'
        },
        {
          name: 'Sort By Latest',
          action: 'latest'
        },
        {
          name: 'Sort by Price: Low to High',
          action: 'cheapest-products'
        },
        {
          name: 'Sort by Price: High to Low',
          action: 'expensive-products'
        }
      ],
      category: null,
      sort_type: ''
    }
  },

  methods: {
    getAllCategories() {
      this.loading = true
      this.$config
        .getCategories()
        .then((res) => {
          console.log(res, 'actual')
          this.categories = res.categories
        })
        .catch((err) => {
          return err
        })
        .finally(() => {
          this.loading = false
        })
    }
  },

  created() {
    this.getAllCategories()
  },

  watch: {
    category: {
      handler(val) {
        if (val) {
            this.$emit('categoryProductsFilter', val)
          this.$router.replace({
            query: {
              category: val.slug
            }
          })
        }
      },
      immediate: true
    },

    sort_type: {
      handler(val) {
        if (val) {
            // this.$emit('categoryProductsFilter', val)
          this.$router.replace({
            query: {
              category: val.action
            }
          })
        }
      },
      immediate: true
    },

    childState: {
      handler(val) {
        if (val) {
          this.category = null
          this.$router.replace({
            query: {}
          })
          this.$emit('updateChildState')
        }
      },
      immediate: true
    }
  }
}
</script>

<style></style>
