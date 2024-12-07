<template>
    <div>
      <div class="flex justify-between items-center">
        <div class="bg-gray-200 p-2 rounded-sm flex gap-2 w-fit">
          <span
            class="px-3 py-2 block text-sm capitalize w-fit rounded-sm font-semibold"
            role="button"
            @click="activateCurrentTab(item, idx)"
            v-for="(item, idx) in tabs"
            :key="idx"
            :class="{ 'bg-white': idx === activeTab }"
            >{{ item.title }}</span
          >
        </div>
        <div class="" v-if="$slots.rightSide">
          <slot name="rightSide"></slot>
        </div>
      </div>
  
      <div class="mt-4">
        <slot :activeTab="activeTab" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      tabs: {
        type: Array,
        default: () => [],
        required: true
      },
      currentTab: {
        default: 0,
        type: Number,
        required: false
      },
      currentName: {
        default: '',
        type: String
      }
    },
  
    data() {
      return {
        activeTab: 0,
        selectedIndex: 0,
        activeName: ''
      }
    },
  
    methods: {
      activateCurrentTab(value, index) {
        this.activeTab = index
        this.selectedIndex = index
        this.activeName = value.name
      }
    },
  
    watch: {
      currentTab: {
        handler: function (val) {
          this.activeTab = val
          this.selectedIndex = val
        },
        immediate: true,
        deep: true
      }
    }
  }
  </script>
  
  <style></style>
  