import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import {parseString} from 'xml2js'


window.axios = axios

new Vue({
  el: '#app',
  data:{},
  render: h => h(App)
})
