import './assets/css/main.css'
import { createApp } from 'vue'

// import { createPinia } from 'pinia'

import store from './store'

import axios from 'axios'

// import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
// import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'toastify-js/src/toastify.css'

// Main APP Request
import $request from '@/axios/index'

// Config
import config from '@/axios/config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

import VueSweetAlert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import { Icon } from '@iconify/vue'
app.component('i-icon', Icon)

import QrcodeVue from 'qrcode.vue'
app.component('QRCodeVue', QrcodeVue)

import VueClipboard from 'vue3-clipboard'

import QrReader from 'vue3-qr-reader'

import toastify from 'toastify-js'
app.config.globalProperties.$toastify = toastify

import VueCountdown from '@chenfengyuan/vue-countdown'
app.component(VueCountdown.name, VueCountdown)

import MainTab from '@/components/utils/MainTab.vue'
app.component('MainTab', MainTab)

import Pin from '@/components/utils/pin.vue'
app.component('pin', Pin)

import wxButton from '@/components/UI/wxButton.vue'
app.component('wxButton', wxButton)

import { Form, Field, ErrorMessage } from 'vee-validate'
app.component('vForm', Form)
app.component('vField', Field)
app.component('ErrorMessage', ErrorMessage)

import VueSelect  from "vue-select";
app.component("vSelect", VueSelect)
import "vue-select/dist/vue-select.css";

import Vue3FormWizard from 'vue3-form-wizard'
import 'vue3-form-wizard/dist/style.css'
app.use(Vue3FormWizard)

import { FormWizard, TabContent } from 'vue3-form-wizard'

app.component('FormWizard', FormWizard)
app.component('TabContent', TabContent)

import { defineRule } from 'vee-validate'

defineRule('required', (value) => {
  if (!value || !value.length) {
    return `This field is required`
  }
  return true
})

defineRule('email', (value) => {
  // Field is empty, should not pass
  if (!value) {
    return 'This field is required'
  }
  // Check if email
  let regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  if (!regex.test(value)) {
    return 'This field must be a valid email'
  }
  return true
})

defineRule('termsValidation', (value) => {
  if (value) {
    return true
  }
  return 'You have to accept the tems and conditions to continue'
}),
  defineRule('minLength', (value, [limit]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true
    }
    if (value.length < limit) {
      return `This field must be at least ${limit} characters`
    }
    return true
  })

import image from '@/assets/img/icons/profile_avatar.png'
import placeholder from '@/assets/img/icons/placeholder-image.png'

app.config.globalProperties.$avatar = image
app.config.globalProperties.$placeholder = placeholder

app.config.globalProperties.imgUrl = config.imgUrl
app.config.globalProperties.$axios = axios
app.config.globalProperties.$request = $request

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-green/theme.css'

app.use(PrimeVue)

import Sidebar from 'primevue/sidebar'
app.component('Sidebar', Sidebar)
import Skeleton from 'primevue/skeleton'
app.component('Skeleton', Skeleton)

import wxDropdown from '@/components/UI/wxDropdown.vue'
app.component('wxDropdown', wxDropdown)
import wxProductCard from '@/components/UI/productCard.vue'
app.component('wxProductCard', wxProductCard)
import wxPagination from '@/components/UI/appPagination.vue'
app.component('wxPagination', wxPagination)
import wxGallery from '@/components/UI/gallery.vue'
app.component('wxGallery', wxGallery)
import wxCarousel from '@/components/UI/carousel.vue'
app.component('wxCarousel', wxCarousel)
import wxTable from '@/components/UI/wxTable.vue'
app.component('wxTable', wxTable)
import statusFilters from '@/components/filters/statusFilters.vue'
app.component('statusFilters', statusFilters)
import wxBreadcrumb from '@/components/UI/breadcrumb.vue'
app.component('wxBreadcrumb', wxBreadcrumb)

import Avatar from 'primevue/avatar'
app.component('Avatar', Avatar)

import Textarea from 'primevue/textarea';
app.component('pxTextarea', Textarea)

import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Rating from 'primevue/rating'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import InputNumber from 'primevue/inputnumber'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Editor from 'primevue/editor'
import ProgressBar from 'primevue/progressbar'
import Dropdown from 'primevue/dropdown'
import Dialog from 'primevue/dialog'
import Loader from '@/components/UI/Loader.vue'

app.component('Loader', Loader)
app.component('Dropdown', Dropdown)
app.component('ProgressBar', ProgressBar)
app.component('Rating', Rating)
app.component('Accordion', Accordion)
app.component('AccordionTab', AccordionTab)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('InputNumber', InputNumber)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Editor', Editor)
app.component('vDialog', Dialog)

import Tree from 'primevue/tree'
app.component('Tree', Tree)

import Toast from 'vue-toastification'
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css'

// const options = {
// };

import Tooltip from 'primevue/tooltip';
app.directive('tooltip', Tooltip);

import { services } from '@/services/services'
// Register all services globally
Object.keys(services).forEach((key) => {
  app.config.globalProperties[`$${key}`] = services[key]
})

// app.use(Toast, options);
app.use(Toast)

// app.use(createPinia())
app.use(router)
app.use(store)
app.use(VueSweetAlert2, {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
  reverseButtons: false,
  buttonsStyling: true,
  customClass: {
    confirmButton: 'tw-bg-green-600 tw-text-white tw-py-3',
    cancelButton: 'tw-bg-red-600 tw-text-white tw-py-3'
  }
})
app.use(VueClipboard, {
  autoSetContainer: true,
  appendToBody: true
})
app.use(QrReader)


// Plugins
import { currencyFormat, formatDate, getID, handleImageError, handleProfileError, formatRelativeTime, convertToDollar } from './plugins/filters'
app.config.globalProperties.$currencyFormat = currencyFormat
app.config.globalProperties.$formatDate = formatDate
app.config.globalProperties.$getID = getID
app.config.globalProperties.$handleProfileError = handleProfileError
app.config.globalProperties.$handleImageError = handleImageError
app.config.globalProperties.$formatRelativeTime = formatRelativeTime
app.config.globalProperties.$convertToDollar = convertToDollar



app.mount('#app')
