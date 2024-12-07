<template>
  <wx-top-menu />
  <wx-search-bar  />
  <wx-menu-items class="hidden md:block lg:block"/>
</template>

<script>
import wxTopMenu from '@/components/navigation/UI/wxTopMenu.vue'
import wxSearchBar from '@/components/navigation/UI/wxSearchBar.vue'
import wxMenuItems from '@/components/navigation/UI/wxMenuItems.vue'
export default {
    components: {
        wxTopMenu,
        wxSearchBar,
        wxMenuItems
    }
}
</script>

<style>

</style>