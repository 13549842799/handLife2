import Vue from 'vue'
import App from './App'

import store from './store'

import inputDlog from './components/inputDlog'

Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.prototype.$screen = uni.getSystemInfoSync()

Vue.component('inputDlog', inputDlog)

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
