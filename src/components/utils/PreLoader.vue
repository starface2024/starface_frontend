<template>
    <div v-if="visible" class="preloader">
      <!-- Your preloader animation or image here -->
      Loading...
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        visible: true,
      };
    },
    methods: {
      hide() {
        this.visible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    z-index: 9999;
  }
  </style>
  