<template>
  <div>
    <footer class="footer" :class="[type === 'retailer' ? 'bg-black2' : 'bg-gray-200']">
      <div
        class="container py-12"
        :class="[type === 'retailer' ? 'text-white' : 'text-black1 font-medium']"
      >
        <div class="footer--top">
          <div class="grid lg:grid-cols-5 md:grid-cols-5 grid-cols-1 gap-4">
            <div class="mb-3">
              <img src="@/assets/img/logo.svg" width="150" alt="" />
              <h4 class="footer--header mt-3">
                <a
                  href="mail-to:support@warehauze.com"
                  class="text-sm font-regular"
                  style="font-size: 20px"
                  >support@warehauze.com</a
                >
              </h4>
              <div class="mt-3">
                <h6 class="text-sm">Social Media</h6>
                <div class="flex mt-2 gap-2">
                  <a target="_blank" href="https://youtube.com/@Warehauze?si=68RZle35yZ4ePRJ1">
                    <i
                      class="fa fa-youtube-play text-danger"
                      style="font-size: 15px"
                      aria-hidden="true"
                    ></i>
                  </a>
                  <a target="_blank" href="https://twitter.com/warehauze">
                    <i
                      class="fa fa-twitter text-info"
                      style="font-size: 15px"
                      aria-hidden="true"
                    ></i>
                  </a>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/profile.php?id=61550545545385&mibextid=ZbWKwL"
                  >
                    <i
                      class="fa fa-facebook text-primary"
                      style="font-size: 15px"
                      aria-hidden="true"
                    ></i>
                  </a>
                  <a
                    target="_blank"
                    href="https://instagram.com/official_warehauze?igshid=MzNINGNkZWQ4Mg=="
                  >
                    <i
                      class="fa fa-instagram text-danger"
                      style="font-size: 15px"
                      aria-hidden="true"
                    ></i>
                  </a>
                  <a target="_blank" class="text-white" href="http://tiktok.com/@warehauze">
                    <i-icon icon="ic:baseline-tiktok" width="18px" />
                  </a>
                </div>
              </div>
            </div>

            <div class="">
              <h4 class="footer--header">COMPANY</h4>
              <ul class="list-unstlyed">
                <!-- <li><router-link to="/privacy-policy"> About Us</router-link></li> -->
                <li>
                  <router-link to="/privacy-policy"> Privacy Policy</router-link>
                </li>
                <li>
                  <router-link to="/terms-and-conditions">Terms and Conditions</router-link>
                </li>
                <li><router-link to="/careers">Careers</router-link></li>
              </ul>
            </div>

            <div class="">
              <h4 class="footer--header">MY ACCOUNT</h4>
              <ul class="list-unstlyed">
                <li><router-link to="/cart">View Cart</router-link></li>
                <li><router-link to="/login">Sign In</router-link></li>
                <li>
                  <router-link to="/user/wishlist">My Wishlist</router-link>
                </li>
              </ul>
            </div>

            <div class="lg:col-span-2 md:col-span-2 ">
              <h4 class="footer--header">Subscribe to Newsletter</h4>
              <div class="flex lg:flex-row flex-col relative mt-4">
                <input
                  v-model="email"
                  type="email"
                  class="bg-[#FFFFFF]/[8%] outline-none p-4 lg:py-2 lg:px-4 px-12 border-[1px] lg:mb-0 mb-4 text-sm rounded-md w-full lg:rounded-r-none"
                  placeholder="Your email"
                />
                <button
                  @click="onFinish"
                  :disabled="loading"
                  :class="[loading ? 'bg-gray-300' : 'bg-primary' ]"
                  class="px-8 md:px-4 py-4 text-gray-100 text-[14px] font-normal rounded-[7px] lg:rounded-l-none"
                >
                  <span>Submit</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="footer--copyright">
          <hr class="w-6/12 mx-auto bg-secondary my-4" />
          <p class="text-center text-sm">
            Copyright {{ thisYear }} © warehauze. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      email: ''
    }
  },

  methods: {
    onFinish() {
      alert('Hello')
      let payload = {
        email: this.email,
        newsletter_id: 'c5d37ef1-db76-449d-8379-ae91237c1296'
      }
      this.$config.subscribeToNewsletter(payload)
      .finally(()=> {
        this.email = ""
      })
    }
  },

  computed: {
    thisYear() {
      const yearToday = new Date().getFullYear()
      return yearToday
    },
    type() {
      return this.$store.getters['drawer/getType']
    }
  }
}
</script>

<style>
.footer--header {
  /* color: var(--gray-400); */
  font-size: 13px;
  text-decoration: underline;
  font-weight: bold;
}

.footer ul li a {
  font-size: 13px;
  font-weight: 500;
}
</style>
