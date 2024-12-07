<template>
  <div>
    <img :src="imgSrc" class="rounded-lg w-full" alt="" />
  </div>
</template>

<script>
import retail from '@/assets/img/retail.png'
import wholesale from '@/assets/img/wholesale.png'

export default {
  data() {
    return {
      retail,
      wholesale
    }
  },
  computed: {
    imgSrc() {
      let imgSrc = this.type === 'retailer' ? retail : wholesale
      return imgSrc
    },
    type() {
      return this.$store.getters['drawer/getType']
    }
  }
}
</script>

<style></style>
