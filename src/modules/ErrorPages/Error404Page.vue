<template>
    <div
      class="h-screen flex flex-col justify-center items-center"
    >
      <img src="@/assets/img/404.svg" width="200" alt="" />
      <h6 class="mt-4">Page not Found or has been moved</h6>
      <div class="text-center mt-5">
        <button class="brand-btn brand-primary" @click="$router.go(-1)">
          Go Back
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style></style>
  