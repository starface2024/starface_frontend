<template>
  <div>
    <el-dropdown trigger="click" class="">
      <slot name="trigger" />
      <template #dropdown>
       <slot name="content" />
      </template>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    
  },

  beforeMount() {
  }
}
</script>

<style></style>
