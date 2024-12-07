<template>
  <div>
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 gap-4 mt-4">
          <div v-for="item in 8" :key="item">
            <el-skeleton-item variant="image" style="height: 250px; border-radius: 10px" />
          </div>
        </div>
      </template>
      <template #default>
        <div>
          <div class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-4">
            <div v-for="(item, idx) in products" :key="idx">
              <div class="img-services1 rounded-md">
                <div class="ribbon" v-if="item.availability !== 'in-stock'">
                  <span class="ribbon__content font-semibold text-[12px]">sold out</span>
                </div>
                <div>
                  <span class="percentage" v-if="item.discount !== undefined && item.discount !== null">
                    {{ `${item.discount.percentage}% OFF` }}
                  </span>
                  <img :src="imgUrl + item.app_icon" alt="" role="button" @click="viewProduct(item)" />
                </div>
                <div class="middle text-center">
                  <div class="flex items-center justify-around px-1 py-2">
                    <span
                      role="button"
                      @click="cart_item(item) ? cartFunc(item, 'remove') : cartFunc(item, 'add')"
                    >
                      <i-icon
                        :icon="
                          !cart_item(item)
                            ? 'material-symbols:shopping-cart-outline'
                            : 'material-symbols:shopping-cart'
                        "
                        style="font-size: 22px"
                        :class="[cart_item(item) ? 'text-primary' : '']"
                      />
                    </span>

                    <span
                      role="button"
                      @click="
                        wishlist_item(item)
                          ? wishlistFunc(item, 'remove')
                          : wishlistFunc(item, 'add')
                      "
                    >
                      <i-icon
                        :icon="!wishlist_item(item) ? 'icon-park-outline:like' : 'wpf:like'"
                        style="font-size: 22px"
                        :class="[wishlist_item(item) ? 'text-primary' : '']"
                      />
                    </span>

                    <span role="button" @click="viewProduct(item)">
                      <i-icon icon="ri:search-line" style="font-size: 20px" />
                    </span>
                  </div>
                </div>
              </div>
              <div class="text-center mt-2">
                <h6
                  role="button"
                  class="text-black1 capitalize text-md font-semibold"
                  @click="viewProduct(item)"
                >
                  {{ item.name }}
                </h6>
                <div class="flex items-center m-0 justify-center gap-1">
                  <Rating
                    v-model="item.avg_ratings"
                    :cancel="false"
                    readonly
                    class="text-amber-600"
                  />
                  <small class="text-xs">
                    {{ '(' + item.reviews.length + ' reviews)' }}
                  </small>
                </div>
                <div class="text-center flex flex-col ">
                  <span v-if="item.discount" class="text-black1 font-bold text-md block leading-tight">
                      {{ $currencyFormat(item.discount.price) }}
                    </span>
                    <span
                      class="block leading-tight"
                      :class="[item.discount ? 'text-gray-500 line-through font-regular text-sm': 'text-black1 font-bold' ]"
                    >
                      {{ $currencyFormat(item.price) }}
                    </span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="!loading && products.length === 0">
            <span class="block border-dashed text-sm text-error border-error p-3 border rounded-lg"
              >No Product found</span
            >
          </div>
          <!-- <div class="flex justify-end">
            <wxPagination :meta="meta" @next="filter($event)" />
          </div> -->
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    viewProduct(item) {
      return this.$router.push(`/product/${item.slug}/view`)
    },

    cartFunc(e, value) {
      const payload = {
        product_id: e.id,
        quantity: 1
      }
      if (value === 'add') {
        this.$customer.addToCart(payload).then(() => {
          this.getUser()
        })
      } else {
        const cartItems = this.user.cart
        const val = cartItems.find((elem) => e.id === elem.product_id)
        console.log(val, 'omooo')
        this.$customer.removeFromCart(val.id).then(() => {
          this.getUser()
        })
      }
    },

    getUser() {
      this.$auth
        .getProfile()
        .then((res) => {
          console.log(res)
          this.$store.commit('auth/setUser', res.user)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    wishlistFunc(e, value) {
      const payload = {
        product_id: e.id
      }
      if (value === 'add') {
        this.$customer.addToWishlist(payload).then(() => {
          this.getUser()
        })
      } else {
        const wishlist = this.user.wish_lists
        const val = wishlist.find((elem) => e.id === elem.product_id)
        console.log(val, 'omooo')
        this.$customer.removeFromWishlist(val.id).then(() => {
          this.getUser()
        })
      }
    },

    cart_item(item) {
      const token = this.$store.getters['auth/getAuthenticated']
      if (token) {
        const cartItems = this.user.cart
        const val = cartItems.filter((elem) => item.id === elem.product_id)
        const result = val.length !== 0
        return result
      } else {
        return false
      }
    },

    wishlist_item(item) {
      const token = this.$store.getters['auth/getAuthenticated']
      if (token) {
        const wishlistItems = this.user.wish_lists
        const val = wishlistItems.filter((elem) => item.id === elem.product_id)
        const result = val.length !== 0
        return result
      } else {
        return false
      }
    }
  },

  beforeMount() {
  },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style>
.middle {
  opacity: 0;
  background-color: #fff;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-bottom: 15px;
  width: 80%;
  margin: 0 auto;
  position: absolute;
  left: 10%;
  bottom: 5%;
  color: #000;
}

.img-services1:hover .middle {
  opacity: 1;
  transition: 0.4s;
}

.img-services1:hover img {
  transform: scale(1.05);
}

.middle .icon:hover,
.middle i:hover {
  color: var(---secondary-color) !important;
}

.img-services1 {
  width: 100%;
  height: 250px;
  background-color: #fff;
  /* border-radius: 10px; */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.img-services1 .percentage {
  position: absolute;
  background-color: var(---secondary-color);
  top: 3%;
  left: 3%;
  border-radius: 4px;
  color: #fff;
  padding: 0.1rem 0.8rem;
  font-size: 14px;
  font-weight: 500;
}

.img-services1 img {
  max-width: 100px;
  height: auto;
  object-fit: contain;
  object-position: center;
  display: block;
  margin: 0 auto;
}

.img-services1:hover:before {
  content: '';
  position: absolute;
  height: 100px;
  width: 100px;
  top: 0;
  left: 0;
  background-color: red;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.product--image {
  height: 200px;
  width: 100%;
  object-position: center;
  object-fit: cover;
}

.ribbon {
    position: absolute;
    top: 5px;
    right: 0;
    background: linear-gradient(90deg, var(---primary-color), var(---black3));
    color: #fff;
    padding: 0.3rem;
    font-size: 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    border-radius: 5px 0 0 5px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
}
</style>
