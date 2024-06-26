import Vue from 'vue'

import 'normalize.css'
// @ts-ignore
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import '@/icons/components'
import '@/permission'

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'ltNRTuKldrDhWXb9GeJBiwtmYOmXRSJV'
})

Vue.use(ElementUI)
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
