<template>
  <div class="bg-white p-6 rounded-md">
    <div class="mb-3">
      <!-- {{ user }} -->
      <img
        :src="user.photo !== null ? imgUrl + user.photo : image"
        class="w-12 h-12 rounded-full object-fit object-top"
      />
      <h6 class="leading-tight text-[13px] mt-3 text-gray-500">{{greeting}}</h6>
      <h4 class="font-semibold text-xl leading-tight">
        {{ `${user.first_name} ${user.last_name}` }}
      </h4>
    </div>
    <ul class="mt-6 flex flex-col">
      <li v-for="(item, idx) in tabs" :key="idx" @click="$router.push(item.url)">
        <a
          class="flex gap-3 p-3 items-center text-[13px] font-medium rounded-[7px]"
          role="button"
          :class="[
            item.identifier !== routeName
              ? 'hover:bg-gray-100'
              : type === 'retailer'
                ? 'bg-black3 text-white'
                : 'bg-gray-200'
          ]"
        >
          <span>
            <i-icon :icon="item.icon" />
          </span>
          <span>
            {{ item.label }}
          </span>
        </a>
      </li>
      <a
        class="flex gap-3 p-3 items-center text-error text-[13px] font-medium rounded-sm hover:bg-gray-100"
        role="button"
        @click="logout"
      >
        <span>
          <i-icon icon="ic:baseline-logout" />
        </span>
        <span> Logout </span>
      </a>
    </ul>
  </div>
</template>

<script>
import image from '@/assets/img/no-user.png'
export default {
  props: {
    tabs: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      image,
      currentTime: new Date()
    }
  },

  methods: {
    logout() {
      this.$swal
        .fire({
          title: 'Uhhhh! 😔',
          text: 'Are you sure you want to log out?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, logout!'
        })
        .then((result) => {
          console.log(result, 'kkk')
          if (result.isConfirmed) {
            this.userLogout()
          }
        })
    },

    userLogout() {
      this.$store.dispatch('auth/logout')
      this.$swal
        .fire({
          title: 'Woo hoo 😫',
          text: 'Logged out succesfully',
          icon: 'success',
          confirmButtonText: 'Ok!'
        })
        .then((result) => {
          console.log(result, 'kkk')
          if (result.isConfirmed) {
            this.$router.go()
          }
        })
    }
  },

  mounted() {
    // Update time every minute
    setInterval(() => {
      this.currentTime = new Date();
    }, 60000);
  },

  computed: {
    greeting() {
      const currentHour = this.currentTime.getHours();
      let greetingMessage = "";

      if (currentHour < 12) {
        greetingMessage = "Good Morning!";
      } else if (currentHour > 12 || currentHour < 18) {
        greetingMessage = "Good Afternoon!";
      } else {
        greetingMessage = "Good Evening!";
      }

      return greetingMessage;
    },
    user() {
      return this.$store.getters['auth/getUser']
    },
    routeName() {
      return this.$route.meta.name
    },

    type() {
      return this.$store.getters['drawer/getType']
    }
  }
}
</script>

<style></style>
