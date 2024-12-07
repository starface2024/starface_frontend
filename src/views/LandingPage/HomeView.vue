<template>
  <div class="hero-section tw-flex tw-h-screen">
    <div class="tw-w-full left-side"></div>
    <div class="tw-w-full">
      <div class="tw-flex tw-flex-col tw-justify-between tw-items-center tw-px-8 tw-py-2">
        <router-link to="/">
          <img src="@/assets/logo.svg" alt="" class="tw-h-12" />
        </router-link>
        <ul class="tw-flex tw-items-center tw-gap-4 tw-mt-4">
          <li v-for="(item, i) in items" :key="i">
            <span class="tw-font-normal tw-uppercase tw-text-sm" :href="item.href">{{
              item.label
            }}</span>
          </li>
        </ul>
      </div>

      <div class="tw-px-8 tw-py-2">
        <h1 class="tw-font-extrabold tw-text-[50px] tw-leading-tight">Emmanuel <br />Michael</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const items = ref([
  {
    label: 'home',
    href: '#home'
  },
  {
    label: 'about',
    href: '#about'
  },
  {
    label: 'projects',
    href: '#projects'
  },
  {
    label: 'skills',
    href: '#skills'
  },
  {
    label: 'get in touch',
    href: '#get-in-touch'
  }
])
</script>

<style scoped>
.left-side {
  background: url('@/assets/img/image.webp');
  height: 100vh;
  background-position: center;
  background-size: cover;
}
</style>
