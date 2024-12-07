<template>
  <div class="">
    <div class="flex gap-5 justify-center lg:flex-row md:flex-row flex-col">
      <div class="flex gap-4 items-center" v-for="(item, idx) in tabs" :key="idx">
        <span class="flex items-center gap-2">
          <span
            :class="[
              routeName === item.identifier
                ? 'border-primary text-primary'
                : +getIdOfCurrentActive+1 > idx
                  ? 'border-primary bg-primary text-white'
                  : 'text-gray-300 border-gray-300'
            ]"
            class="border text-regular w-8 h-8 flex items-center justify-center rounded-full"
          >
            <i-icon
              v-if="+getIdOfCurrentActive+1 > idx"
              icon="iconamoon:check-duotone"
              class="text-2xl"
            />
            <span v-else class="text-lg">{{ idx + 1 }}</span>
          </span>

          <span>
            <h5
              class="text-[18px] font-bold mb-0"
              :class="[
                routeName === item.identifier
                  ? 'text-black3'
                  : getIdOfCurrentActive > idx
                    ? 'text-black3'
                    : 'text-gray-400'
              ]"
            >
              {{ item.label }}
            </h5>
          </span>
        </span>
        <span
          class="h-[2px] lg:block md:block hidden w-12"
          :class="[
            routeName === item.identifier
              ? 'bg-primary'
              : getIdOfCurrentActive > idx
                ? 'bg-primary'
                : 'bg-gray-300'
          ]"
          v-if="tabs.length > idx + 1"
        >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {}
  },

  computed: {
    routeName() {
      return this.$route.name
    },

    getIdOfCurrentActive() {
      var activeIndex = this.tabs.findIndex((item) => this.routeName === item.identifier)
      return activeIndex
    },

    currentType() {
      const activeIndex = this.$route.query.assessment_type
      return activeIndex
    }
  }
}
</script>
