<template>
  <main>
    <component :is="layout">
      <RouterView />
    </component>
  </main>
</template>

<script setup>
import Default from '../src/layouts/default.vue'
import Auth from '../src/layouts/auth.vue'
import Dashboard from '../src/layouts/dashboard.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()

const layout = computed(() => {
  if (route.meta.layout == 'Auth') {
    return Auth
  } else if (route.meta.layout == 'Dashboard') {
    return Dashboard
  }  else {
    return Default
  }
})
</script>

<style scoped></style>