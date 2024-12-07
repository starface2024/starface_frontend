<template>
  <div class="bottom-nav">
    <div class="flex justify-between h-full w-full items-center container">
      <ul class="flex items-center w-full justify-between h-full mb-0">
        <li
          class=""
          :class="[routeParent === item.parent ? 'text-primary activeNav' : '']"
          v-for="(item, idx) in menu"
          :key="idx"
        >
          <span
            role="button"
            class="flex flex-col items-center gap-1 w-full text-sm font-semibold"
            @click="routeClick(item)"
          >
            <span>
              <i-icon :icon="item.icon" class="text-xl" />
            </span>
            <span class="font-medium text-[12px] capitalize">
              {{ item.title }}
            </span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    routeClick(item) {
      console.log(item)
      this.$emit('routeClick', item)
    }
  },

  computed: {
    routeName() {
      return this.$route.meta.name
    },
    
    routeParent() {
      return this.$route.meta.parent
    }
  }
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  display: flex;
  display: inline-flex;
  display: -webkit-flex;
  align-items: flex-end;
  direction: ltr;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  height: 64px;
  background: #fff;
  padding: 0 20px;
  border-radius: 10px 10px 0 0;
  /* box-shadow: 0 0 5px 0 #eee; */
}
</style>
