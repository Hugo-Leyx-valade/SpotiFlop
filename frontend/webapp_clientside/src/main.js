// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import $ from 'jquery';
// npm install axios@0.25.0
import axios from 'axios'

axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;


$(document).ready(function(){
    $("h1").click(function(){
        alert("Hello, jQuery!");
    });
});

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
