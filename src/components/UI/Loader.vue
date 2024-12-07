<template>
    <div class="fixed w-full bg-[rgba(0,0,0,0.6)] h-screen top-0 left-0 z-30 flex items-center justify-center">
      <div class="">
      <div class="flex flex-col items-center">
        <i-icon icon="line-md:loading-twotone-loop" class="text-[80px] text-primary" />
        <span class="font-sm font-medium text-white">
          {{ loaderText }}
        </span>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      loaderText: {
        type: String,
        default: 'Loading...'
      }
    }
  }
  </script>
  
  <style></style>
  