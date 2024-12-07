<template>
  <div>
    <div class="mb-5" v-if="$slots.tableHeader">
      <slot name="tableHeader"></slot>
    </div>

    <DataTable :value="items" :loading="busy" stripedRows showGridlines>
      <template #Loading>
        <div v-if="busy">Loading</div>
      </template>

      <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
        <template #body="{ data, field }">
          <template v-if="field === 'action'">
            <el-dropdown trigger="click">
              <span role="button">
                <i-icon icon="lucide:ellipsis" />
              </span>
              <template #dropdown>
                <div class="w-[120px] py-3">
                  <span
                    class="w-full block py-1 px-4 hover:bg-gray-100 capitalize"
                    v-for="dropdown in dropdownItems"
                    :key="dropdown"
                    :class="{ 'text-red-600': dropdown === 'delete' }"
                    role="button"
                    @click="$emit(dropdown, data)"
                    >{{ dropdown.split('_').join(' ') }}</span
                  >
                </div>
              </template>
            </el-dropdown>
          </template>
          <template v-else-if="field === 'product_name'">
            <span class="flex items-center gap-2">
              <img
                :src="imgUrl + data.app_icon"
                class="w-8 h-8 rounded-full object-fit object-top"
              />
              <span class="font-semibold text-md block whitespace-nowrap">
                {{ data.name }}
              </span>
            </span>
          </template>
          <template v-else-if="field === 'product_price'">
            <span>
              {{ $currencyFormat(data.price) }}
            </span>
          </template>
          <template v-else-if="field === 'customer_name'">
            <span>
              {{ `${data.buyer.first_name} ${data.buyer.last_name}` }}
            </span>
          </template>
          <template v-else-if="field === 'total_amount'">
            <span>
              {{ $currencyFormat(data.total_amount) }}
            </span>
          </template>
          <template v-else-if="field === 'amount'">
            <span>
              {{ $currencyFormat(data.amount) }}
            </span>
          </template>
          <template v-else-if="field === 'charge'">
            <span>
              {{ $currencyFormat(data.charge) }}
            </span>
          </template>
          <template v-else-if="field === 'availability'">
            <span class=" w-fit" :class="data.availability">
              {{ data.availability.split('-').join(' ') }}
            </span>
          </template>

          <template v-else-if="field === 'status'">
            <span :class="data.status">
              {{ data.status }}
            </span>
          </template>
          <template v-else-if="field === 'tableBtn'">
            <div class="flex justify-end">
              <button class="brand-btn brand-primary" @click="$emit('btnClick', data)">View</button>
            </div>
          </template>
          <template v-else-if="field === 'is_registered'">
            <span :class="data.is_registered ? 'registered' : 'not-registered'">
              {{ data.is_registered ? 'registered' : 'not registered' }}
            </span>
          </template>
          <template v-else-if="field === 'created_at'">
            <span class="break-keep block w-full">
              {{ $formatDate(data.created_at) }}
            </span>
          </template>
          <template v-else-if="field === 'updated_at'">
            <span class="break-keep block w-full">
              {{ $formatDate(data.created_at) }}
            </span>
          </template>
          <template v-else>
            {{ data[field] }}
          </template>
        </template>
      </Column>

      <template #empty> No data found. </template>
    </DataTable>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },

    columns: {
      type: Array,
      default: () => []
    },

    busy: {
      type: Boolean,
      default: false
    },

    dropdownItems: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>
.p-datatable .p-datatable-thead > tr > th {
  background: var(--gray-200);
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
  color: var(--gray-600);
}

.p-datatable .p-datatable-tbody > tr > td {
  font-size: 13px;
}

.p-column-title {
  font-weight: 600;
}

.p-progressbar-determinate .p-progressbar-value,
.p-progressbar {
  height: 10px;
  border-radius: 6px;
}

.p-progressbar .p-progressbar-value {
  background: var(---success-500);
}
</style>
