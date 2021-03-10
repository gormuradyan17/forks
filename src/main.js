import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import store from './store'
import VueAxios from './plugins/axios'

import firebase from 'firebase/app'
import 'firebase/database'
Vue.use(VueAxios)
Vue.config.productionTip = false
firebase.initializeApp({
  apiKey: "AIzaSyCY2B428Eb1dhCUz31JLuTVZ9FucUYoaGg",
  authDomain: "vue-forks-d0ec6.firebaseapp.com",
  databaseURL: "https://vue-forks-d0ec6-default-rtdb.firebaseio.com",
  projectId: "vue-forks-d0ec6",
  storageBucket: "vue-forks-d0ec6.appspot.com",
  messagingSenderId: "163888220192",
  appId: "1:163888220192:web:0381779c30ab65442a5445",
  measurementId: "G-7KPLX6R2FN"
})
new Vue({
  router,
  vuetify,
  store,
  firebase,
  render: h => h(App),
}).$mount('#app')
