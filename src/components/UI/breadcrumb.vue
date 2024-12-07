<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb flex gap-3">
        <li class="breadcrumb-item capitalize text-[13px] text-gray-400" :class="[ breadcrumb.isCurrent ? 'font-bold text-primary' : 'font-regular' ]" v-for="(breadcrumb, index) in breadcrumbs" :key="index">
          <router-link v-if="breadcrumb.isUrl" :to="breadcrumb.link">{{
            breadcrumb.text.split('-').join(' ')
          }}</router-link>
          <span v-else>{{ breadcrumb.text.split('-').join(' ') }}</span>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      let matched = this.$route.matched
      let name = this.$route.name
      console.log(matched, 'ommmo')
      let breadcrumbs = [
        {
          text: 'home',
          link: '/',
          isUrl: true,
          isCurrent: false
        },
        {
          text: name,
          link: '/',
          isUrl: false,
          isCurrent: false
        }
      ]
      let path = ''

      console.log(matched)

      matched.forEach((route) => {
        path += route.path
        let breadcrumb =
          typeof route.meta.breadcrumb === 'function'
            ? route.meta.breadcrumb(this.$route)
            : route.meta.breadcrumb

        if (breadcrumb) {
          breadcrumbs.push({
            text: breadcrumb,
            link: path === this.$route.path ? null : path,
            isUrl: false,
            isCurrent: true
          })
        }
      })

      return breadcrumbs
    }
  }
}
</script>

<style>
.breadcrumb-item:not(.breadcrumb-item:last-child):after {
    content: ">";
    margin-left: 10px
}
</style>
