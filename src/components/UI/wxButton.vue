<template>
  <div>
    <button>
      <slot />
    </button>

    <button
      @click="$emit('buttonClick')"
      class="brand-btn w-full"
      :disabled="disabled"
      :class="[
        isLoading ? 'bg-gray400 text-gray600' : meta ? 'brand-primary' : 'bg-gray400 text-gray600'
      ]"
    >
      Log In
    </button>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
