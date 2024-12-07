<template>
  <div>
    <div class="w-[300px] max-h-[500px] overflow-y-auto p-4">
      <div v-if="loading">
        <Skeleton v-for="item in 12" :key="item" height="2rem" class="mb-2"></Skeleton>
      </div>
      <ul class="p-0 flex flex-col gap-4" v-else>
        <li v-for="(item, idx) in categories" :key="idx">
          <div class="menu-item">
            <span
              role="button"
              @mouseover="handleHover(idx)"
              class="menu-item-link flex justify-between items-center w-full hover:bg-gray-100"
              @click="$router.push('/shop?category=' + item.slug)"
            >
              <div class="flex gap-2 items-center text-[13px]">
                <!-- <i-icon :icon="item.icon" v-if="item.icon" class="menu-item-icon" /> -->
                <img :src="imgUrl + item.icon_image" alt="" class="h-4 w-4 object-fit object-top" />
                <span class="flex flex-column capitalize">
                  <span>
                    {{ item.category_name }}
                  </span>
                </span>
              </div>

              <span v-if="item.sub_categories > 0">
                <i-icon
                  :icon="isHovered === idx ? 'prime:angle-down' : 'prime:angle-right'"
                  width="22px"
                />
              </span>
            </span>
            <div
              class="flex flex-col ml-6 gap-3 mt-2"
              v-if="isHovered == idx && item.sub_categories.length > 0"
            >
              <span role="button" class="" v-for="(data, idx) in item.sub_categories" :key="idx">
                <span class="sub-menu-items flex text-[13px] gap-2 items-center">
                  <img
                    :src="imgUrl + data.icon_image"
                    alt=""
                    class="h-4 w-4 object-fit object-top"
                  />
                  <span> {{ data.sub_category_name }} </span>
                </span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // categories: [],
      loading: false,
      isHovered: null
    }
  },
  methods: {
    handleHover(value) {
      this.isHovered = value
    }
  },

  computed: {
    categories() {
      return this.$store.getters['auth/getCategories']
    }
  }
}
</script>

<style></style>
