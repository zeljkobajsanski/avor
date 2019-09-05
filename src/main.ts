import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'jquery';
import 'bootstrap/dist/js/bootstrap.min';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
