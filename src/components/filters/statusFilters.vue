<template>
  <div>
    <div class="flex items-center lg:flex-row gap-4 md:flex-row flex-col justify-between">
      <div>
        <slot name="header" />
      </div>
      <Dropdown
        v-if="hasFilter"
        v-model="status"
        :options="statusList"
        optionLabel=""
        placeholder="Filter Status"
        class=""
        @change="$emit('statusFunc', status)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    statusList: {
      type: Array,
      default: () => []
    },
    hasFilter: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      status: ''
    }
  }
}
</script>

<style></style>
