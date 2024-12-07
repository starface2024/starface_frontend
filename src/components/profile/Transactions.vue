<template>
  <div>
    <h4 class="font-semibold mb-2">Recent Transactions</h4>
    <el-skeleton :loading="loading" animated>
      <template #template>
        <div class="flex flex-col gap-4">
          <div v-for="item in 6" :key="item">
            <el-skeleton-item variant="image" style="height: 80px; border-radius: 10px" />
          </div>
        </div>
      </template>
      <template #default>
        <div>
          <div class="flex flex-col gap-4">
            <div
              v-for="(item, idx) in items"
              :key="idx"
              class="shadow p-3 flex justify-between rounded-[6px] gap-4"
            >
              <div class="flex gap-2">
                <span
                  class="h-8 w-8 flex items-center justify-center font-weight-bold rounded"
                  :class="[item.transaction_type === 'CREDIT' ? 'bg-green-100' : 'bg-red-100']"
                >
                  <i-icon
                    :icon="
                      item.transaction_type === 'CREDIT' ? 'carbon:arrow-down' : 'iconoir:arrow-tr'
                    "
                  />
                </span>
                <span class="flex flex-col">
                  <span class="font-semibold text-[12px] break-word">
                    {{ `${item.transaction_type} #${item.transaction_id}` }}
                    <span class="break-all">
                      {{ item.note !== '' ? `~ ${item.note}` : '' }}
                    </span>
                  </span>
                  <span class="text-xs font-medium" v-html="item.date_time"> </span>
                </span>
              </div>
              <div class="flex flex-col items-end">
                <span class="text-sm font-semibold">
                  {{ item.amount + ' ' + item.wallet_symbol }}
                </span>
                <span class="text-xs text-uppercase">{{ item.wallet_id }}</span>
              </div>
            </div>
          </div>
          <div class="flex justify-between mt-3">
            <button
              class="brand-btn text-[12px] py-[6px]"
              @click="changePage('prev')"
              :disabled="meta.current_page === 1"
              :class="[meta.current_page === 1 ? 'bg-gray-300' : 'brand-primary']"
            >
             ({{ +page - 1 }}) &laquo; previous 
            </button>
            <div class="self-end">
              <button
                class="brand-btn text-[12px] py-[6px]"
                :disabled="meta.last_page === meta.current_page"
                :class="[meta.last_page === meta.current_page ? 'bg-gray-300' : 'brand-primary']"
                @click="changePage('next')"
              >
                next &raquo; ({{ +page + 1 }})
              </button>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActiveItem: null,
      loading: false,
      items: [],
      meta: {},
      page: 1
    }
  },

  methods: {
    getTxnHistory() {
      this.loading = true
      let payload = {
        user_id: this.user.user_id,
        page_no: this.page,
        per_page: 5
      }
      this.$appDomain
        .getTransactions(payload)
        .then((res) => {
          this.items = res.data
          this.meta = res.meta.pagination
        })
        .finally(() => {
          this.loading = false
        })
    },

    changePage(value) {
      if (value === 'prev') {
        this.page--
      } else {
        this.page++
      }
    }
  },

  beforeMount() {
    this.getTxnHistory()
  },

  watch: {
      page(oldVal, newVal) {
        if (oldVal !== newVal) {
          this.getTxnHistory();
        }
      },
    },

  computed: {
    user() {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>

<style></style>
