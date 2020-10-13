import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'
Vue.config.productionTip = false
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

const options = { path: '/ws/socket.io' }; //Options object to pass into SocketIO
Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://192.168.178.2:5000', options), //options object is Optional
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);



new Vue({
  vuetify,
  store,
  render: h => h(App),
  created: function () {
    console.log("created",this)
    /*const vueNativeSockManager = new VueNativeSockManager(this)
    vueNativeSockManager.addWebSocket('pylody','ws://192.168.178.2:5000/ws', {format: 'json'})
    this.$store.sockets = vueNativeSockManager*/
   
    
  }
}).$mount('#app')
