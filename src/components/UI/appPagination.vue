<template>
    <div>
      <div class="flex items-center w-full  gap-4 mt-4">
        <button
          class="mr-3 brand-btn brand-primary border-none py-1"
          @click="nextPage((page = 1))"
          :disabled="meta.current_page === 1"
          :class="{'bg-gray-400': meta.current_page === 1}"
        >
          First
        </button>
  
        <a
          class="text-black"
          role="button"
          @click="nextPage(meta.current_page - 1)"
          v-if="meta.current_page > 1"
        >
          &laquo;
        </a>
  
        <ul class="flex paged items-center m-0 pl-0 gap-3">
          <li v-for="page in meta.last_page" :key="page">
            <a
              role="button"
              class="mr-3 text-black font-[500]"
              @click.prevent="nextPage(page)"
              :class="{ 'current': meta.current_page === page }"
              v-if="
                Math.abs(page - meta.current_page) < 5 ||
                page === 10 ||
                page == meta.last_page - 1 ||
                page == 0
              "
            >
              {{ page }}
            </a>
          </li>
        </ul>
  
        <!-- <div class=" ml-3">
                   <span> Page {{meta.current_page}} </span> of <span> {{ meta.last_page }} </span>
                 </div> -->
  
        <a
          class="text-black"
          role="button"
          @click="nextPage(meta.current_page + 1)"
          v-if="meta.current_page !== meta.last_page"
        >
          &raquo;
        </a>
  
        <button
          class="ml-3 brand-btn brand-primary py-1 border-none"
          @click="nextPage(meta.last_page)"
          :disabled="meta.current_page === meta.last_page"
          :class="{'bg-gray-400': meta.current_page === meta.last_page}"
        >
          Last
        </button>
      </div>
    </div>
  </template>
  
  <script>
  // import helpers from '@/helpers/index.js'
  export default {
    props: ["meta"],
    data() {
      return {
        // pages: {},
        // page: this.$route.query.page,
      };
    },
    methods: {
      nextPage(page) {
        this.$emit("next", page);
      },
    },
    async created() {
      // this.getPages();
    },
  };
  </script>
  
  <style>
  .paged a.first::after {
    content: "...";
  }
  
  .paged a.last::before {
    content: "...";
  }
  
  .current {
      background: var(---primary-color);
      height: 30px;
      border-radius: 50%;
      width: 30px;
      display: flex;
      display: -ms-flexbox;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      color: #fff !important;
  }
  </style>